'use client'

import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(30, 58, 138, 0.04) 0%, transparent 70%)`
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Mouse-tracked spotlight */}
      <div ref={spotlightRef} className="absolute inset-0 transition-none" />

      {/* Top-center radial accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Bottom-right accent */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-8"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(76, 29, 149, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Horizontal scanline */}
      <div
        className="absolute left-0 right-0 h-px opacity-5"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(30, 58, 138, 0.8), rgba(8, 145, 178, 0.8), transparent)',
          animation: 'scanline 8s linear infinite',
          top: 0,
        }}
      />
    </div>
  )
}
