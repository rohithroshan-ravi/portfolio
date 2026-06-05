'use client'

import { useEffect, useRef, useState } from 'react'

const titles = [
  'Full Stack Developer',
  'React & Next.js Specialist',
  'TypeScript Engineer',
  'Web3 & Fintech Builder',
  'UI/UX Craftsman',
]

export default function TerminalText() {
  const [displayed, setDisplayed] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing'>('typing')
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const current = titles[titleIndex]
    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55)
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), 2000)
      }
    }
    if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => setPhase('erasing'), 500)
    }
    if (phase === 'erasing') {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28)
      } else {
        setTitleIndex((i) => (i + 1) % titles.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, phase, titleIndex])

  return (
    <div className="font-mono flex items-center gap-0">
      <span style={{ color: '#00d4ff', textShadow: '0 0 12px rgba(0, 212, 255, 0.3)' }}>
        {displayed}
      </span>
      <span
        className="inline-block w-0.5 h-5 ml-0.5 animate-cursor-blink"
        style={{ background: '#00d4ff', boxShadow: '0 0 6px rgba(0, 212, 255, 0.6)' }}
      />
    </div>
  )
}
