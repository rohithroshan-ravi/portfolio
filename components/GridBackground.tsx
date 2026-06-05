'use client'

import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(0, 212, 255, 0.03) 0%, transparent 70%)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Mouse spotlight */}
      <div ref={spotlightRef} className="absolute inset-0 transition-none" />

      {/* Top center faint glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-[0.06]"
        style={{
          background: 'radial-gradient(ellipse at center, #00d4ff 0%, transparent 70%)',
        }}
      />

      {/* Bottom right faint glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[350px] opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse at bottom right, #0891b2 0%, transparent 70%)',
        }}
      />

      {/* Scanline */}
      <div
        className="absolute left-0 right-0 h-px animate-scanline"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), rgba(0, 180, 216, 0.3), transparent)',
          opacity: 0.07,
          top: 0,
        }}
      />
    </div>
  )
}
