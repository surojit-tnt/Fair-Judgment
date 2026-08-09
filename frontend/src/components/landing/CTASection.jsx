import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button.jsx"

// components/landing/CTASection.jsx — port of components/landing/CTASection.tsx
export default function CTASection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold">Ready to modernize your compliance workflow?</h2>
      <p className="mt-3 text-muted-foreground">Set up VerdictFlow for your department in minutes.</p>
      <Link to="/signup">
        <Button size="lg" className="mt-6">Create your account</Button>
      </Link>
    </section>
  )
}
