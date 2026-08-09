import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card.jsx"
import { SkeletonCard } from "@/components/dashboard/SkeletonCard.jsx"
import { StatusBadge } from "@/components/dashboard/StatusBadge.jsx"

// pages/Dashboard.jsx — port of app/(dashboard)/dashboard/page.tsx
// Overview page: summary stats + a recent-cases list.
export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [cases, setCases] = useState([])

  useEffect(() => {
    // Replace with: supabase.from('cases').select('*').order('created_at', { ascending: false }).limit(5)
    const timer = setTimeout(() => {
      setCases([])
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { label: "Total cases", value: cases.length },
    { label: "Pending review", value: cases.filter((c) => c.status === "pending").length },
    { label: "Verified", value: cases.filter((c) => c.status === "verified").length },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold">{s.value}</CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Recent cases</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <>
              <SkeletonCard /><SkeletonCard />
            </>
          ) : cases.length === 0 ? (
            <p className="text-sm text-muted-foreground">No cases yet — upload a judgment to get started.</p>
          ) : (
            cases.map((c) => (
              <div key={c.id} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                <span className="text-sm font-medium">{c.title}</span>
                <StatusBadge status={c.status} />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
