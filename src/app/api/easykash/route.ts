import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, timeSlot, fullName, phone, amount, currency } = body;

        if (!date || !timeSlot || !fullName || !phone) {
            return NextResponse.json({ success: false, message: "بيانات غير مكتملة" }, { status: 400 });
        }

        // EasyKash Direct Payment API URL
        const EASYKASH_URL = "https://back.easykash.net/api/directpayv1/pay";
        const API_KEY = process.env.EASYKASH_API_KEY || "0gqwrq90loup34ri";

        // Construct the EasyKash payload
        const payload = {
            amount: amount,
            currency: currency || "EGP",
            paymentOptions: [2, 3, 4, 5, 6], // Adjust based on supported EasyKash options
            cashExpiry: 3,
            name: fullName,
            email: "patient@example.com",
            mobile: phone,
            redirectUrl: `https://${request.headers.get("host") || "drwaelbanna.com"}/`,
            customerReference: `BOOK_${Date.now()}`
        };

        const response = await fetch(EASYKASH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY, 
                'Authorization': `Bearer ${API_KEY}` // Fallback standard
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("EasyKash Pay API Response:", data);

        if (data.redirectUrl || data.url || data.payment_url || (data.data && data.data.url)) {
            const redirectUrl = data.redirectUrl || data.url || data.payment_url || data.data.url;
            return NextResponse.json({ success: true, redirect_url: redirectUrl });
        } else {
            console.error("EasyKash Error details:", data);
            return NextResponse.json({ success: false, message: "فشل في إنشاء رابط الدفع من EasyKash" }, { status: 500 });
        }

    } catch (error) {
        console.error("Payment API Error:", error);
        return NextResponse.json({ success: false, message: "حدث خطأ أثناء معالجة الدفع" }, { status: 500 });
    }
}
