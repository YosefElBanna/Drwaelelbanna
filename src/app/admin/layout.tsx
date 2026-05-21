'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { LayoutDashboard, CalendarDays, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navItems = [
    { name: 'الحجوزات', href: '/admin', icon: LayoutDashboard },
    { name: 'إدارة المواعيد', href: '/admin/schedule', icon: CalendarDays },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-extrabold text-[#080F28]">لوحة التحكم</h2>
          <p className="text-sm text-[#3D4D6B]">د. وائل البنا</p>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-[#EEF3FF] text-[#1447E6]' 
                    : 'text-[#5A6A88] hover:bg-slate-50 hover:text-[#080F28]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-all text-right"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#080F28]">لوحة التحكم</h2>
          <button onClick={handleLogout} className="text-red-600 p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
        
        {/* Mobile Nav Bottom */}
        <nav className="md:hidden bg-white border-t border-slate-200 p-2 flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  isActive ? 'text-[#1447E6]' : 'text-[#5A6A88]'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-bold">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </main>
    </div>
  )
}
