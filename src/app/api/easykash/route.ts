import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, timeSlot, fullName, phone, amount, currency, countryCode } = body;

        if (!date || !timeSlot || !fullName || !phone) {
            return NextResponse.json({ success: false, message: "بيانات غير مكتملة" }, { status: 400 });
        }

        const customerReference = `BOOK_${Date.now()}`;

        // 1. Create unpaid appointment in database first (to block the slot)
        const { error: dbError } = await supabase
            .from("appointments")
            .insert({
                date,
                time_slot: timeSlot,
                full_name: fullName,
                phone_number: phone,
                booking_type: "online",
                payment_status: "unpaid",
                stripe_session_id: customerReference,
            });

        if (dbError) {
            console.error("DB insert error:", dbError);
            return NextResponse.json({ success: false, message: "فشل في حجز الموعد" }, { status: 500 });
        }

        // 2. Call EasyKash API to create payment link
        const EASYKASH_URL = "https://back.easykash.net/api/directpayv1/pay";
        const API_KEY = process.env.EASYKASH_API_KEY!;

        const host = request.headers.get("host") || "dr-waelbanna.vercel.app";
        const payload = {
            amount: amount,
            currency: currency || "EGP",
            paymentOptions: [2, 3, 4, 5, 6],
            cashExpiry: 3,
            name: fullName,
            email: "patient@clinic.com",
            mobile: phone,
            redirectUrl: `https://${host}/?payment=success`,
            customerReference: customerReference,
        };

        const response = await fetch(EASYKASH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log("EasyKash Pay API Response:", data);

        const redirectUrl = data.redirectUrl || data.url || data.payment_url;
        if (redirectUrl) {
            return NextResponse.json({ success: true, redirect_url: redirectUrl, customerReference });
        } else {
            // Payment link creation failed — delete the unpaid appointment
            await supabase
                .from("appointments")
                .delete()
                .eq("stripe_session_id", customerReference);

            console.error("EasyKash Error details:", data);
            return NextResponse.json({ success: false, message: "فشل في إنشاء رابط الدفع" }, { status: 500 });
        }
    } catch (error) {
        console.error("Payment API Error:", error);
        return NextResponse.json({ success: false, message: "حدث خطأ أثناء معالجة الدفع" }, { status: 500 });
    }
}
