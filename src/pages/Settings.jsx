import React, { useState } from "react"
import { Button } from "@/components/ui/Button.jsx"
import { Input } from "@/components/ui/Input.jsx"
import { Label } from "@/components/ui/Label.jsx"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card.jsx"

// pages/Settings.jsx — port of app/(dashboard)/settings/page.tsx
export default function Settings() {
  const [fullName, setFullName] = useState("")

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <Button>Save changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
