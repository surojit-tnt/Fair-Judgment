import React from "react"
import Navbar from "@/components/landing/Navbar.jsx"
import Hero from "@/components/landing/Hero.jsx"
import Pipeline from "@/components/landing/Pipeline.jsx"
import StatsBar from "@/components/landing/StatsBar.jsx"
import Features from "@/components/landing/Features.jsx"
import HowItWorks from "@/components/landing/HowItWorks.jsx"
import Testimonials from "@/components/landing/Testimonials.jsx"
import CTASection from "@/components/landing/CTASection.jsx"
import Footer from "@/components/landing/Footer.jsx"

// pages/Landing.jsx — port of app/page.tsx
export default function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Pipeline />
      <StatsBar />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
