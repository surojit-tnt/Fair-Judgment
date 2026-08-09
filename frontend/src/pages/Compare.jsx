import React, { useState } from "react"
import { Button } from "@/components/ui/Button.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card.jsx"
import { api } from "@/lib/api.js"

// pages/Compare.jsx — port of app/(dashboard)/compare/page.tsx
export default function Compare() {
  const [case1, setCase1] = useState(null)
  const [case2, setCase2] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCompare = async () => {
    if (!case1 || !case2) return
    setLoading(true)
    try {
      const data = await api.compareCases({ case1, case2 })
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Compare cases</h1>
      <p className="text-sm text-muted-foreground">
        Select two cases to check for contradicting directives or overlapping compliance work.
      </p>

      <Button onClick={handleCompare} disabled={!case1 || !case2 || loading}>
        {loading ? "Comparing..." : "Compare"}
      </Button>

      {result && (
        <Card>
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><strong>Contradictions:</strong> {result.contradictions?.join(", ") || "None"}</p>
            <p><strong>Overlaps:</strong> {result.overlaps?.join(", ") || "None"}</p>
            <p><strong>Recommendation:</strong> {result.recommendation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
