'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
  threshold?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const initial: Record<string, string | number> = {
    opacity: 0,
    transform:
      direction === 'up'    ? 'translateY(28px)' :
      direction === 'left'  ? 'translateX(-28px)' :
      direction === 'right' ? 'translateX(28px)' :
      'none',
  }

  const final: Record<string, string | number> = {
    opacity: 1,
    transform: 'translateY(0) translateX(0)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...(visible ? final : initial),
      }}
    >
      {children}
    </div>
  )
}
