import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card.jsx"

// pages/Compliance.jsx — port of app/(dashboard)/compliance/page.tsx
export default function Compliance() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Compliance timeline</h1>
      <Card>
        <CardHeader><CardTitle>Upcoming deadlines</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No deadlines to show yet — connect this to `compliance_actions` where status != 'done'.
        </CardContent>
      </Card>
    </div>
  )
}
