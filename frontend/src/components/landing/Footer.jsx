import React from "react"
import { GitFork, Link } from "lucide-react"

// components/landing/Footer.jsx — port of components/landing/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} VerdictFlow. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="https://github.com/debanjan100" target="_blank" rel="noreferrer"><GitFork className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/in/debanjanghorui5567/" target="_blank" rel="noreferrer"><Link className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  )
}
