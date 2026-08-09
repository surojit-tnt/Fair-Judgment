// Thin fetch wrapper for the VerdictFlow backend API.
// Point VITE_API_URL at wherever the Next.js API routes
// (app/api/*) or your own backend are deployed.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || "Request failed")
  }
  return res.json()
}

export const api = {
  // POST /api/analyze — upload a PDF (multipart), get back structured JSON
  analyzeJudgment: (formData) =>
    fetch(`${API_URL}/api/analyze`, { method: "POST", body: formData }).then((r) => r.json()),

  saveCase: (payload) => request("/api/save-case", { method: "POST", body: JSON.stringify(payload) }),
  generatePlan: (payload) => request("/api/generate-plan", { method: "POST", body: JSON.stringify(payload) }),
  draftMemo: (payload) => request("/api/draft-memo", { method: "POST", body: JSON.stringify(payload) }),
  draftNotice: (payload) => request("/api/draft-notice", { method: "POST", body: JSON.stringify(payload) }),
  compareCases: (payload) => request("/api/compare-cases", { method: "POST", body: JSON.stringify(payload) }),
  chatJudgment: (payload) => request("/api/chat-judgment", { method: "POST", body: JSON.stringify(payload) }),
  copilot: (payload) => request("/api/copilot", { method: "POST", body: JSON.stringify(payload) }),
}
