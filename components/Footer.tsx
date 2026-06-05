'use client'

import ScrollReveal from './ScrollReveal'

export default function Footer() {
  return (
    <footer
      className="relative py-12 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        background: '#050810',
        borderColor: 'rgba(30, 41, 59, 0.4)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono font-bold text-lg flex items-center gap-2">
            <span style={{ color: '#3b82f6', textShadow: '0 0 10px rgba(59, 130, 246, 0.4)' }}>&gt;_</span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #a78bfa)' }}
            >
              rohithroshan
            </span>
          </div>

          <p className="font-mono text-xs text-slate-700">
            © 2025 Rohithroshan Ravi — Built with Next.js & Tailwind CSS
          </p>

          <div className="flex items-center gap-5">
            {[
              { href: 'https://github.com/rohithroshan-ravi', label: 'GitHub' },
              { href: 'https://linkedin.com/in/rohithroshan-r', label: 'LinkedIn' },
              { href: 'mailto:rohithroshan374@gmail.com', label: 'Email' },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="font-mono text-xs transition-colors duration-200"
                style={{ color: '#334155' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#60a5fa')}
                onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
              >
                {label}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
