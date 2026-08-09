import { Routes, Route } from "react-router-dom"

// Public pages
import Landing from "@/pages/Landing.jsx"
import Login from "@/pages/Login.jsx"
import Signup from "@/pages/Signup.jsx"

// Dashboard shell + pages
import DashboardLayout from "@/components/dashboard/DashboardLayout.jsx"
import Dashboard from "@/pages/Dashboard.jsx"
import Upload from "@/pages/Upload.jsx"
import Cases from "@/pages/Cases.jsx"
import CaseDetail from "@/pages/CaseDetail.jsx"
import Compare from "@/pages/Compare.jsx"
import PendingReview from "@/pages/PendingReview.jsx"
import Analytics from "@/pages/Analytics.jsx"
import Copilot from "@/pages/Copilot.jsx"
import Settings from "@/pages/Settings.jsx"
import Compliance from "@/pages/Compliance.jsx"



export default function App() {
  //
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />       <Route path="/upload" element={<Upload />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/pending-review" element={<PendingReview />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/copilot" element={<Copilot />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/compliance" element={<Compliance />} />
      </Route>
    </Routes>
  )
}
