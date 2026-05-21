import { NextResponse } from 'next/server';
import { createClient as createServerSupabaseClient } from '@/utils/supabase/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('clinic_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Supabase GET Settings Error:', error);
      // Fallback defaults if table doesn't exist yet
      return NextResponse.json({
        allowed_days: [5], // Friday
        time_slots: ["20:30", "21:00", "21:30", "22:00", "22:30", "23:00"],
        disabled_dates: []
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Settings API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في النظام' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const serverSupabase = await createServerSupabaseClient();
    const { data: { session } } = await serverSupabase.auth.getSession();
    
    if (!session) {
        return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }
    
    const body = await req.json();
    const { allowedDays, timeSlots, disabledDates } = body;

    const { data, error } = await supabase
      .from('clinic_settings')
      .update({
        allowed_days: allowedDays,
        time_slots: timeSlots,
        disabled_dates: disabledDates || [],
        updated_at: new Date().toISOString()
      })
      .eq('id', 1)
      .select();

    if (error) {
      console.error('Supabase Update Settings Error:', error);
      return NextResponse.json({ error: 'فشل في تحديث الإعدادات' }, { status: 500 });
    }

    return NextResponse.json({ success: true, settings: data?.[0] });
  } catch (error) {
    console.error('Settings Update API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في النظام' },
      { status: 500 }
    );
  }
}
