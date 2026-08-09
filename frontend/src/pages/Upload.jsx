import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UploadCloud, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button.jsx"
import { Card, CardContent } from "@/components/ui/Card.jsx"
import { api } from "@/lib/api.js"

// pages/Upload.jsx — port of app/(dashboard)/upload/page.tsx
// Flow: pick a PDF -> POST /api/analyze -> review AI result -> POST /api/save-case
export default function Upload() {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped?.type === "application/pdf") setFile(dropped)
  }, [])

  const handleAnalyze = async () => {
    if (!file) return
    setAnalyzing(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const data = await api.analyzeJudgment(formData)
      if (data.error) throw new Error(data.error)
      setResult(data.data || data)
    } catch (err) {
      setError(err.message)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSave = async () => {
    try {
      const { caseId } = await api.saveCase({ analysisData: result, pdfFilename: file?.name })
      navigate(`/cases/${caseId}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Upload judgment</h1>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
          dragging ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        <UploadCloud className="mb-3 h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Drag & drop a PDF here, or</p>
        <label className="mt-3 cursor-pointer text-sm font-medium text-primary">
          browse files
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        {file && <p className="mt-4 text-sm">{file.name}</p>}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button onClick={handleAnalyze} disabled={!file || analyzing}>
        {analyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {analyzing ? "Analyzing..." : "Analyze with AI"}
      </Button>

      {result && (
        <Card>
          <CardContent className="space-y-3 pt-6">
            <h2 className="text-lg font-semibold">{result.caseTitle}</h2>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
            <Button onClick={handleSave}>Save case</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
