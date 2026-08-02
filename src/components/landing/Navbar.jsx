import React from "react"
import { Link } from "react-router-dom"
import { Scale } from "lucide-react"
import { Button } from "@/components/ui/Button.jsx"

// components/landing/Navbar.jsx — port of components/landing/Navbar.tsx
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Scale className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">
            Fair Judgment
            
            </span>
        </Link>
        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#testimonials">Testimonials</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login"><Button variant="ghost">Log in</Button></Link>
          <Link to="/signup"><Button>Get started</Button></Link>
        </div>
      </div>
    </header>
  )
}
