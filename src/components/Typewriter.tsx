'use client'

import { useEffect, useState, useRef } from 'react'

interface TypewriterProps {
  text: string
  className?: string
}

export default function Typewriter({ text, className = '' }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const prevTextRef = useRef(text)

  useEffect(() => {
    if (text !== prevTextRef.current) {
      setDisplayText('')
      prevTextRef.current = text
    }

    setIsTyping(true)
    let currentIndex = displayText.length

    if (currentIndex >= text.length) {
      setIsTyping(false)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1))
    }, 50 + Math.random() * 30)

    return () => clearTimeout(timeout)
  }, [text, displayText])

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ]

  return (
    <div className={`relative w-full max-w-[520px] mx-auto ${className}`}>
      {/* Paper with typing text */}
      <div className="relative z-20 w-[52%] mx-auto mb-[-60px]">
        <div
          className="relative bg-[#FFFEF9] px-5 py-4 min-h-[200px]"
          style={{
            boxShadow: `
              0 2px 8px rgba(0,0,0,0.06),
              0 8px 24px rgba(0,0,0,0.04),
              inset 0 0 0 1px rgba(0,0,0,0.02)
            `,
            background: 'linear-gradient(180deg, #FFFEF9 0%, #FBF9F4 100%)',
            animation: 'paperSway 8s ease-in-out infinite',
          }}
        >
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Paper header */}
          <div
            className="flex justify-between text-[8px] text-[#AAA] pb-2 mb-4 border-b border-[#E8E4DC]"
            style={{ fontFamily: 'var(--font-typewriter)', letterSpacing: '0.05em' }}
          >
            <span>jittika.2025</span>
            <span>portfolio</span>
          </div>

          {/* Typed content */}
          <div
            className="text-[12px] leading-[2.2] text-[#333] whitespace-pre-wrap"
            style={{ fontFamily: 'var(--font-typewriter)' }}
          >
            {displayText}
            {isTyping && (
              <span
                className="inline-block w-[6px] h-[2px] bg-[#333] ml-[2px] align-middle"
                style={{ animation: 'blink 0.7s steps(1) infinite' }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Typewriter Machine */}
      <div
        className="relative"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 30%'
        }}
      >
        <div
          style={{
            transform: 'rotateX(8deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Paper guide/carriage assembly */}
          <div className="relative z-10 mx-auto w-[85%]">
            {/* Carriage rail */}
            <div
              className="h-[14px] mx-auto rounded-t-sm"
              style={{
                background: 'linear-gradient(180deg, #D4C9B8 0%, #C2B7A6 50%, #B8AD9C 100%)',
                boxShadow: `
                  inset 0 2px 3px rgba(255,255,255,0.4),
                  inset 0 -2px 4px rgba(0,0,0,0.15),
                  0 4px 8px rgba(0,0,0,0.2)
                `,
              }}
            >
              {/* Chrome strip on carriage */}
              <div
                className="absolute top-[2px] left-[5%] right-[5%] h-[3px] rounded-full"
                style={{
                  background: 'linear-gradient(180deg, #F5F5F5 0%, #C0C0C0 50%, #A0A0A0 100%)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              />
            </div>

            {/* Platen (rubber roller) */}
            <div
              className="h-[24px] mx-[8%] relative"
              style={{
                background: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 30%, #0D0D0D 70%, #1A1A1A 100%)',
                borderRadius: '3px 3px 0 0',
                boxShadow: `
                  inset 0 3px 6px rgba(255,255,255,0.1),
                  inset 0 -3px 8px rgba(0,0,0,0.5),
                  0 -2px 4px rgba(0,0,0,0.3)
                `,
              }}
            >
              {/* Rubber texture lines */}
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-[1px]"
                  style={{
                    left: `${2.5 * i}%`,
                    background: 'linear-gradient(180deg, rgba(60,60,60,0.3) 0%, rgba(20,20,20,0.1) 100%)',
                  }}
                />
              ))}

              {/* Platen knobs */}
              <div
                className="absolute -left-[12px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #E8E8E8 0%, #A0A0A0 50%, #606060 100%)',
                  boxShadow: `
                    inset 0 2px 4px rgba(255,255,255,0.5),
                    inset 0 -2px 4px rgba(0,0,0,0.4),
                    2px 2px 6px rgba(0,0,0,0.4)
                  `,
                }}
              >
                <div className="absolute inset-[25%] rounded-full border border-[#888]" />
              </div>
              <div
                className="absolute -right-[12px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #E8E8E8 0%, #A0A0A0 50%, #606060 100%)',
                  boxShadow: `
                    inset 0 2px 4px rgba(255,255,255,0.5),
                    inset 0 -2px 4px rgba(0,0,0,0.4),
                    -2px 2px 6px rgba(0,0,0,0.4)
                  `,
                }}
              >
                <div className="absolute inset-[25%] rounded-full border border-[#888]" />
              </div>
            </div>
          </div>

          {/* Main body */}
          <div
            className="relative mx-auto rounded-t-[20px] pt-6 pb-4 px-4"
            style={{
              background: `linear-gradient(
                180deg,
                #E8DFD0 0%,
                #DDD4C5 15%,
                #D5CCBD 40%,
                #C9C0B1 70%,
                #BEB5A6 100%
              )`,
              boxShadow: `
                inset 0 4px 12px rgba(255,255,255,0.4),
                inset 0 -8px 20px rgba(0,0,0,0.12),
                0 20px 50px rgba(0,0,0,0.25),
                0 8px 20px rgba(0,0,0,0.15)
              `,
            }}
          >
            {/* Top ridge detail */}
            <div
              className="absolute top-0 left-[10%] right-[10%] h-[8px] rounded-t-[12px]"
              style={{
                background: 'linear-gradient(180deg, #EBE3D5 0%, #DDD4C5 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)',
              }}
            />

            {/* Brand emblem area */}
            <div className="relative mb-4 flex justify-center">
              <div
                className="px-6 py-1"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.08) 100%)',
                  borderRadius: '2px',
                }}
              >
                <span
                  className="text-[10px] tracking-[0.3em] text-[#8B8070] uppercase"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  Jittika
                </span>
              </div>
            </div>

            {/* Keyboard section */}
            <div
              className="relative rounded-lg p-3 mx-auto"
              style={{
                background: 'linear-gradient(180deg, #C9C0B1 0%, #B8AF9F 100%)',
                boxShadow: `
                  inset 0 2px 6px rgba(0,0,0,0.15),
                  inset 0 -1px 2px rgba(255,255,255,0.2)
                `,
              }}
            >
              {/* Key rows */}
              {keys.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex justify-center gap-[3px] mb-[3px] last:mb-0"
                  style={{
                    marginLeft: rowIndex === 1 ? '12px' : rowIndex === 2 ? '24px' : '0',
                  }}
                >
                  {row.map((key, keyIndex) => (
                    <div
                      key={key}
                      className="relative group"
                      style={{
                        transform: `translateY(${Math.sin((rowIndex * 10 + keyIndex) * 0.5) * 0.5}px)`,
                      }}
                    >
                      {/* Key stem */}
                      <div
                        className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[14px] h-[8px]"
                        style={{
                          background: 'linear-gradient(180deg, #4A4A4A 0%, #2A2A2A 100%)',
                          borderRadius: '0 0 3px 3px',
                        }}
                      />
                      {/* Key cap */}
                      <div
                        className="relative w-[26px] h-[26px] rounded-full flex items-center justify-center cursor-pointer transition-transform hover:translate-y-[1px]"
                        style={{
                          background: `radial-gradient(ellipse at 50% 30%, #3A3A3A 0%, #1A1A1A 60%, #0A0A0A 100%)`,
                          boxShadow: `
                            inset 0 2px 4px rgba(255,255,255,0.15),
                            inset 0 -3px 6px rgba(0,0,0,0.6),
                            0 4px 6px rgba(0,0,0,0.4),
                            0 1px 2px rgba(0,0,0,0.3)
                          `,
                        }}
                      >
                        {/* Chrome ring */}
                        <div
                          className="absolute inset-[2px] rounded-full"
                          style={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)',
                          }}
                        />
                        <span
                          className="text-[9px] font-medium text-[#F0F0F0] relative z-10"
                          style={{
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                          }}
                        >
                          {key}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Spacebar */}
              <div className="flex justify-center mt-[6px]">
                <div className="relative">
                  {/* Spacebar stem */}
                  <div
                    className="absolute -bottom-[6px] left-1/4 right-1/4 h-[8px]"
                    style={{
                      background: 'linear-gradient(180deg, #4A4A4A 0%, #2A2A2A 100%)',
                      borderRadius: '0 0 4px 4px',
                    }}
                  />
                  <div
                    className="w-[140px] h-[22px] rounded-full cursor-pointer transition-transform hover:translate-y-[1px]"
                    style={{
                      background: `linear-gradient(180deg, #3A3A3A 0%, #1A1A1A 60%, #0A0A0A 100%)`,
                      boxShadow: `
                        inset 0 2px 4px rgba(255,255,255,0.12),
                        inset 0 -3px 6px rgba(0,0,0,0.5),
                        0 4px 6px rgba(0,0,0,0.4)
                      `,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative side panels */}
            <div
              className="absolute left-3 top-[30%] bottom-[20%] w-[6px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.08) 100%)',
              }}
            />
            <div
              className="absolute right-3 top-[30%] bottom-[20%] w-[6px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.1) 100%)',
              }}
            />
          </div>

          {/* Base */}
          <div
            className="relative mx-auto h-[16px] rounded-b-lg"
            style={{
              background: 'linear-gradient(180deg, #B8AF9F 0%, #A89F8F 50%, #989080 100%)',
              boxShadow: `
                inset 0 2px 4px rgba(0,0,0,0.15),
                0 8px 20px rgba(0,0,0,0.2),
                0 4px 10px rgba(0,0,0,0.15)
              `,
            }}
          >
            {/* Rubber feet hints */}
            <div className="absolute bottom-0 left-[15%] w-[30px] h-[4px] bg-[#2A2A2A] rounded-b-sm" />
            <div className="absolute bottom-0 right-[15%] w-[30px] h-[4px] bg-[#2A2A2A] rounded-b-sm" />
          </div>
        </div>
      </div>

      {/* Ambient shadow */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[30px] rounded-[50%]"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      <style jsx>{`
        @keyframes paperSway {
          0%, 100% { transform: rotate(-0.2deg) translateY(0); }
          50% { transform: rotate(0.2deg) translateY(-1px); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
