'use client'

import React from 'react'

interface FloatingAnimationProps {
  children: React.ReactNode
  speed?: number
  distance?: number
  className?: string
}

export const FloatingAnimation: React.FC<FloatingAnimationProps> = ({
  children,
  speed = 3,
  distance = 10,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        animation: `floating ${speed}s ease-in-out infinite`,
        // @ts-ignore
        '--float-distance': `${distance}px`,
      }}
    >
      <style>
        {`
          @keyframes floating {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(var(--float-distance, 10px));
            }
          }
        `}
      </style>
      {children}
    </div>
  )
}
