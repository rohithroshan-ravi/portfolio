'use client'

import { useEffect, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal'
import ProfileAvatar from './ProfileAvatar'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const steps = 40
          const increment = target / steps
          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= target) { setCount(target); clearInterval(interval) }
            else setCount(Math.floor(current))
          }, 1200 / steps)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 3,   suffix: '+', label: 'Years Experience',     color: '#00d4ff', glow: 'rgba(0,180,216,0.15)' },
  { value: 20,  suffix: '+', label: 'Projects Shipped',     color: '#0891b2', glow: 'rgba(8,145,178,0.15)'  },
  { value: 10,  suffix: '+', label: 'Technologies Mastered',color: '#006d8a', glow: 'rgba(0,100,140,0.15)' },
  { value: 100, suffix: '%', label: 'Committed to Quality', color: '#00d4ff', glow: 'rgba(0,180,216,0.15)' },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <ScrollReveal className="text-center mb-20">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: '#003d52' }}>
            &gt; about.md
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">About</span>{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #0891b2, #00d4ff)' }}
            >
              Me
            </span>
          </h2>
        </ScrollReveal>

        {/* Profile + text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Avatar side */}
          <ScrollReveal direction="left" className="flex justify-center">
            {/* Pass imageSrc="/profile.jpg" once you add your photo to /public/ */}
            <ProfileAvatar size={200} orbitRadius={120} />
          </ScrollReveal>

          {/* Text side */}
          <div className="space-y-5">
            {[
              `I'm a full-stack developer with 3+ years building production-grade systems across fintech, Web3, and enterprise. I bridge clean typesafe frontends with performant backend APIs.`,
              `My stack: React, Next.js, TypeScript on the frontend — Go (Echo) with microservice patterns on the backend. I care deeply about developer experience, bundle performance, and component architecture.`,
              `Currently at Rampnow, building the onramp widget, admin/partner dashboards, and a full design system in a Turborepo monorepo. Previously shipped EV charging and funding platforms at Phantom Smart Solutions.`,
            ].map((text, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <p className="text-slate-500 leading-relaxed text-base">{text}</p>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={300} className="flex flex-wrap gap-2 pt-2">
              {[
                { icon: '📍', text: 'Chennai, India' },
                { icon: '✉️', text: 'rohithroshan374@gmail.com' },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border font-mono"
                  style={{
                    background: 'rgba(1, 2, 5, 0.95)',
                    borderColor: 'rgba(0, 100, 140, 0.3)',
                    color: '#1a3a3a',
                  }}
                >
                  <span>{icon}</span>
                  {text}
                </span>
              ))}
            </ScrollReveal>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div
                className="p-5 rounded-xl border text-center cursor-default transition-all duration-300"
                style={{
                  background: 'rgba(1, 2, 5, 0.95)',
                  borderColor: 'rgba(0, 60, 80, 0.8)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = stat.color + '33'
                  e.currentTarget.style.boxShadow = `0 0 20px ${stat.glow}`
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 60, 80, 0.8)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  className="text-3xl font-bold font-mono mb-1"
                  style={{ color: stat.color }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-600 text-xs">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
