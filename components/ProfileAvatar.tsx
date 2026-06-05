'use client'

import { useEffect, useRef, useState } from 'react'

const orbitItems = [
  { label: 'React',   angle: 0,   color: '#61dafb', size: 36 },
  { label: 'TS',      angle: 72,  color: '#3178c6', size: 32 },
  { label: 'Go',      angle: 144, color: '#00add8', size: 32 },
  { label: 'Next',    angle: 216, color: '#ffffff', size: 30 },
  { label: 'Docker',  angle: 288, color: '#2496ed', size: 30 },
]

interface Props {
  imageSrc?: string
  size?: number
  orbitRadius?: number
}

function OrbitBadge({
  label, angle, color, size, orbitRadius, tick,
}: {
  label: string; angle: number; color: string; size: number; orbitRadius: number; tick: number
}) {
  const rad = ((angle + tick * 0.3) * Math.PI) / 180
  const x = Math.cos(rad) * orbitRadius
  const y = Math.sin(rad) * orbitRadius

  return (
    <div
      className="absolute flex items-center justify-center rounded-full font-mono font-bold text-xs transition-none"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        background: `rgba(5, 8, 16, 0.9)`,
        border: `1px solid ${color}44`,
        color,
        boxShadow: `0 0 10px ${color}33, inset 0 0 8px ${color}11`,
        fontSize: label.length > 2 ? '8px' : '10px',
        willChange: 'transform',
      }}
    >
      {label}
    </div>
  )
}

export default function ProfileAvatar({ imageSrc, size = 220, orbitRadius = 140 }: Props) {
  const [tick, setTick] = useState(0)
  const frameRef = useRef<number>(0)
  const lastRef = useRef<number>(0)

  useEffect(() => {
    const animate = (time: number) => {
      if (time - lastRef.current > 16) {
        setTick(t => t + 1)
        lastRef.current = time
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const containerSize = size + orbitRadius * 2 + 40

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: containerSize, height: containerSize }}
    >
      {/* Outer slow-rotating dashed ring */}
      <svg
        className="absolute"
        width={containerSize}
        height={containerSize}
        viewBox={`0 0 ${containerSize} ${containerSize}`}
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id="ring-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="ring-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Orbit path (visual guide) */}
        <circle
          cx={containerSize / 2}
          cy={containerSize / 2}
          r={orbitRadius}
          fill="none"
          stroke="rgba(59, 130, 246, 0.06)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {/* Rotating arc ring 1 */}
        <circle
          cx={containerSize / 2}
          cy={containerSize / 2}
          r={size / 2 + 12}
          fill="none"
          stroke="url(#ring-grad-1)"
          strokeWidth="1.5"
          strokeDasharray={`${Math.PI * (size / 2 + 12) * 0.6} ${Math.PI * (size / 2 + 12) * 1.4}`}
          strokeLinecap="round"
          transform={`rotate(${tick * 0.4}, ${containerSize / 2}, ${containerSize / 2})`}
        />

        {/* Counter-rotating arc ring 2 */}
        <circle
          cx={containerSize / 2}
          cy={containerSize / 2}
          r={size / 2 + 24}
          fill="none"
          stroke="url(#ring-grad-2)"
          strokeWidth="1"
          strokeDasharray={`${Math.PI * (size / 2 + 24) * 0.35} ${Math.PI * (size / 2 + 24) * 1.65}`}
          strokeLinecap="round"
          transform={`rotate(${-tick * 0.25}, ${containerSize / 2}, ${containerSize / 2})`}
        />

        {/* Pulse ring */}
        <circle
          cx={containerSize / 2}
          cy={containerSize / 2}
          r={size / 2 + 6}
          fill="none"
          stroke={`rgba(59, 130, 246, ${0.1 + 0.08 * Math.sin(tick * 0.06)})`}
          strokeWidth={1 + Math.sin(tick * 0.06) * 0.5}
        />
      </svg>

      {/* Orbit badges */}
      {orbitItems.map((item) => (
        <OrbitBadge
          key={item.label}
          label={item.label}
          angle={item.angle}
          color={item.color}
          size={item.size}
          orbitRadius={orbitRadius}
          tick={tick}
        />
      ))}

      {/* Profile image circle */}
      <div
        className="relative rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #0d1526 0%, #0a1020 100%)',
          border: '2px solid rgba(59, 130, 246, 0.2)',
          boxShadow: `0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(59, 130, 246, 0.08), inset 0 0 30px rgba(59, 130, 246, 0.05)`,
          zIndex: 2,
        }}
      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt="Rohithroshan R"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.95) contrast(1.05)' }}
          />
        ) : (
          /* Stylized initials placeholder */
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            {/* Grid decoration */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Radial glow */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(59,130,246,0.12) 0%, transparent 70%)',
              }}
            />
            <span
              className="relative z-10 font-bold tracking-widest"
              style={{
                fontSize: size * 0.22,
                background: 'linear-gradient(135deg, #60a5fa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
              }}
            >
              RR
            </span>
            <span
              className="relative z-10 font-mono text-xs mt-1"
              style={{ color: 'rgba(96, 165, 250, 0.4)', fontSize: size * 0.055 }}
            >
              &lt;dev /&gt;
            </span>
          </div>
        )}

        {/* Inner glow overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Status indicator */}
      <div
        className="absolute z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono"
        style={{
          bottom: containerSize / 2 - size / 2 - 4,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(5, 8, 16, 0.9)',
          borderColor: 'rgba(74, 222, 128, 0.3)',
          fontSize: '10px',
          color: '#4ade80',
          boxShadow: '0 0 12px rgba(74, 222, 128, 0.15)',
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-green-400"
          style={{ animation: 'glow-pulse 2s ease-in-out infinite', boxShadow: '0 0 4px rgba(74, 222, 128, 0.8)' }}
        />
        Available
      </div>
    </div>
  )
}
