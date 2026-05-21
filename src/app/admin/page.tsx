'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { format, parseISO } from 'date-fns'
import { ar } from 'date-fns/locale'
import { MessageCircle, Search, Loader2 } from 'lucide-react'

type Booking = {
  id: string
  created_at: string
  full_name: string
  phone: string
  date: string
  time_slot: string
  country_code: string
  status: string
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setBookings(data)
    setLoading(false)
  }

  const filteredBookings = bookings.filter(b => 
    b.full_name.includes(searchTerm) || b.phone.includes(searchTerm)
  )

  const openWhatsApp = (phone: string, name: string) => {
    const text = encodeURIComponent(`مرحباً أستاذ/ة ${name}، بخصوص استشارتك مع د. وائل البنا...`)
    // Remove + if it exists, wa.me works best with just country code + number
    const cleanPhone = phone.replace('+', '')
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#080F28]">الحجوزات الأخيرة</h1>
          <p className="text-[#3D4D6B]">تابع حجوزات الاستشارات عبر الإنترنت</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A6A88]" />
          <input 
            type="text"
            placeholder="بحث بالاسم أو الرقم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1447E6]"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-[#3D4D6B] font-bold">
              <tr>
                <th className="p-4 whitespace-nowrap">اسم المريض</th>
                <th className="p-4 whitespace-nowrap">الموعد</th>
                <th className="p-4 whitespace-nowrap">تاريخ الحجز</th>
                <th className="p-4 whitespace-nowrap">رقم الهاتف</th>
                <th className="p-4 whitespace-nowrap text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#5A6A88]">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    جاري تحميل الحجوزات...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#5A6A88] font-medium">
                    لا يوجد حجوزات مطابقة.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-[#080F28]">{booking.full_name}</td>
                    <td className="p-4">
                      <div className="font-semibold text-[#1447E6]">
                        {format(parseISO(booking.date), 'EEEE d MMM', { locale: ar })}
                      </div>
                      <div className="text-xs text-[#5A6A88] mt-0.5">الساعة {booking.time_slot}</div>
                    </td>
                    <td className="p-4 text-[#3D4D6B]">
                      {format(new Date(booking.created_at), 'd MMM yyyy', { locale: ar })}
                    </td>
                    <td className="p-4 font-medium" dir="ltr">{booking.phone}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => openWhatsApp(booking.phone, booking.full_name)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#F0FDF4] text-[#16A34A] rounded-lg border border-[#DCFCE7] font-bold text-xs hover:bg-[#DCFCE7] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        مراسلة
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
