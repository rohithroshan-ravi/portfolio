'use client'

import React from 'react'

interface GlowingBorderProps {
  children: React.ReactNode
  glowColor?: string
  borderColor?: string
  intensity?: number
  className?: string
}

export const GlowingBorder: React.FC<GlowingBorderProps> = ({
  children,
  glowColor = '#3b82f6',
  borderColor = '#1e293b',
  intensity = 0.6,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{
        boxShadow: `0 0 20px rgba(59, 130, 246, ${intensity}), inset 0 0 20px rgba(59, 130, 246, ${intensity * 0.3})`,
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          animation: `shimmer 3s infinite`,
        }}
      >
        <style>
          {`
            @keyframes shimmer {
              0% {
                left: -100%;
              }
              100% {
                left: 100%;
              }
            }
          `}
        </style>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
