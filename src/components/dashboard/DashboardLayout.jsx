import React, { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  Scale, Home, Upload, FileText, CheckSquare,
  Settings, LogOut, BarChart2, ChevronLeft, ChevronRight, Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationCenter } from "@/components/dashboard/NotificationCenter.jsx"
import { GlobalSearch } from "@/components/dashboard/GlobalSearch.jsx"

// components/dashboard/DashboardLayout.jsx
// Port of app/(dashboard)/layout.tsx — the sidebar + topbar shell that
// wraps every authenticated page. Rendered via the parent <Route> in App.jsx,
// with the active page rendered through <Outlet />.
const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Upload Judgment", href: "/upload", icon: Upload },
  { name: "Cases Directory", href: "/cases", icon: FileText },
  { name: "Compare Cases", href: "/compare", icon: Scale },
  { name: "Pending Review", href: "/pending-review", icon: CheckSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "AI Co-Pilot", href: "/copilot", icon: Zap },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Wire this up to your auth provider (e.g. supabase.auth.signOut())
    navigate("/login")
  }

  return (
    <div className="flex h-screen">
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Scale className="h-5 w-5 text-primary" /> VerdictFlow
            </Link>
          )}
          <button onClick={() => setCollapsed((c) => !c)} className="rounded p-1 hover:bg-muted">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && item.name}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="m-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Log out"}
        </button>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <GlobalSearch onSearch={(q) => console.log("search:", q)} />
          <NotificationCenter notifications={[]} />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
