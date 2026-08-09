import React from "react"
import { FileUp, ScanSearch, ListChecks, CheckCircle2 } from "lucide-react"

// components/landing/Pipeline.jsx — port of components/landing/Pipeline.tsx
const STAGES = [
  { icon: FileUp, label: "Upload" },
  { icon: ScanSearch, label: "Extract" },
  { icon: ListChecks, label: "Plan" },
  { icon: CheckCircle2, label: "Verify" },
]

export default function Pipeline() {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-10">
      {STAGES.map(({ icon: Icon, label }, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
          {i < STAGES.length - 1 && <div className="h-px flex-1 bg-border mx-2" />}
        </React.Fragment>
      ))}
    </div>
  )
}
