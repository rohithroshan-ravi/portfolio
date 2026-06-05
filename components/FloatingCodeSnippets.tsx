'use client'

import { useEffect, useState } from 'react'

const snippets = [
  {
    lang: 'tsx',
    code: `const Button = ({ onClick, children }: Props) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    onClick={onClick}
    className="btn-primary"
  >
    {children}
  </motion.button>
)`,
  },
  {
    lang: 'go',
    code: `func (h *Handler) CreateUser(
  c echo.Context,
) error {
  var req CreateUserReq
  if err := c.Bind(&req); err != nil {
    return echo.ErrBadRequest
  }
  user, err := h.svc.Create(req)
  if err != nil {
    return echo.ErrInternal
  }
  return c.JSON(201, user)
}`,
  },
  {
    lang: 'ts',
    code: `async function fetchPortfolio(
  userId: string
): Promise<Portfolio> {
  const res = await fetch(
    \`/api/users/\${userId}/portfolio\`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error()
  return res.json()
}`,
  },
  {
    lang: 'tsx',
    code: `const useWebSocket = (url: string) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const ws = new WebSocket(url)
    ws.onmessage = (e) =>
      setData(JSON.parse(e.data))
    return () => ws.close()
  }, [url])
  return data
}`,
  },
  {
    lang: 'yaml',
    code: `# docker-compose.yml
services:
  api:
    image: rampnow-api:latest
    ports: ["8080:8080"]
    environment:
      - DB_URL=\${DATABASE_URL}
  web:
    image: rampnow-web:latest
    ports: ["3000:3000"]`,
  },
]

interface SnippetItem {
  id: number
  snippet: typeof snippets[0]
  left: string
  delay: number
  duration: number
  size: number
}

export default function FloatingCodeSnippets() {
  const [items, setItems] = useState<SnippetItem[]>([])

  useEffect(() => {
    const generated = snippets.map((snippet, i) => ({
      id: i,
      snippet,
      left: `${5 + i * 19}%`,
      delay: i * 5,
      duration: 28 + i * 4,
      size: 0.65 + (i % 3) * 0.07,
    }))
    setItems(generated)
  }, [])

  if (items.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute bottom-0 font-mono"
          style={{
            left: item.left,
            animation: `float-code ${item.duration}s linear ${item.delay}s infinite`,
            opacity: 0,
            transform: `scale(${item.size})`,
            transformOrigin: 'bottom left',
          }}
        >
          <div
            className="rounded-lg overflow-hidden border"
            style={{
              background: 'rgba(10, 15, 30, 0.7)',
              borderColor: 'rgba(0, 100, 140, 0.12)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* Terminal tab bar */}
            <div
              className="flex items-center gap-1.5 px-3 py-2 border-b"
              style={{ borderColor: 'rgba(0, 100, 140, 0.1)', background: 'rgba(5, 8, 16, 0.5)' }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <span className="w-2 h-2 rounded-full bg-green-500/60" />
              <span
                className="ml-2 text-xs"
                style={{ color: 'rgba(148, 163, 184, 0.5)', fontSize: '10px' }}
              >
                {item.snippet.lang === 'go' ? 'handler.go' : item.snippet.lang === 'yaml' ? 'docker-compose.yml' : 'component.tsx'}
              </span>
            </div>
            <pre
              className="text-xs leading-relaxed p-4"
              style={{ color: 'rgba(148, 163, 184, 0.6)', minWidth: '240px', maxWidth: '320px' }}
            >
              {item.snippet.code}
            </pre>
          </div>
        </div>
      ))}
    </div>
  )
}
