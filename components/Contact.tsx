'use client'

import { FormEvent, useState } from 'react'
import ScrollReveal from './ScrollReveal'

const socialLinks = [
  {
    label: 'Email',
    value: 'rohithroshan374@gmail.com',
    href: 'mailto:rohithroshan374@gmail.com',
    color: '#3b82f6',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Rohithroshan-R',
    href: 'https://linkedin.com/in/rohithroshan-r',
    color: '#0ea5e9',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'rohithroshan-ravi',
    href: 'https://github.com/rohithroshan-ravi',
    color: '#a78bfa',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

function GlowInput({
  id, type = 'text', name, value, onChange, placeholder, required, label,
}: {
  id: string; type?: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string; required?: boolean; label: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-slate-500 mb-2 tracking-wide uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 rounded-lg text-white text-sm placeholder-slate-600 outline-none transition-all duration-300 font-mono"
          style={{
            background: 'rgba(1, 2, 5, 0.95)',
            border: `1px solid ${focused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(30, 41, 59, 0.5)'}`,
            boxShadow: focused ? '0 0 0 3px rgba(30, 41, 59, 0.4), 0 0 16px rgba(30, 41, 59, 0.5)' : 'none',
          }}
        />
      </div>
    </div>
  )
}

function GlowTextarea({
  id, name, value, onChange, placeholder, rows = 5,
}: {
  id: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string; rows?: number
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-slate-500 mb-2 tracking-wide uppercase">
        Message
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-lg text-white text-sm placeholder-slate-600 outline-none transition-all duration-300 font-mono resize-none"
        style={{
          background: 'rgba(1, 2, 5, 0.95)',
          border: `1px solid ${focused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(30, 41, 59, 0.5)'}`,
          boxShadow: focused ? '0 0 0 3px rgba(30, 41, 59, 0.4), 0 0 16px rgba(30, 41, 59, 0.5)' : 'none',
        }}
      />
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setIsSending(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitted(false)
    }, 4000)
  }

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5,8,16,0) 0%, rgba(13,21,38,0.5) 50%, rgba(5,8,16,0) 100%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <p className="font-mono text-sm text-blue-500/60 tracking-widest uppercase mb-3">
            &gt; contact --open
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              Touch
            </span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-base">
            Open to new opportunities, collaboration, and interesting projects.
            Reach out — I respond within 24 hours.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Social links */}
          <div className="lg:col-span-2 space-y-4">
            <ScrollReveal>
              <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-4">Connect</p>
            </ScrollReveal>
            {socialLinks.map((link, i) => (
              <ScrollReveal key={i} delay={i * 60} direction="left">
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group"
                  style={{
                    background: 'rgba(3, 5, 10, 0.85)',
                    borderColor: 'rgba(30, 41, 59, 0.5)',
                    color: '#94a3b8',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = link.color + '44'
                    e.currentTarget.style.boxShadow = `0 0 20px ${link.color}18`
                    e.currentTarget.style.transform = 'translateX(4px)'
                    e.currentTarget.style.color = link.color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(30, 41, 59, 0.5)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.color = '#94a3b8'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{ background: link.color + '15', color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white">{link.label}</p>
                    <p className="font-mono text-xs truncate">{link.value}</p>
                  </div>
                  <svg className="w-4 h-4 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </ScrollReveal>
            ))}

            {/* Availability */}
            <ScrollReveal delay={240} className="mt-6">
              <div
                className="p-4 rounded-xl border"
                style={{
                  background: 'rgba(74, 222, 128, 0.04)',
                  borderColor: 'rgba(74, 222, 128, 0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full bg-green-400"
                    style={{ boxShadow: '0 0 6px rgba(74, 222, 128, 0.8)', animation: 'glow-pulse 2s ease-in-out infinite' }}
                  />
                  <span className="font-mono text-xs text-green-400">Available for hire</span>
                </div>
                <p className="text-slate-500 text-xs">Open to full-time, contract, and freelance work.</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Form */}
          <ScrollReveal delay={160} direction="right" className="lg:col-span-3">
            <div
              className="rounded-xl border p-7"
              style={{
                background: 'rgba(3, 5, 10, 0.9)',
                borderColor: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p className="font-mono text-xs text-blue-500/60 mb-6">$ send_message --to rohith</p>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'rgba(59, 130, 246, 0.15)', boxShadow: '0 0 20px rgba(30, 58, 138, 0.15)' }}
                  >
                    ✓
                  </div>
                  <p className="text-white font-semibold">Message Transmitted!</p>
                  <p className="text-slate-500 text-sm">I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <GlowInput id="name" name="name" label="Name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                    <GlowInput id="email" type="email" name="email" label="Email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                  <GlowInput id="subject" name="subject" label="Subject" value={formData.subject} onChange={handleChange} placeholder="Project inquiry" required />
                  <GlowTextarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." />

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: isSending
                        ? 'rgba(59, 130, 246, 0.5)'
                        : 'linear-gradient(135deg, #2563eb, #7c3aed)',
                      boxShadow: isSending ? 'none' : '0 0 0 rgba(59, 130, 246, 0)',
                      cursor: isSending ? 'wait' : 'pointer',
                    }}
                    onMouseEnter={e => {
                      if (!isSending) e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.2)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = '0 0 0 rgba(59, 130, 246, 0)'
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSending ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Transmitting...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
