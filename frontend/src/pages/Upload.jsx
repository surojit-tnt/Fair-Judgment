import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UploadCloud, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button.jsx"
import { Card, CardContent } from "@/components/ui/Card.jsx"
import { api } from "@/lib/api.js"

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

    if (dropped?.type === "application/pdf") {
      setFile(dropped)
      setResult(null)
      setError(null)
    }
  }, [])

  const handleAnalyze = async () => {
    if (!file) return

    setAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const data = await api.analyzeJudgment(formData)

      if (data.error) {
        throw new Error(data.error)
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSave = async () => {
    try {
      const data = await api.saveCase({
        analysisData: result,
        pdfFilename: file?.name
      })

      if (data.caseId) {
        navigate(`/cases/${data.caseId}`)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">

      <Card>
        <CardContent className="p-6">

          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-lg p-10 text-center ${
              dragging ? "border-primary" : ""
            }`}
          >
            <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />

            <p className="mt-3 text-sm text-muted-foreground">
              Drag & drop a PDF here, or
            </p>

            <label className="mt-3 cursor-pointer text-sm font-medium text-primary">
              browse files

              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0] || null
                  setFile(selected)
                  setResult(null)
                  setError(null)
                }}
              />
            </label>

            {file && (
              <p className="mt-4 text-sm">
                {file.name}
              </p>
            )}
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={!file || analyzing}
            className="mt-5"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze with AI"
            )}
          </Button>

        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardContent className="space-y-5 p-6">

            <div>
              <h2 className="text-xl font-bold">
                {result.filename || file?.name}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Document ID: {result.document_id}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                AI Analysis
              </h3>

              <div className="mt-3 whitespace-pre-wrap rounded-lg bg-muted p-5 text-sm leading-7">
                {typeof result.analysis === "string"
                  ? result.analysis
                  : JSON.stringify(result.analysis, null, 2)}
              </div>
            </div>

            <Button onClick={handleSave}>
              Save Case
            </Button>

          </CardContent>
        </Card>
      )}

    </div>
  )
}