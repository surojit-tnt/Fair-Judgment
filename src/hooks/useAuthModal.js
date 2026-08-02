import { useState } from "react"

// hooks/useAuthModal.js — port of hooks/useAuthModal.ts
// Simple open/close state for <AuthModal /> (components/auth/AuthModal.jsx)
export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState("login") // "login" | "signup"

  return {
    isOpen,
    mode,
    open: (m = "login") => { setMode(m); setIsOpen(true) },
    close: () => setIsOpen(false),
  }
}
