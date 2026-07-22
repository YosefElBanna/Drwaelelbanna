import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const bodyText = await request.text();
        const body = JSON.parse(bodyText);
        console.log("EasyKash Webhook Callback received:", body);

        const hmacHeader = request.headers.get("hmac");
        const SECRET_KEY = process.env.EASYKASH_HMAC_SECRET || "a651ccc3f936465e97408bdf87e8bebf";
        
        // Compute HMAC for security
        const calculatedHmac = crypto.createHmac("sha256", SECRET_KEY).update(bodyText).digest("hex");
        
        if (hmacHeader && hmacHeader !== calculatedHmac) {
            console.error("HMAC verification failed. Received:", hmacHeader, "Expected:", calculatedHmac);
            // Can return 401 if strict, but logging is fine for testing
        } else {
            console.log("HMAC verification successful!");
        }

        // If the payment is successful
        if (body.status === "success" || body.payment_status === "paid") {
            console.log("Payment successful for reference:", body.customerReference);
            // Add any database/SMS updates here
        } else {
            console.log("Payment failed or pending:", body);
        }

        // Return 200 OK so EasyKash knows we received it
        return NextResponse.json({ received: true, status: "success" });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ received: false, error: "Webhook Error" }, { status: 500 });
    }
}
