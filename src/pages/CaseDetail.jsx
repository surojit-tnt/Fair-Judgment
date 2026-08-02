import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card.jsx"
import { StatusBadge } from "@/components/dashboard/StatusBadge.jsx"
import { CaseTimeline } from "@/components/dashboard/CaseTimeline.jsx"
import { api } from "@/lib/api.js"

// pages/CaseDetail.jsx — port of app/(dashboard)/cases/[id]/page.tsx
export default function CaseDetail() {
  const { id } = useParams()
  const [caseData, setCaseData] = useState(null)
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true)
  const [generatingPlan, setGeneratingPlan] = useState(false)
  const [draftingMemo, setDraftingMemo] = useState(false)
  const [memo, setMemo] = useState(null)

  useEffect(() => {
    // Replace with:
    //   supabase.from('cases').select('*').eq('id', id).single()
    //   supabase.from('compliance_actions').select('*').eq('case_id', id)
    setLoading(false)
  }, [id])

  const generateActionPlan = async () => {
    setGeneratingPlan(true)
    try {
      await api.generatePlan({ caseId: id, caseTitle: caseData?.title, summary: caseData?.summary, actions: actions.map((a) => a.action) })
    } finally {
      setGeneratingPlan(false)
    }
  }

  const handleDraftMemo = async () => {
    setDraftingMemo(true)
    try {
      const data = await api.draftMemo({
        caseTitle: caseData?.title,
        courtName: caseData?.court,
        judgmentDate: caseData?.judgment_date,
        summary: caseData?.summary,
        complianceActions: actions,
        department: caseData?.department,
      })
      setMemo(data.memo)
    } finally {
      setDraftingMemo(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading case details...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{caseData?.title || `Case ${id}`}</h1>
        {caseData?.status && <StatusBadge status={caseData.status} />}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{caseData?.summary || "No summary available."}</p>
            <div className="flex gap-3">
              <Button onClick={generateActionPlan} disabled={generatingPlan}>
                {generatingPlan ? "Generating..." : "Generate action plan"}
              </Button>
              <Button variant="outline" onClick={handleDraftMemo} disabled={draftingMemo}>
                {draftingMemo ? "Drafting..." : "Draft memo"}
              </Button>
            </div>
            {memo && <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">{memo}</pre>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
          <CardContent>
            <CaseTimeline events={actions.map((a) => ({ label: a.action, date: a.deadline, done: a.status === "done" }))} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
