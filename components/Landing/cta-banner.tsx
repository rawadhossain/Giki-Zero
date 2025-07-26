"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function CTABanner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Smooth Flowing Gradients */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute w-full h-full bg-gradient-to-br from-green-400/20 via-blue-400/10 to-purple-400/20 animate-pulse"
          style={{
            transform: `translate(${Math.sin(mousePosition.x * 0.002) * 20}px, ${Math.cos(mousePosition.y * 0.002) * 20}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <div
          className="absolute w-full h-full bg-gradient-to-tl from-blue-400/15 via-green-400/5 to-cyan-400/15 animate-pulse animation-delay-1000"
          style={{
            transform: `translate(${Math.cos(mousePosition.x * 0.003) * -15}px, ${Math.sin(mousePosition.y * 0.003) * -15}px)`,
            transition: "transform 0.7s ease-out",
          }}
        />
      </div>

      {/* Interactive Cursor Glow */}
      <div
        className="absolute w-96 h-96 bg-gradient-radial from-green-400/20 via-blue-400/10 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out blur-xl"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-block mb-8">
          <div className="flex items-center space-x-2 px-6 py-3 bg-green-400/20 rounded-full border border-green-400/30 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">Start Your Journey</span>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
          <span className="inline-block animate-fade-in-up">Take</span>{" "}
          <span className="inline-block animate-fade-in-up animation-delay-200">the</span>{" "}
          <span className="inline-block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
            First Step
          </span>
        </h2>

        {/* Subtitle */}
        <div className="mb-12 animate-fade-in-up animation-delay-600">
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Every choice matters. <span className="font-semibold text-white">Track yours today.</span>
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full animate-expand-width animation-delay-800" />
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up animation-delay-1000">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-green-600 hover:from-green-600 hover:via-blue-600 hover:to-green-700 text-white font-bold text-xl px-16 py-8 rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-green-500/30"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>Start Tracking Your Footprint</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>

            {/* Animated Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Pulsing Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 scale-150" />
          </Button>
        </div>

        {/* Supporting Text */}
        <p className="text-gray-400 mt-8 text-lg animate-fade-in-up animation-delay-1200">
          Join thousands of users already making a difference
        </p>
      </div>
    </section>
  )
}
