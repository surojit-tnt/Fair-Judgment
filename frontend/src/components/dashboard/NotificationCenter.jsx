import React, { useState } from "react"
import { Bell } from "lucide-react"

// components/dashboard/NotificationCenter.jsx — port of NotificationCenter.tsx
export function NotificationCenter({ notifications = [] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="relative rounded-md p-2 hover:bg-muted">
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-md border border-border bg-card p-2 shadow-lg">
          {notifications.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground">No new notifications</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="rounded-sm p-3 text-sm hover:bg-muted">{n.message}</div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
