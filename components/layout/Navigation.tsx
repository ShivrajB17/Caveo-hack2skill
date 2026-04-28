import Link from "next/link"
import { ShieldAlert, LogOut, Home, LayoutDashboard, Settings as SettingsIcon, PieChart } from "lucide-react"
import { DEMO_MODE } from "@/lib/demo"

export function Sidebar() {
  return (
    <div className="hidden border-r bg-card/50 md:flex md:w-64 md:flex-col min-h-screen">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          <span className="text-xl tracking-tight text-white">Caveo</span>
        </Link>
      </div>
      {DEMO_MODE && (
        <div className="px-4 py-2 mt-2 mx-4 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded-md border border-yellow-500/50 flex items-center justify-center">
          DEMO MODE ACTIVE
        </div>
      )}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
          >
            <PieChart className="h-4 w-4" />
            Analytics
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-red-500 hover:bg-red-500/10">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-card z-50">
      <nav className="flex justify-around items-center h-16">
        <Link href="/dashboard" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary w-full h-full">
          <LayoutDashboard className="h-5 w-5 mb-1" />
          <span className="text-[10px]">Dash</span>
        </Link>
        <Link href="/analytics" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary w-full h-full">
          <PieChart className="h-5 w-5 mb-1" />
          <span className="text-[10px]">Analytics</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary w-full h-full">
          <SettingsIcon className="h-5 w-5 mb-1" />
          <span className="text-[10px]">Settings</span>
        </Link>
      </nav>
    </div>
  )
}
