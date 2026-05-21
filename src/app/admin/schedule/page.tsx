"use client"

import { useState, useEffect } from 'react'
import { Clock, Info, Calendar as CalendarIcon, Loader2, CheckCircle2, CalendarOff, ChevronRight, ChevronLeft } from 'lucide-react'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths, isToday, isBefore, startOfDay, parseISO, getDay } from 'date-fns'
import { ar } from 'date-fns/locale'

const ALL_TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
]

const DAYS_OF_WEEK = [
  { id: 0, name: "الأحد" },
  { id: 1, name: "الإثنين" },
  { id: 2, name: "الثلاثاء" },
  { id: 3, name: "الأربعاء" },
  { id: 4, name: "الخميس" },
  { id: 5, name: "الجمعة" },
  { id: 6, name: "السبت" },
]

export default function SchedulePage() {
  const [activeSlots, setActiveSlots] = useState<string[]>([])
  const [activeDays, setActiveDays] = useState<number[]>([])
  const [disabledDates, setDisabledDates] = useState<string[]>([])
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data) {
        setActiveDays(data.allowed_days || [5])
        setActiveSlots(data.time_slots || ["20:30", "21:00", "21:30", "22:00", "22:30", "23:00"])
        setDisabledDates(data.disabled_dates || [])
      }
    } catch (err) {
      console.error(err)
      setErrorMsg("فشل في تحميل الإعدادات")
    } finally {
      setIsLoading(false)
    }
  }

  const saveSettings = async () => {
    setIsSaving(true)
    setSuccessMsg('')
    setErrorMsg('')
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          allowedDays: activeDays,
          timeSlots: activeSlots,
          disabledDates: disabledDates
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to save")
      
      setSuccessMsg("تم حفظ التعديلات بنجاح. ستظهر فوراً للمرضى.")
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء الحفظ")
    } finally {
      setIsSaving(false)
    }
  }

  const toggleSlot = (slot: string) => {
    if (activeSlots.includes(slot)) {
      setActiveSlots(activeSlots.filter(s => s !== slot))
    } else {
      setActiveSlots([...activeSlots, slot].sort())
    }
  }

  const toggleDay = (dayId: number) => {
    if (activeDays.includes(dayId)) {
      setActiveDays(activeDays.filter(d => d !== dayId))
    } else {
      setActiveDays([...activeDays, dayId].sort())
    }
  }

  const toggleDisabledDate = (dateStr: string) => {
    if (disabledDates.includes(dateStr)) {
      setDisabledDates(disabledDates.filter(d => d !== dateStr))
    } else {
      setDisabledDates([...disabledDates, dateStr].sort())
    }
  }

  const formatTimeSlot = (slot: string) => {
    const [hours, mins] = slot.split(":")
    let h = parseInt(hours)
    const ampm = h >= 12 ? "م" : "ص"
    h = h > 12 ? h - 12 : h === 0 ? 12 : h
    return `${h}:${mins} ${ampm}`
  }

  // Calendar Helpers
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const today = startOfDay(new Date())

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1447E6]" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-[#080F28]">إدارة المواعيد</h1>
        <p className="text-[#3D4D6B]">تحكم في أيام وساعات العمل المتاحة للحجز أونلاين</p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-3 border border-emerald-200">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-bold text-sm">{successMsg}</p>
        </div>
      )}
      
      {errorMsg && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200">
          <Info className="w-5 h-5" />
          <p className="font-bold text-sm">{errorMsg}</p>
        </div>
      )}

      {/* Days Selection */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-5 h-5 text-[#1447E6]" />
          <h3 className="font-bold text-[#080F28]">أيام العمل الأسبوعية</h3>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const isActive = activeDays.includes(day.id)
            return (
              <button
                key={day.id}
                onClick={() => toggleDay(day.id)}
                className={`py-3 px-2 rounded-xl font-bold transition-all border text-sm active:scale-95 ${
                  isActive
                    ? "bg-[#1447E6] text-white border-[#1447E6] shadow-md shadow-[#1447E6]/20"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {day.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Slots Selection */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#1447E6]" />
          <h3 className="font-bold text-[#080F28]">الساعات المتاحة (بتوقيت القاهرة)</h3>
        </div>
        <p className="text-sm text-[#5A6A88] mb-4">اختر الأوقات التي سيتمكن المرضى من الحجز فيها في الأيام المحددة أعلاه.</p>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3 max-h-[300px] overflow-y-auto p-1 scrollbar-hide">
          {ALL_TIME_SLOTS.map((slot) => {
            const isActive = activeSlots.includes(slot)
            return (
              <button
                key={slot}
                onClick={() => toggleSlot(slot)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold transition-all border text-xs md:text-sm active:scale-95 ${
                  isActive
                    ? "bg-[#C9971F] text-white border-[#C9971F] shadow-md shadow-[#C9971F]/20"
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {formatTimeSlot(slot)}
              </button>
            )
          })}
        </div>
      </div>

      {/* Vacation / Disabled Dates (Interactive Calendar) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <CalendarOff className="w-5 h-5 text-[#1447E6]" />
          <h3 className="font-bold text-[#080F28]">الإجازات وتعطيل الحجز</h3>
        </div>
        <p className="text-sm text-[#5A6A88] mb-6">اضغط على أي يوم في التقويم لتعطيله كإجازة أو تفعيله مجدداً.</p>

        <div className="max-w-sm mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Calendar Header */}
          <div className="bg-slate-50 flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <button onClick={prevMonth} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors">
               <ChevronRight className="w-5 h-5" /> {/* Right points to previous month in RTL */}
            </button>
            <span className="font-bold text-[#080F28] text-base capitalize">
               {format(currentMonth, 'MMMM yyyy', { locale: ar })}
            </span>
            <button onClick={nextMonth} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors">
               <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid Header */}
          <div className="grid grid-cols-7 text-center py-2 bg-white border-b border-slate-100 text-[11px] font-bold text-slate-400">
            {['أ', 'إ', 'ث', 'أ', 'خ', 'ج', 'س'].map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 bg-white p-2 gap-1" dir="rtl">
            {/* Empty slots for start of month padding */}
            {Array.from({ length: getDay(monthStart) }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            
            {/* Days */}
            {daysInMonth.map(day => {
              const dateStr = format(day, 'yyyy-MM-dd')
              const isDisabled = disabledDates.includes(dateStr)
              const isPast = isBefore(day, today)
              
              return (
                <button
                  key={dateStr}
                  disabled={isPast}
                  onClick={() => toggleDisabledDate(dateStr)}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all
                    ${isPast ? 'text-slate-300 cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${isDisabled && !isPast ? 'bg-red-500 text-white shadow-md shadow-red-500/30' : ''}
                    ${!isDisabled && !isPast ? 'text-[#080F28] hover:bg-slate-100' : ''}
                    ${isToday(day) && !isDisabled ? 'border-2 border-[#1447E6] text-[#1447E6]' : ''}
                  `}
                >
                  {format(day, 'd')}
                </button>
              )
            })}
          </div>
        </div>
        
        {/* Helper legends */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs font-semibold text-[#5A6A88]">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-red-500"></div> يوم معطل
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md border-2 border-[#1447E6]"></div> اليوم
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-md bg-slate-100"></div> متاح للحجز
            </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={saveSettings}
          disabled={isSaving}
          className="px-8 py-3 bg-[#080F28] text-white font-bold rounded-xl hover:bg-opacity-90 transition-all flex items-center gap-2 disabled:opacity-70"
        >
          {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
          حفظ التغييرات
        </button>
      </div>
    </div>
  )
}
