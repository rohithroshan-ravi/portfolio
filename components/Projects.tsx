'use client'

import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import ProjectMockup from './ProjectMockup'

const projects = [
  {
    title: 'Noah Wallet',
    subtitle: 'Crypto wallet browser extension',
    description: 'Feature-rich crypto wallet extension with portfolio management, multi-chain support, and token swapping. Built for performance with optimized re-renders and efficient state management.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Go', 'Echo'],
    features: ['Portfolio Dashboard', 'Token Swapping', 'Activity Tracking', 'Multi-network Support'],
    link: 'https://github.com/rohithroshan-ravi/noah-wallet',
    accentColor: '#1d4ed8',
    tag: 'Web3',
    mockup: 'crypto' as const,
  },
  {
    title: 'Rampnow Platform',
    subtitle: 'Fintech onramp & management platform',
    description: 'End-to-end onramp widget and admin/partner panel built in a Turborepo monorepo. Includes KYC flow, Apple Pay integration, and a complete design system with 60+ components.',
    technologies: ['Next.js', 'TypeScript', 'Turborepo', 'Go', 'Docker'],
    features: ['KYC Integration', 'Payment Gateways', 'Design System', 'Role-based Access'],
    accentColor: '#6d28d9',
    tag: 'Fintech',
    mockup: 'dashboard' as const,
  },
  {
    title: 'EV Charge Station',
    subtitle: 'Infrastructure management platform',
    description: 'Comprehensive admin panel for managing EV charging infrastructure across multiple stations. Real-time map visualization with optimized pin renders and role-based authorization.',
    technologies: ['React', 'Redux', 'Google Maps API', 'Material-UI'],
    features: ['Station Management', 'Real-time Analytics', 'Map Visualization', 'Role Auth'],
    accentColor: '#0e7490',
    tag: 'Enterprise',
    mockup: 'map' as const,
  },
  {
    title: 'Funding Platform',
    subtitle: 'SSR-optimized management system',
    description: 'Server-side rendered user and admin panels for funding operations. SEO-optimized with canonical tags, sitemap, and Google Analytics integration. Built with Next.js + MUI.',
    technologies: ['Next.js', 'SSR', 'Material-UI', 'Formik', 'Google Analytics'],
    features: ['User Dashboard', 'Admin Controls', 'SEO Optimized', 'Responsive Design'],
    accentColor: '#92400e',
    tag: 'SaaS',
    mockup: 'form' as const,
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 80}>
      <div
        className="group relative rounded-xl border overflow-hidden cursor-default transition-all duration-400 h-full flex flex-col"
        style={{
          background: 'rgba(3, 5, 10, 0.9)',
          borderColor: hovered ? project.accentColor + '40' : 'rgba(30, 41, 59, 0.5)',
          boxShadow: hovered ? `0 0 40px ${project.accentColor}18, 0 16px 48px rgba(0,0,0,0.3)` : 'none',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top gradient band */}
        <div
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}22)`,
            opacity: hovered ? 1 : 0.3,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Animated mockup thumbnail */}
        <div
          className="mx-4 mt-4 rounded-lg overflow-hidden transition-all duration-500"
          style={{
            height: 160,
            opacity: hovered ? 1 : 0.7,
            transform: hovered ? 'scale(1.01)' : 'scale(1)',
            boxShadow: hovered ? `0 0 24px ${project.accentColor}30` : 'none',
            border: `1px solid ${project.accentColor}18`,
          }}
        >
          <ProjectMockup type={project.mockup} accentColor={project.accentColor} />
        </div>

        {/* Card header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded mb-2 inline-block"
                style={{
                  background: project.accentColor + '15',
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}30`,
                }}
              >
                {project.tag}
              </span>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{project.subtitle}</p>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200"
                style={{
                  background: 'rgba(1, 2, 5, 0.9)',
                  borderColor: 'rgba(59, 130, 246, 0.15)',
                  color: '#1d4ed8',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1d4ed8'
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)'
                  e.currentTarget.style.background = 'rgba(1, 2, 5, 0.9)'
                }}
                onClick={e => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px" style={{ background: 'rgba(30, 41, 59, 0.3)' }} />

        {/* Features */}
        <div className="px-6 py-4 flex-1">
          <p
            className="font-mono text-xs mb-3 tracking-widest uppercase"
            style={{ color: project.accentColor + 'aa' }}
          >
            Key Features
          </p>
          <ul className="space-y-1.5">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: project.accentColor, boxShadow: `0 0 4px ${project.accentColor}` }}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-2 py-0.5 rounded border"
                style={{
                  background: 'rgba(1, 2, 5, 0.9)',
                  borderColor: 'rgba(30, 41, 59, 0.5)',
                  color: '#64748b',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-4 sm:px-6 lg:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(13,21,38,0.5) 50%, rgba(5,8,16,0) 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <p className="font-mono text-sm text-blue-500/60 tracking-widest uppercase mb-3">
            &gt; ls -la ./projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #1d4ed8, #0e7490)' }}
            >
              Projects
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <ScrollReveal className="text-center mt-14">
          <a
            href="https://github.com/rohithroshan-ravi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border font-semibold transition-all duration-300"
            style={{
              background: 'rgba(3, 5, 10, 0.85)',
              borderColor: 'rgba(59, 130, 246, 0.15)',
              color: '#1d4ed8',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.3)'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(59, 130, 246, 0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)'
              e.currentTarget.style.background = 'rgba(3, 5, 10, 0.85)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View All Projects on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
