import React from "react"
import { Card, CardContent } from "@/components/ui/Card.jsx"

// components/landing/Testimonials.jsx — port of components/landing/Testimonials.tsx
const QUOTES = [
  { name: "Registry Officer, Delhi HC Cell", quote: "Cut our judgment review time from days to hours." },
  { name: "Compliance Lead, Urban Dev. Dept.", quote: "Finally a single place to track every court deadline." },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">Trusted by government teams</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {QUOTES.map((q) => (
          <Card key={q.name}>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">&ldquo;{q.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium">{q.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
