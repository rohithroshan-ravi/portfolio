'use client'

import React from 'react'

interface ShinyTextProps {
  text: string
  color?: string
  shineColor?: string
  speed?: number
  spread?: number
  direction?: 'left' | 'right'
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  speed = 2,
  spread = 120,
  direction = 'left',
}) => {
  const animationDirection = direction === 'left' ? '100%' : '-100%'

  return (
    <div className="relative inline-block">
      <style>
        {`
          @keyframes shiny-text {
            0% {
              background-position: ${animationDirection} 0;
            }
            100% {
              background-position: 0 0;
            }
          }
          
          .shiny-text {
            background: linear-gradient(
              ${spread}deg,
              ${color},
              ${shineColor},
              ${color}
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shiny-text ${speed}s linear infinite;
          }
        `}
      </style>
      <span className="shiny-text text-inherit font-inherit">{text}</span>
    </div>
  )
}
