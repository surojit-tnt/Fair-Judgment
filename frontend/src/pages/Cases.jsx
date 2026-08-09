import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/Card.jsx"
import { StatusBadge } from "@/components/dashboard/StatusBadge.jsx"
import { SkeletonCard } from "@/components/dashboard/SkeletonCard.jsx"
import { GlobalSearch } from "@/components/dashboard/GlobalSearch.jsx"

// pages/Cases.jsx — port of app/(dashboard)/cases/page.tsx
export default function Cases() {
  const [loading, setLoading] = useState(true)
  const [cases, setCases] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    // Replace with: supabase.from('cases').select('*').order('created_at', { ascending: false })
    const t = setTimeout(() => { setCases([]); setLoading(false) }, 400)
    return () => clearTimeout(t)
  }, [])

  const filtered = cases.filter((c) => c.title?.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cases directory</h1>
        <GlobalSearch onSearch={setQuery} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No cases found.</p>
        ) : (
          filtered.map((c) => (
            <Link key={c.id} to={`/cases/${c.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="space-y-2 pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{c.title}</h3>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
