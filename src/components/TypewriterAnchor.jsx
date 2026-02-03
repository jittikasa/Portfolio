import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './TypewriterAnchor.css'

const INITIAL_LINES = [
  { text: 'Hello,', typed: true },
  { text: "I'm Jittika.", typed: true },
  { text: '', typed: true },
  { text: 'Designer & Maker', typed: true },
  { text: 'from Phuket.', typed: true },
]

export default function TypewriterAnchor() {
  const [cursorVisible, setCursorVisible] = useState(true)
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isInView])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="typewriter-anchor">
      <motion.div 
        className="typewriter-anchor__inner"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Paper */}
        <div className="typewriter-anchor__paper">
          {/* Header line */}
          <div className="typewriter-anchor__header">
            <span>jittika.2024</span>
            <span>design studio</span>
          </div>

          {/* Content */}
          <div className="typewriter-anchor__content">
            {INITIAL_LINES.map((line, index) => (
              <div 
                key={index} 
                className={`typewriter-anchor__line ${line.text ? '' : 'typewriter-anchor__line--empty'}`}
              >
                {line.text}
                {index === INITIAL_LINES.length - 1 && (
                  <span className={`typewriter-anchor__cursor ${cursorVisible ? 'typewriter-anchor__cursor--visible' : ''}`}>
                    ▌
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Footer dots */}
          <div className="typewriter-anchor__footer">····</div>
        </div>

        {/* Typewriter body */}
        <div className="typewriter-anchor__body">
          {/* Roller */}
          <div className="typewriter-anchor__roller">
            <div className="typewriter-anchor__roller-knob" />
            <div className="typewriter-anchor__roller-bar" />
            <div className="typewriter-anchor__roller-knob" />
          </div>

          {/* Main body */}
          <div className="typewriter-anchor__chassis">
            {/* Ribbon slots */}
            <div className="typewriter-anchor__ribbon">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="typewriter-anchor__ribbon-slot" />
              ))}
            </div>

            {/* Brand */}
            <div className="typewriter-anchor__brand">JITTIKA S.</div>

            {/* Keys */}
            <div className="typewriter-anchor__keys">
              <div className="typewriter-anchor__key-row">
                {'QWERTYUIOP'.split('').map(l => (
                  <span key={l} className="typewriter-anchor__key">{l}</span>
                ))}
              </div>
              <div className="typewriter-anchor__key-row typewriter-anchor__key-row--offset">
                {'ASDFGHJKL'.split('').map(l => (
                  <span key={l} className="typewriter-anchor__key">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div className="typewriter-anchor__shadow" />
      </motion.div>
    </div>
  )
}
