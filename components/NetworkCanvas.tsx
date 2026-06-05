'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number; opacity: number
}

export default function NetworkCanvas({ particleCount = 50, className = '' }: { particleCount?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    const maxDist = 150
    const mouseRadius = 100

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const initParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.2 + 0.6,
        opacity: Math.random() * 0.4 + 0.15,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius
          p.vx -= (dx / dist) * force * 0.03
          p.vy -= (dy / dist) * force * 0.03
        }
        p.x += p.vx; p.y += p.vy
        p.vx *= 0.99; p.vy *= 0.99
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0,   `rgba(0, 212, 255, ${alpha})`)
            grad.addColorStop(0.5, `rgba(0, 180, 216, ${alpha * 0.6})`)
            grad.addColorStop(1,   `rgba(0, 140, 190, ${alpha})`)
            ctx.beginPath()
            ctx.strokeStyle = grad
            ctx.lineWidth = 0.7
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity * 0.7})`
        ctx.fill()
        // faint halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 180, 216, ${p.opacity * 0.04})`
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    resize()
    draw()
    const obs = new ResizeObserver(resize)
    obs.observe(canvas)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => { cancelAnimationFrame(frameRef.current); obs.disconnect(); window.removeEventListener('mousemove', onMouseMove) }
  }, [particleCount])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} style={{ pointerEvents: 'none' }} />
}
