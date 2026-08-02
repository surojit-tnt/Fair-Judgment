import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card.jsx"

// pages/Analytics.jsx — port of app/(dashboard)/analytics/page.tsx
// Wire chart data (recharts is already a dependency in the original project)
// once you have real aggregate numbers from the backend.
export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {["Avg. compliance time", "Cases this month", "Overdue rate"].map((label) => (
          <Card key={label}>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">{label}</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold">—</CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
