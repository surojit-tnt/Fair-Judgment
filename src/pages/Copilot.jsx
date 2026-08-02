import React, { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/Button.jsx"
import { Input } from "@/components/ui/Input.jsx"
import { api } from "@/lib/api.js"

// pages/Copilot.jsx — port of app/(dashboard)/copilot/page.tsx
export default function Copilot() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const ask = async (e) => {
    e.preventDefault()
    if (!question.trim()) return
    const q = question
    setMessages((m) => [...m, { role: "user", content: q }])
    setQuestion("")
    setLoading(true)
    try {
      const { answer } = await api.copilot({ question: q })
      setMessages((m) => [...m, { role: "assistant", content: answer }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <h1 className="mb-4 text-2xl font-bold">AI Co-Pilot</h1>
      <div className="flex-1 space-y-3 overflow-y-auto rounded-md border border-border p-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            <span className={`inline-block max-w-[80%] rounded-lg px-3 py-2 text-sm ${
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p className="text-sm text-muted-foreground">Thinking...</p>}
      </div>
      <form onSubmit={ask} className="mt-4 flex gap-2">
        <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about pending cases..." />
        <Button type="submit"><Send className="h-4 w-4" /></Button>
      </form>
    </div>
  )
}
