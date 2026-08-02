import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button.jsx"

// components/landing/Hero.jsx — port of components/landing/Hero.tsx
export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold tracking-tight md:text-6xl"
      >
        Turn court judgments into <span className="text-primary">actionable compliance</span>
      </motion.h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        VerdictFlow reads PDF judgments, extracts directives, and generates
        department-ready action plans — reviewed and verified by your team.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/signup"><Button size="lg">Get started free</Button></Link>
        <a href="#how-it-works"><Button size="lg" variant="outline">See how it works</Button></a>
      </div>
    </section>
  )
}
