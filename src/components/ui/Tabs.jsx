import React, { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

// components/ui/Tabs.jsx — lightweight port of components/ui/tabs.tsx
// (the original wraps @radix-ui/react-tabs; this is a dependency-free equivalent)
const TabsContext = createContext(null)

export function Tabs({ defaultValue, value, onValueChange, className, children }) {
  const [internal, setInternal] = useState(defaultValue)
  const active = value ?? internal
  const setActive = onValueChange ?? setInternal
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }) {
  return <div className={cn("inline-flex items-center rounded-md bg-muted p-1", className)} {...props} />
}

export function TabsTrigger({ value, className, children, ...props }) {
  const { active, setActive } = useContext(TabsContext)
  const isActive = active === value
  return (
    <button
      onClick={() => setActive(value)}
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-sm transition-colors",
        isActive ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className, children }) {
  const { active } = useContext(TabsContext)
  if (active !== value) return null
  return <div className={className}>{children}</div>
}
