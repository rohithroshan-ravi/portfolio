'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  { name: 'Home',       href: '#home' },
  { name: 'About',      href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background:    scrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.2)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom:  scrolled ? '1px solid rgba(0, 180, 216, 0.07)' : '1px solid transparent',
        boxShadow:     scrolled ? '0 1px 40px rgba(0, 0, 0, 0.8)' : 'none',
      }}
    >
      {/* Bottom progress line */}
      <div className="absolute bottom-0 left-0 h-px transition-all duration-300"
        style={{
          background: 'linear-gradient(90deg, #00d4ff, #0891b2, #003d52)',
          width: scrolled ? '100%' : '0%',
          opacity: scrolled ? 0.35 : 0,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="font-mono font-bold text-lg flex items-center gap-2 group">
            <span className="transition-colors duration-300 group-hover:text-cyan-400"
              style={{ color: '#003d52' }}
            >
              &gt;_
            </span>
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #0891b2, #00d4ff)' }}
            >
              rohithroshan
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a key={link.name} href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg"
                  style={{ color: isActive ? '#00d4ff' : '#1a3a3a' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#006d8a' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#1a3a3a' }}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #00d4ff, #0891b2)', boxShadow: '0 0 6px rgba(0, 212, 255, 0.6)' }} />
                  )}
                </a>
              )
            })}

            <a href="#contact"
              className="ml-4 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 border"
              style={{ background: 'rgba(0, 60, 80, 0.15)', borderColor: 'rgba(0, 180, 216, 0.2)', color: '#0891b2' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 80, 110, 0.25)'; e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.35)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(0,212,255,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 60, 80, 0.15)'; e.currentTarget.style.borderColor = 'rgba(0, 180, 216, 0.2)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {[
              { transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none' },
              { opacity: isOpen ? 0 : 1 },
              { transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' },
            ].map((style, i) => (
              <span key={i} className="w-5 h-0.5 rounded transition-all duration-300"
                style={{ background: '#0891b2', ...style }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
          borderBottom: isOpen ? '1px solid rgba(0, 180, 216, 0.07)' : 'none',
        }}
      >
        <div className="px-4 pb-4 space-y-1" style={{ background: 'rgba(0, 0, 0, 0.97)' }}>
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              className="block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
              style={{ color: '#1a3a3a' }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={e => { e.currentTarget.style.color = '#00d4ff'; e.currentTarget.style.background = 'rgba(0, 80, 110, 0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#1a3a3a'; e.currentTarget.style.background = 'transparent' }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
