'use client'

import { useEffect, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal'

const skillCategories = [
  {
    category: 'Frontend',
    icon: '⚡',
    color: '#00d4ff',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    color: '#0891b2',
    skills: ['Go (Echo)', 'Node.js', 'REST APIs', 'Microservices', 'Docker'],
  },
  {
    category: 'State & Forms',
    icon: '🔄',
    color: '#006d8a',
    skills: ['Redux', 'Context API', 'Formik', 'React Hook Form', 'Zod'],
  },
  {
    category: 'UI Libraries',
    icon: '🎨',
    color: '#003d52',
    skills: ['MUI', 'Shadcn UI', 'Storybook', 'Tailwind CSS'],
  },
  {
    category: 'DevOps & Tools',
    icon: '🛠️',
    color: '#003d2e',
    skills: ['Git', 'GitHub', 'GitLab', 'Docker', 'Turborepo', 'Vite'],
  },
  {
    category: 'Data & Analytics',
    icon: '📊',
    color: '#3a2a0a',
    skills: ['ApexCharts', 'Google Charts', 'Data Tables', 'SEO & Analytics'],
  },
]

const proficiency = [
  { name: 'React & Next.js',    level: 95, color: '#00d4ff' },
  { name: 'TypeScript',         level: 90, color: '#00d4ff' },
  { name: 'Tailwind CSS',       level: 92, color: '#0891b2' },
  { name: 'Go / Node.js',       level: 85, color: '#0891b2' },
  { name: 'State Management',   level: 88, color: '#006d8a' },
  { name: 'System Design',      level: 80, color: '#006d8a' },
]

function ProgressBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
        <span
          className="font-mono text-xs font-semibold transition-all duration-1000"
          style={{ color, opacity: animated ? 1 : 0 }}
        >
          {level}%
        </span>
      </div>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(0, 60, 80, 0.4)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: animated ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: animated ? `0 0 8px ${color}66` : 'none',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(13,21,38,0.4) 50%, rgba(5,8,16,0) 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <p className="font-mono text-sm font-mono text-xs tracking-widest uppercase mb-3">
            &gt; skills.config.ts
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Skills &{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #00d4ff, #006d8a)' }}
            >
              Expertise
            </span>
          </h2>
        </ScrollReveal>

        {/* Skill category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {skillCategories.map((cat, index) => (
            <ScrollReveal key={index} delay={index * 60}>
              <div
                className="p-6 rounded-xl border h-full transition-all duration-300 group cursor-default"
                style={{
                  background: 'rgba(3, 5, 10, 0.85)',
                  borderColor: 'rgba(0, 60, 80, 0.4)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = cat.color + '40'
                  e.currentTarget.style.boxShadow = `0 0 24px ${cat.color}18, 0 8px 32px rgba(0,0,0,0.2)`
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 60, 80, 0.4)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
                    style={{ background: cat.color + '15' }}
                  >
                    {cat.icon}
                  </div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: cat.color }}
                  >
                    {cat.category}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs px-2.5 py-1 rounded transition-all duration-200"
                      style={{
                        background: 'rgba(1, 2, 5, 0.9)',
                        border: `1px solid ${cat.color}20`,
                        color: '#2a4a4a',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Proficiency bars */}
        <ScrollReveal>
          <div
            className="rounded-xl border p-8"
            style={{
              background: 'rgba(3, 5, 10, 0.85)',
              borderColor: 'rgba(0, 60, 80, 0.4)',
            }}
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span
                className="font-mono text-xs px-2.5 py-1 rounded"
                style={{ background: 'rgba(0,100,140,0.1)', color: '#00d4ff' }}
              >
                proficiency
              </span>
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proficiency.map((skill, i) => (
                <ProgressBar
                  key={i}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
