import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // In production, we should verify the PayTabs signature if provided.
    // The structure typically includes payment_result, cart_id, tran_ref, etc.

    const { cart_id, payment_result } = body;

    if (!cart_id || !payment_result) {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // PayTabs response_status "A" means Authorized (Success)
    if (payment_result.response_status === 'A') {
        const { error } = await supabase
          .from('appointments')
          .update({ payment_status: 'paid' })
          .eq('id', cart_id);

        if (error) {
            console.error('Supabase Update Error in Webhook:', error);
            return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }
    } else {
        // Handle failed payment (e.g. mark as failed or cancelled)
        await supabase
          .from('appointments')
          .update({ payment_status: 'unpaid' })
          .eq('id', cart_id);
    }

    // Always return 200 OK to acknowledge receipt of the webhook
    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("PayTabs webhook error:", err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
