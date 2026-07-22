import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const bodyText = await request.text();
        const body = JSON.parse(bodyText);
        console.log("EasyKash Callback received:", body);

        // HMAC verification
        const hmacHeader = request.headers.get("hmac");
        const SECRET_KEY = process.env.EASYKASH_HMAC_SECRET!;

        if (SECRET_KEY && hmacHeader) {
            const calculatedHmac = crypto
                .createHmac("sha256", SECRET_KEY)
                .update(bodyText)
                .digest("hex");

            if (hmacHeader !== calculatedHmac) {
                console.error("HMAC verification failed.");
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }

        // Update appointment status in database
        const ref = body.customerReference || body.customer_reference;
        if (body.status === "success" || body.payment_status === "paid") {
            if (ref) {
                const { error: updateError } = await supabase
                    .from("appointments")
                    .update({ payment_status: "paid" })
                    .eq("payment_reference", ref);

                if (updateError) {
                    console.error("DB update error:", updateError);
                } else {
                    console.log("Appointment marked as paid:", ref);
                }
            }
        } else {
            console.log("Payment not successful:", body.status);
        }

        return NextResponse.json({ received: true, status: "success" });
    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ received: false, error: "Webhook Error" }, { status: 500 });
    }
}
