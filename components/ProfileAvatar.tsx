'use client'

import { useEffect, useRef, useState } from 'react'

const orbitItems = [
  { label: 'React',   angle: 0,   color: '#00d4ff', size: 36 },
  { label: 'TS',      angle: 72,  color: '#0891b2', size: 32 },
  { label: 'Go',      angle: 144, color: '#00b4d8', size: 32 },
  { label: 'Next',    angle: 216, color: '#67e8f9', size: 30 },
  { label: 'Docker',  angle: 288, color: '#0891b2', size: 30 },
]

interface Props { imageSrc?: string; size?: number; orbitRadius?: number }

function OrbitBadge({ label, angle, color, size, orbitRadius, tick }: {
  label: string; angle: number; color: string; size: number; orbitRadius: number; tick: number
}) {
  const rad = ((angle + tick * 0.3) * Math.PI) / 180
  const x = Math.cos(rad) * orbitRadius
  const y = Math.sin(rad) * orbitRadius

  return (
    <div
      className="absolute flex items-center justify-center rounded-full font-mono font-bold"
      style={{
        width: size, height: size,
        left: '50%', top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        background: '#000000',
        border: `1px solid ${color}33`,
        color,
        boxShadow: `0 0 8px ${color}22`,
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
      if (time - lastRef.current > 16) { setTick(t => t + 1); lastRef.current = time }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const containerSize = size + orbitRadius * 2 + 40

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: containerSize, height: containerSize }}>

      {/* SVG rings */}
      <svg className="absolute" width={containerSize} height={containerSize} viewBox={`0 0 ${containerSize} ${containerSize}`} style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="ring-g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0.5" />
            <stop offset="50%"  stopColor="#0891b2" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#003d52" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ring-g2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#00b4d8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#003d52" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Orbit path guide */}
        <circle cx={containerSize/2} cy={containerSize/2} r={orbitRadius}
          fill="none" stroke="rgba(0, 180, 216, 0.05)" strokeWidth="1" strokeDasharray="4 10" />

        {/* Rotating arc 1 */}
        <circle cx={containerSize/2} cy={containerSize/2} r={size/2 + 12}
          fill="none" stroke="url(#ring-g1)" strokeWidth="1.5"
          strokeDasharray={`${Math.PI * (size/2 + 12) * 0.55} ${Math.PI * (size/2 + 12) * 1.45}`}
          strokeLinecap="round"
          transform={`rotate(${tick * 0.4}, ${containerSize/2}, ${containerSize/2})`} />

        {/* Counter-rotating arc 2 */}
        <circle cx={containerSize/2} cy={containerSize/2} r={size/2 + 24}
          fill="none" stroke="url(#ring-g2)" strokeWidth="0.8"
          strokeDasharray={`${Math.PI * (size/2 + 24) * 0.3} ${Math.PI * (size/2 + 24) * 1.7}`}
          strokeLinecap="round"
          transform={`rotate(${-tick * 0.22}, ${containerSize/2}, ${containerSize/2})`} />

        {/* Pulse ring */}
        <circle cx={containerSize/2} cy={containerSize/2} r={size/2 + 6}
          fill="none"
          stroke={`rgba(0, 212, 255, ${0.06 + 0.05 * Math.sin(tick * 0.06)})`}
          strokeWidth={0.8 + Math.sin(tick * 0.06) * 0.4} />
      </svg>

      {/* Orbiting tech badges */}
      {orbitItems.map((item) => (
        <OrbitBadge key={item.label} {...item} orbitRadius={orbitRadius} tick={tick} />
      ))}

      {/* Avatar circle */}
      <div
        className="relative rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: size, height: size,
          background: 'linear-gradient(135deg, #010203 0%, #000000 100%)',
          border: '1.5px solid rgba(0, 180, 216, 0.15)',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.08), 0 0 60px rgba(0, 212, 255, 0.03), inset 0 0 20px rgba(0, 180, 216, 0.04)',
          zIndex: 2,
        }}
      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt="Rohithroshan R" className="w-full h-full object-cover" style={{ filter: 'brightness(0.9) contrast(1.1) saturate(0.9)' }} />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            {/* Grid decoration */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,180,216,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(0,212,255,0.07) 0%, transparent 70%)' }} />
            <span
              className="relative z-10 font-bold tracking-widest"
              style={{
                fontSize: size * 0.2,
                background: 'linear-gradient(135deg, #00d4ff, #0891b2)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              RR
            </span>
            <span className="relative z-10 font-mono mt-1" style={{ color: 'rgba(0, 180, 216, 0.3)', fontSize: size * 0.05 }}>
              &lt;dev /&gt;
            </span>
          </div>
        )}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.025) 0%, transparent 55%)' }} />
      </div>

      {/* Status badge */}
      <div
        className="absolute z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono"
        style={{
          bottom: containerSize / 2 - size / 2 - 4,
          left: '50%', transform: 'translateX(-50%)',
          background: '#000000',
          borderColor: 'rgba(0, 180, 216, 0.2)',
          fontSize: '10px', color: '#0891b2',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.08)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-glow-pulse" style={{ background: '#00d4ff', boxShadow: '0 0 4px rgba(0, 212, 255, 0.8)' }} />
        Available
      </div>
    </div>
  )
}
