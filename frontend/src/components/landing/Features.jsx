import React from "react"
import { FileText, Bot, Clock, ShieldCheck } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card.jsx"

// components/landing/Features.jsx — port of components/landing/Features.tsx
const FEATURES = [
  { icon: FileText, title: "Smart PDF intelligence", desc: "Upload a judgment and get structured insights in seconds." },
  { icon: Bot, title: "AI action plans", desc: "Compliance steps, appeal strategy, and execution plans, generated automatically." },
  { icon: Clock, title: "Deadline tracking", desc: "Never miss a compliance or appeal deadline again." },
  { icon: ShieldCheck, title: "Human-in-the-loop", desc: "Legal reviewers approve or refine every AI output before it ships." },
]

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">Everything your compliance team needs</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="h-8 w-8 text-primary" />
              <CardTitle className="mt-3">{title}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
