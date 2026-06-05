'use client'

import { useEffect, useRef, useState } from 'react'
import GridBackground from './GridBackground'
import NetworkCanvas from './NetworkCanvas'
import FloatingCodeSnippets from './FloatingCodeSnippets'
import TerminalText from './TerminalText'

const terminalLines = [
  { delay: 600,  text: '$ git log --oneline -3',                 color: '#1a3a3a' },
  { delay: 1000, text: 'a3f8c12 feat: implement payment gateway', color: '#0f4a3a' },
  { delay: 1200, text: 'b7d2e89 fix: optimize render perf',       color: '#0f4a3a' },
  { delay: 1400, text: 'c4a1f34 feat: add KYC verification',      color: '#0f4a3a' },
  { delay: 2000, text: '$ npm run build',                         color: '#1a3a3a' },
  { delay: 2600, text: '⚙  Compiling...',                        color: '#3a2a0a' },
  { delay: 3200, text: '✓ Compiled in 3.2s',                     color: '#0f4a3a' },
  { delay: 3500, text: '✓ 24 routes generated',                   color: '#0f4a3a' },
  { delay: 3800, text: '✓ Bundle optimized: 142 KB',             color: '#0f4a3a' },
  { delay: 4400, text: '$ docker build -t rampnow:latest .',      color: '#1a3a3a' },
  { delay: 5200, text: '✓ Image built successfully',              color: '#0f4a3a' },
  { delay: 5800, text: '$ _',                                     color: '#003d52' },
]

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  useEffect(() => {
    const timers = terminalLines.map((line, i) => setTimeout(() => setVisibleLines(v => [...v, i]), line.delay))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="rounded-xl overflow-hidden border font-mono text-sm relative"
      style={{ background: '#000000', borderColor: 'rgba(0, 180, 216, 0.12)', boxShadow: '0 0 32px rgba(0, 212, 255, 0.04), inset 0 1px 0 rgba(255,255,255,0.01)' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: 'rgba(0, 180, 216, 0.08)', background: 'rgba(0,0,0,0.9)' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(239,68,68,0.3)' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(234,179,8,0.3)' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,212,255,0.3)' }} />
        <span className="ml-3 text-xs" style={{ color: '#003d52' }}>rohith@dev ~ portfolio</span>
        <span className="ml-auto text-xs px-2 py-0.5 rounded font-mono"
          style={{ background: 'rgba(0, 80, 110, 0.15)', color: '#003d52' }}>zsh</span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-1.5 min-h-[300px]">
        {terminalLines.map((line, i) => (
          <div key={i} className="transition-all duration-300"
            style={{ opacity: visibleLines.includes(i) ? 1 : 0, transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(4px)', color: line.color }}
          >
            {line.text}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none rounded-xl"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)' }} />
    </div>
  )
}

function StatBadge({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg border cursor-default transition-all duration-300"
      style={{ background: '#000000', borderColor: 'rgba(0, 60, 80, 0.6)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + '30'; e.currentTarget.style.boxShadow = `0 0 14px ${color}12` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 60, 80, 0.6)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <span className="text-xl font-bold font-mono" style={{ color }}>{value}</span>
      <span className="text-xs" style={{ color: '#1a3a3a' }}>{label}</span>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth  - 0.5) * 10
      const dy = (e.clientY / window.innerHeight - 0.5) * 6
      el.style.setProperty('--px', `${dx}px`)
      el.style.setProperty('--py', `${dy}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const t = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  })

  return (
    <section ref={sectionRef} id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#000000' }}
    >
      <GridBackground />
      <NetworkCanvas particleCount={45} />
      <FloatingCodeSnippets />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20"
        style={{ transform: 'translate(var(--px, 0), var(--py, 0))', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div className="space-y-8">

            {/* Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs"
              style={{
                background: '#000000', borderColor: 'rgba(0, 180, 216, 0.12)',
                color: '#006d8a', ...t(0.1),
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
                style={{ background: '#00d4ff', boxShadow: '0 0 5px rgba(0,212,255,0.7)' }} />
              Available for opportunities
            </div>

            {/* Name */}
            <div style={t(0.2)}>
              <p className="font-mono text-xs mb-2 tracking-widest uppercase" style={{ color: '#003d52' }}>
                &gt; whoami
              </p>
              <h1 className="text-5xl md:text-6xl font-bold leading-none tracking-tight">
                <span style={{ color: '#e2e8f0' }}>Rohithroshan</span>
                <br />
                <span className="bg-clip-text text-transparent animate-shimmer"
                  style={{ backgroundImage: 'linear-gradient(135deg, #00d4ff 0%, #0891b2 40%, #00b4d8 100%)', backgroundSize: '200% auto' }}
                >
                  Ravi
                </span>
              </h1>
            </div>

            {/* Typing title */}
            <div className="flex items-center gap-2 text-base" style={{ ...t(0.45), transitionProperty: 'opacity' }}>
              <span className="font-mono text-xs" style={{ color: '#003d52' }}>~/role →</span>
              <TerminalText />
            </div>

            {/* Bio */}
            <p className="text-base leading-relaxed max-w-lg" style={{ color: '#1a3a3a', ...t(0.55) }}>
              3+ years building production systems — crypto wallets, payment gateways, EV charging platforms.
              Clean typesafe frontends backed by performant Go APIs.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3" style={t(0.7)}>
              <StatBadge value="3+"  label="Years exp."    color="#00d4ff" />
              <StatBadge value="20+" label="Projects"      color="#0891b2" />
              <StatBadge value="10+" label="Technologies"  color="#00b4d8" />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4" style={t(0.85)}>
              <a href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #003d52, #0369a1)', border: '1px solid rgba(0, 180, 216, 0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(0, 212, 255, 0.2)'; e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(0, 180, 216, 0.25)' }}
              >
                View Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              <a href="#contact"
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg font-semibold transition-all duration-300 border"
                style={{ background: '#000000', borderColor: 'rgba(0, 60, 80, 0.7)', color: '#1a3a3a' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0, 180, 216, 0.25)'; e.currentTarget.style.color = '#0891b2' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 60, 80, 0.7)'; e.currentTarget.style.color = '#1a3a3a' }}
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right — terminal */}
          <div style={{ ...t(0.35), transitionProperty: 'opacity, transform' }}>
            <TerminalWindow />
            <div className="mt-3 flex justify-end gap-2 px-1">
              {['React', 'Next.js', 'TypeScript', 'Go', 'Docker'].map(tech => (
                <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded" style={{ color: '#003d52', background: '#000000', fontSize: '10px' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 mt-16" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s 1.1s ease' }}>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#003d52' }}>Scroll</span>
          <div className="relative w-5 h-9 rounded-full flex items-start justify-center p-1"
            style={{ border: '1px solid rgba(0, 60, 80, 0.5)' }}
          >
            <div className="w-1 h-2.5 rounded-full" style={{ background: 'linear-gradient(to bottom, #00d4ff, #0891b2)', animation: 'scroll-dot 2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          80% { transform: translateY(14px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
