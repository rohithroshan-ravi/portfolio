'use client'

import React from 'react'

interface GradientAnimationProps {
  className?: string
  speed?: number
}

export const GradientAnimation: React.FC<GradientAnimationProps> = ({
  className = '',
  speed = 8,
}) => {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)`,
        backgroundSize: '400% 400%',
        animation: `gradientShift ${speed}s ease infinite`,
        zIndex: -1,
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  )
}
