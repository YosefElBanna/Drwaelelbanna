import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerReference } = body;

        if (!customerReference) {
            return NextResponse.json({ success: false, message: "Missing reference" }, { status: 400 });
        }

        // We use the service role key to bypass RLS and update the row
        const supabaseAdmin = require('@supabase/supabase-js').createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error } = await supabaseAdmin
            .from("appointments")
            .update({ payment_status: "paid" })
            .eq("stripe_session_id", customerReference);

        if (error) {
            console.error("DB update error:", error);
            return NextResponse.json({ success: false, message: "Failed to update" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Confirm Payment Error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
