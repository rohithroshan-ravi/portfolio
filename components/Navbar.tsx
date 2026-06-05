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

      // Detect active section
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(1, 2, 5, 0.96)'
          : 'rgba(1, 2, 5, 0.3)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(30, 41, 59, 0.4)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 32px rgba(0, 0, 0, 0.6)' : 'none',
      }}
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-300"
        style={{
          background: 'linear-gradient(90deg, #1e3a8a, #0e7490, #3730a3)',
          width: scrolled ? '100%' : '0%',
          opacity: scrolled ? 0.4 : 0,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-lg flex items-center gap-2 group"
          >
            <span
              className="transition-colors duration-300"
              style={{ color: '#1e3a8a', textShadow: 'none' }}
            >
              &gt;_
            </span>
            <span
              className="bg-clip-text text-transparent transition-all duration-300"
              style={{
                backgroundImage: 'linear-gradient(135deg, #1d4ed8, #4c1d95)',
              }}
            >
              rohithroshan
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg"
                  style={{
                    color: isActive ? '#60a5fa' : '#64748b',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = '#94a3b8'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = '#64748b'
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                        boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)',
                      }}
                    />
                  )}
                </a>
              )
            })}

            {/* Hire me button */}
            <a
              href="#contact"
              className="ml-4 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 border"
              style={{
                background: 'rgba(59, 130, 246, 0.08)',
                borderColor: 'rgba(59, 130, 246, 0.25)',
                color: '#60a5fa',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                e.currentTarget.style.boxShadow = '0 0 16px rgba(59, 130, 246, 0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)'
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.25)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="w-5 h-0.5 rounded transition-all duration-300"
              style={{
                background: '#60a5fa',
                transform: isOpen ? 'translateY(8px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="w-5 h-0.5 rounded transition-all duration-300"
              style={{
                background: '#60a5fa',
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              className="w-5 h-0.5 rounded transition-all duration-300"
              style={{
                background: '#60a5fa',
                transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
          borderBottom: isOpen ? '1px solid rgba(59, 130, 246, 0.08)' : 'none',
        }}
      >
        <div
          className="px-4 pb-4 space-y-1"
          style={{ background: 'rgba(5, 8, 16, 0.95)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
              style={{ color: '#64748b' }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#60a5fa'
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#64748b'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
