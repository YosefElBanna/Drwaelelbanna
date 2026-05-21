import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
        return NextResponse.json({ error: "التاريخ مطلوب" }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from("appointments")
            .select("time_slot, payment_status, created_at")
            .eq("date", date)
            .neq("payment_status", "refunded");

        if (error) throw error;

        const now = new Date();
        const bookedSlots = data
            .filter((appointment) => {
                if (appointment.payment_status === "paid") return true;
                
                // If unpaid, lock it only if it was created less than 15 minutes ago
                // This gives the user 15 minutes to complete the PayTabs payment.
                if (appointment.payment_status === "unpaid" && appointment.created_at) {
                    const createdAt = new Date(appointment.created_at);
                    const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
                    return diffMinutes <= 15;
                }
                
                return false;
            })
            .map((appointment) => appointment.time_slot.substring(0, 5));

        return NextResponse.json({ bookedSlots }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    } catch (err: any) {
        console.error("Fetch slots error:", err);
        return NextResponse.json({ error: "حدث خطأ في جلب المواعيد المتاحة", details: err.message }, { status: 500 });
    }
}
