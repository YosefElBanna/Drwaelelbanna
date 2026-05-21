import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, timeSlot, fullName, phone, type, countryCode, amount, currency } = body;

    // Validate inputs
    if (!date || !timeSlot || !fullName || !phone) {
      return NextResponse.json({ error: 'يرجى إكمال جميع البيانات' }, { status: 400 });
    }

    // Insert into Supabase as unpaid
    const { data: bookingData, error: dbError } = await supabase
      .from('appointments')
      .insert([
        {
          full_name: fullName,
          phone_number: phone,
          booking_type: type,
          date,
          time_slot: timeSlot,
          payment_status: 'unpaid'
        }
      ])
      .select();

    if (dbError || !bookingData || bookingData.length === 0) {
      console.error('Supabase Insert Error:', dbError);
      return NextResponse.json({ error: 'حدث خطأ أثناء تهيئة الحجز', details: dbError }, { status: 500 });
    }

    const bookingId = bookingData[0].id;

    // PayTabs API configuration
    const profileId = process.env.PAYTABS_PROFILE_ID;
    const serverKey = process.env.PAYTABS_SERVER_KEY;
    const region = process.env.PAYTABS_REGION || "KWT"; // e.g., KWT, SAU, ARE, EGY
    
    if (!profileId || !serverKey) {
        // If credentials are not set, return a mock redirect for testing or throw error
        console.warn("PayTabs credentials are not set. Using fallback URL for development.");
        // In a real scenario without keys, we can't create a real payment page.
        // For development, we might simulate a success redirect.
        // But let's return an error so the developer knows.
        return NextResponse.json({ error: 'لم يتم إعداد بوابة الدفع (PayTabs) بعد.' }, { status: 500 });
    }

    let endpoint = "https://secure.paytabs.com/payment/request"; // Default
    switch (region) {
      case "ARE": endpoint = "https://secure.paytabs.ae/payment/request"; break;
      case "SAU": endpoint = "https://secure.paytabs.sa/payment/request"; break;
      case "OMN": endpoint = "https://secure-oman.paytabs.com/payment/request"; break;
      case "JOR": endpoint = "https://secure-jordan.paytabs.com/payment/request"; break;
      case "EGY": endpoint = "https://secure-egypt.paytabs.com/payment/request"; break;
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    const paytabsPayload = {
        profile_id: profileId,
        tran_type: "sale",
        tran_class: "ecom",
        cart_id: bookingId.toString(),
        cart_description: `استشارة أونلاين - ${fullName}`,
        cart_currency: currency,
        cart_amount: amount,
        return: `${baseUrl}/?payment=success&booking_id=${bookingId}`,
        callback: `${baseUrl}/api/webhook/paytabs`,
        customer_details: {
            name: fullName,
            email: "patient@clinic.com", // Required by some banks
            phone: phone,
            street1: "N/A",
            city: "N/A",
            state: "N/A",
            country: countryCode || "EG",
            ip: "127.0.0.1" // Should be the actual user IP if possible
        },
        hide_shipping: true
    };

    const paytabsRes = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": serverKey
        },
        body: JSON.stringify(paytabsPayload)
    });

    const paytabsData = await paytabsRes.json();

    if (!paytabsRes.ok || !paytabsData.redirect_url) {
        console.error("PayTabs Error:", paytabsData);
        return NextResponse.json({ error: "فشل في التواصل مع بوابة الدفع PayTabs" }, { status: 500 });
    }

    // Return the redirect URL to the frontend
    return NextResponse.json({ redirect_url: paytabsData.redirect_url });

  } catch (error) {
    console.error('PayTabs API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في النظام. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
