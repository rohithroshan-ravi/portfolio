'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Crypto wallet UI mockup ── */
function CryptoMockup() {
  const [tick, setTick] = useState(0)
  const frameRef = useRef<number>(0)
  useEffect(() => {
    let t = 0
    const animate = () => {
      t += 1
      setTick(t)
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const chartData = [40, 55, 42, 68, 58, 72, 65, 80, 74, 88, 82, 95]
  const sparkPath = chartData
    .map((v, i) => `${(i / (chartData.length - 1)) * 100}% ${100 - v}%`)
    .join(', ')

  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 font-mono text-xs">
      {/* Balance */}
      <div className="flex items-center justify-between">
        <div>
          <div style={{ color: 'rgba(148,163,184,0.6)', fontSize: '9px' }}>PORTFOLIO VALUE</div>
          <div
            className="text-xl font-bold mt-0.5"
            style={{ color: '#60a5fa', textShadow: '0 0 12px rgba(96,165,250,0.4)' }}
          >
            $24,831.{String(Math.floor((Math.sin(tick * 0.04) + 1) * 50)).padStart(2, '0')}
          </div>
        </div>
        <div
          className="px-2 py-0.5 rounded text-xs"
          style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}
        >
          +12.4%
        </div>
      </div>

      {/* Sparkline */}
      <div
        className="w-full rounded overflow-hidden relative"
        style={{ height: 48, background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            points={chartData.map((v, i) => `${(i / (chartData.length - 1)) * 100},${100 - v}`).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points={`0,100 ${chartData.map((v, i) => `${(i / (chartData.length - 1)) * 100},${100 - v}`).join(' ')} 100,100`}
            fill="url(#spark-grad)"
          />
          {/* Animated cursor dot */}
          <circle
            cx={(((tick * 0.5) % 100))}
            cy={100 - (chartData[Math.floor((tick * 0.5 / 100) * (chartData.length - 1)) % chartData.length] ?? 70)}
            r="3"
            fill="#60a5fa"
            style={{ filter: 'drop-shadow(0 0 4px #3b82f6)' }}
          />
        </svg>
      </div>

      {/* Token list */}
      {[
        { name: 'ETH', val: '4.82', usd: '$14,211', change: '+8.2%', color: '#a78bfa' },
        { name: 'BTC', val: '0.21', usd: '$8,920', change: '+4.1%', color: '#facc15' },
      ].map((token) => (
        <div key={token.name} className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: 'rgba(59,130,246,0.06)' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: token.color + '22', color: token.color, fontSize: '8px' }}>{token.name[0]}</div>
            <span style={{ color: '#94a3b8', fontSize: '10px' }}>{token.name}</span>
          </div>
          <div className="text-right">
            <div style={{ color: '#e2e8f0', fontSize: '10px' }}>{token.usd}</div>
            <div style={{ color: '#4ade80', fontSize: '9px' }}>{token.change}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Dashboard / admin UI mockup ── */
function DashboardMockup() {
  const [tick, setTick] = useState(0)
  const frameRef = useRef<number>(0)
  useEffect(() => {
    let t = 0
    const animate = () => { t += 1; setTick(t); frameRef.current = requestAnimationFrame(animate) }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const bars = [60, 40, 75, 55, 80, 65, 70, 85, 45, 90]

  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 font-mono text-xs">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Users', val: '12,481', color: '#3b82f6' },
          { label: 'Vol.', val: '$2.4M', color: '#22d3ee' },
          { label: 'TXNs', val: '8,204', color: '#a78bfa' },
        ].map((s) => (
          <div key={s.label} className="rounded p-2 text-center" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.1)' }}>
            <div style={{ color: s.color, fontWeight: 700, fontSize: '11px' }}>{s.val}</div>
            <div style={{ color: 'rgba(148,163,184,0.5)', fontSize: '8px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="flex-1 flex items-end gap-1 px-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-sm transition-all duration-300" style={{
            height: `${h}%`,
            background: `linear-gradient(to top, #3b82f6${Math.abs(Math.sin((tick * 0.03 + i) * 0.5)) > 0.5 ? 'dd' : '66'}, #06b6d4${Math.abs(Math.sin((tick * 0.03 + i) * 0.5)) > 0.5 ? '88' : '33'})`,
            boxShadow: Math.abs(Math.sin((tick * 0.03 + i) * 0.5)) > 0.5 ? '0 0 8px rgba(59,130,246,0.5)' : 'none',
          }} />
        ))}
      </div>

      {/* Status row */}
      <div className="flex items-center justify-between">
        <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: '9px' }}>KYC Verified</span>
        <div className="flex gap-1">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i <= 3 ? '#4ade80' : 'rgba(59,130,246,0.2)' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Map / EV station mockup ── */
function MapMockup() {
  const [tick, setTick] = useState(0)
  const frameRef = useRef<number>(0)
  useEffect(() => {
    let t = 0
    const animate = () => { t += 1; setTick(t); frameRef.current = requestAnimationFrame(animate) }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const pins = [
    { x: 30, y: 40, active: true,  label: 'CH-01' },
    { x: 60, y: 25, active: true,  label: 'CH-02' },
    { x: 75, y: 60, active: false, label: 'CH-03' },
    { x: 20, y: 65, active: true,  label: 'CH-04' },
    { x: 50, y: 70, active: false, label: 'CH-05' },
  ]

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Map grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Road lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,50 Q30,30 60,50 T100,50" stroke="rgba(59,130,246,0.12)" strokeWidth="0.8" fill="none" />
        <path d="M30,0 Q35,50 40,100" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" fill="none" />
        <path d="M70,0 Q65,50 60,100" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Station pins */}
      {pins.map((pin, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -100%)' }}
        >
          {/* Pulse ring for active */}
          {pin.active && (
            <div
              className="absolute rounded-full"
              style={{
                width: 20,
                height: 20,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '2px solid rgba(74,222,128,0.5)',
                animation: `pulse-ring ${1.5 + i * 0.3}s ease-out infinite`,
              }}
            />
          )}
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background: pin.active ? '#4ade80' : 'rgba(148,163,184,0.3)',
              boxShadow: pin.active ? '0 0 8px rgba(74,222,128,0.6)' : 'none',
              fontSize: '6px',
              color: '#050810',
              fontWeight: 700,
            }}
          >
            ⚡
          </div>
          <div
            className="mt-0.5 px-1 rounded font-mono"
            style={{ fontSize: '6px', background: 'rgba(5,8,16,0.8)', color: pin.active ? '#4ade80' : '#475569' }}
          >
            {pin.label}
          </div>
        </div>
      ))}

      {/* Panel overlay bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 p-2 font-mono"
        style={{ background: 'rgba(5,8,16,0.85)', borderTop: '1px solid rgba(59,130,246,0.1)' }}
      >
        <div className="flex justify-between items-center">
          <span style={{ color: '#4ade80', fontSize: '9px' }}>● 3 Active</span>
          <span style={{ color: '#475569', fontSize: '9px' }}>2 Offline</span>
          <span style={{ color: '#60a5fa', fontSize: '9px' }}>12 Users</span>
        </div>
      </div>
    </div>
  )
}

/* ── Form / funding platform mockup ── */
function FormMockup() {
  const [tick, setTick] = useState(0)
  const frameRef = useRef<number>(0)
  useEffect(() => {
    let t = 0
    const animate = () => { t += 1; setTick(t); frameRef.current = requestAnimationFrame(animate) }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const cursorVisible = Math.floor(tick / 30) % 2 === 0

  return (
    <div className="w-full h-full p-4 flex flex-col gap-2.5 font-mono text-xs">
      {/* Page title */}
      <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: '11px' }}>Funding Application</div>

      {/* Fields */}
      {[
        { label: 'Company Name', val: 'Acme Corp', filled: true },
        { label: 'Amount (USD)', val: '$250,000', filled: true },
        { label: 'Project Type', val: 'Series A', filled: true },
      ].map((field) => (
        <div key={field.label}>
          <div style={{ color: 'rgba(148,163,184,0.4)', fontSize: '8px', marginBottom: 2 }}>{field.label}</div>
          <div
            className="w-full rounded px-2 py-1"
            style={{
              background: 'rgba(5,8,16,0.6)',
              border: '1px solid rgba(59,130,246,0.15)',
              color: '#e2e8f0',
              fontSize: '10px',
            }}
          >
            {field.val}
          </div>
        </div>
      ))}

      {/* Active typing field */}
      <div>
        <div style={{ color: 'rgba(148,163,184,0.4)', fontSize: '8px', marginBottom: 2 }}>Description</div>
        <div
          className="w-full rounded px-2 py-1"
          style={{
            background: 'rgba(5,8,16,0.6)',
            border: '1px solid rgba(59,130,246,0.4)',
            boxShadow: '0 0 8px rgba(59,130,246,0.1)',
            fontSize: '10px',
            color: '#94a3b8',
            minHeight: 28,
          }}
        >
          <span>Innovative SaaS platform</span>
          <span style={{ opacity: cursorVisible ? 1 : 0, color: '#60a5fa' }}>|</span>
        </div>
      </div>

      {/* Submit */}
      <div
        className="w-full rounded py-1.5 text-center mt-auto"
        style={{
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          color: 'white',
          fontSize: '10px',
          fontWeight: 700,
          boxShadow: '0 0 12px rgba(59,130,246,0.3)',
        }}
      >
        Submit Application →
      </div>
    </div>
  )
}

const mockups: Record<string, React.FC> = {
  crypto:    CryptoMockup,
  dashboard: DashboardMockup,
  map:       MapMockup,
  form:      FormMockup,
}

interface Props {
  type: keyof typeof mockups
  accentColor: string
}

export default function ProjectMockup({ type, accentColor }: Props) {
  const Component = mockups[type] ?? DashboardMockup

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden relative"
      style={{
        background: 'rgba(5, 8, 16, 0.95)',
        border: `1px solid ${accentColor}20`,
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b"
        style={{
          background: 'rgba(10, 15, 30, 0.8)',
          borderColor: `${accentColor}15`,
        }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(239,68,68,0.6)' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(234,179,8,0.6)' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(74,222,128,0.6)' }} />
        <div
          className="ml-2 flex-1 h-3 rounded-sm font-mono flex items-center px-2"
          style={{ background: 'rgba(59,130,246,0.05)', fontSize: '7px', color: 'rgba(148,163,184,0.3)' }}
        >
          localhost:3000
        </div>
      </div>

      {/* Mockup content */}
      <div className="relative" style={{ height: 'calc(100% - 32px)' }}>
        <Component />
      </div>
    </div>
  )
}
