import React, { useState } from "react"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce.js"

// components/dashboard/GlobalSearch.jsx — port of GlobalSearch.tsx
export function GlobalSearch({ onSearch }) {
  const [query, setQuery] = useState("")
  const debounced = useDebounce(query, 300)

  React.useEffect(() => {
    if (debounced) onSearch?.(debounced)
  }, [debounced, onSearch])

  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cases, departments..."
        className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}
