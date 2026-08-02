import React, { useState } from "react"
import { Button } from "@/components/ui/Button.jsx"
import { Card, CardContent } from "@/components/ui/Card.jsx"
import { api } from "@/lib/api.js"

// pages/PendingReview.jsx — port of app/(dashboard)/pending-review/page.tsx
export default function PendingReview() {
  const [overdue, setOverdue] = useState([]) // populate from compliance_actions where status = 'overdue'
  const [notice, setNotice] = useState(null)
  const [drafting, setDrafting] = useState(false)

  const draftNotice = async (item) => {
    setDrafting(true)
    try {
      const data = await api.draftNotice({
        action: item.action,
        caseName: item.caseTitle,
        department: item.department,
        deadline: item.deadline,
        officerName: item.officerName,
      })
      setNotice(data.notice)
    } finally {
      setDrafting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pending review</h1>

      {overdue.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing overdue right now.</p>
      ) : (
        overdue.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between pt-6">
              <span className="text-sm">{item.action}</span>
              <Button size="sm" onClick={() => draftNotice(item)} disabled={drafting}>
                Draft notice
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      {notice && <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">{notice}</pre>}
    </div>
  )
}
