'use client'

import ScrollReveal from './ScrollReveal'

const experiences = [
  {
    company: 'Rampnow',
    companyUrl: '#',
    position: 'Full Stack Developer',
    period: 'May 2024 – Present',
    type: 'Full-time',
    color: '#00d4ff',
    technologies: ['Turborepo', 'Next.js', 'Go', 'Echo', 'Docker', 'Storybook'],
    achievements: [
      'Architected and implemented a full design system with 60+ components, used across admin, partner, and widget apps in a Turborepo monorepo',
      'Built the Rampnow onramp widget with KYC via Sumsub, Google reCAPTCHA v3, and Apple Pay SDK',
      'Integrated Paysafe and Zen payment gateways with end-to-end transaction flows',
      'Designed role-based access control for multi-tenant admin and partner panels',
    ],
  },
  {
    company: 'Phantom Smart Solutions',
    companyUrl: '#',
    position: 'Software Developer',
    period: 'Jun 2022 – May 2024',
    type: 'Full-time',
    color: '#006d8a',
    technologies: ['React', 'Next.js', 'MUI', 'Redux', 'Context API', 'Google Maps'],
    achievements: [
      'Built SSR-optimized user and admin panels for a funding platform using Next.js + Material UI',
      'Developed an EV charge station admin with real-time map visualization and role-based authorization',
      'Optimized Map View memory by stabilizing pin renders, reducing reflows by ~70%',
      'Owned multiple frontend repos from architecture through deployment',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,180,216,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <p className="font-mono text-sm font-mono text-xs tracking-widest uppercase mb-3">
            &gt; work_history.json
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Professional{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #00d4ff, #006d8a)' }}
            >
              Experience
            </span>
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(0,180,216,0.35) 10%, rgba(0,180,216,0.35) 90%, transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ScrollReveal
                key={index}
                delay={index * 120}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center" style={{ marginTop: '24px' }}>
                    <div
                      className="w-4 h-4 rounded-full border-2 relative z-10"
                      style={{
                        borderColor: exp.color,
                        background: '#050810',
                        boxShadow: `0 0 12px ${exp.color}66`,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full animate-pulse-ring"
                        style={{ background: exp.color + '33' }}
                      />
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />

                  {/* Card */}
                  <div className="flex-1 ml-16 md:ml-0">
                    <div
                      className="p-7 rounded-xl border transition-all duration-400 group"
                      style={{
                        background: 'rgba(3, 5, 10, 0.9)',
                        borderColor: 'rgba(0, 60, 80, 0.5)',
                        backdropFilter: 'blur(8px)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = exp.color + '44'
                        e.currentTarget.style.boxShadow = `0 0 32px ${exp.color}22, 0 8px 32px rgba(0,0,0,0.3)`
                        e.currentTarget.style.transform = 'translateY(-3px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(0, 60, 80, 0.5)'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      {/* Card header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                          <p className="font-semibold" style={{ color: exp.color }}>
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                          <span
                            className="font-mono text-sm text-xs"
                          >
                            {exp.period}
                          </span>
                          <span
                            className="text-xs px-2.5 py-0.5 rounded-full font-mono"
                            style={{
                              background: exp.color + '15',
                              color: exp.color,
                              border: `1px solid ${exp.color}33`,
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs px-2.5 py-1 rounded border transition-colors duration-200"
                            style={{
                              background: 'rgba(1, 2, 5, 0.9)',
                              borderColor: 'rgba(0, 100, 140, 0.12)',
                              color: '#2a4a4a',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Achievements */}
                      <ul className="space-y-2.5">
                        {exp.achievements.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs text-sm leading-relaxed">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                              style={{ background: exp.color, boxShadow: `0 0 6px ${exp.color}88` }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Education */}
        <ScrollReveal delay={200} className="mt-20">
          <div
            className="p-7 rounded-xl border"
            style={{
              background: 'rgba(3, 5, 10, 0.9)',
              borderColor: 'rgba(0, 60, 80, 0.5)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ background: 'rgba(0, 60, 80, 0.5)', color: '#00d4ff' }}
              >
                🎓
              </div>
              <h3 className="text-lg font-bold text-white">Education</h3>
            </div>
            <p className="font-semibold mb-1" style={{ color: '#0891b2' }}>Mechatronics Engineering</p>
            <p className="text-xs text-sm">The Kavery College of Engineering, Chennai</p>
            <p className="font-mono text-xs text-slate-600 mt-2">May 2021 · CGPA 7.65</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
