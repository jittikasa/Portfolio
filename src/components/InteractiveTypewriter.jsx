import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import './InteractiveTypewriter.css'
import { projects } from '../data/projects'

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.']
]

// Clean spread - 4 left, 4 right, natural desk arrangement
const STAMP_POSITIONS = [
  { x: -320, y: -20, rotation: -8 },     // Far left
  { x: -220, y: -60, rotation: 12 },     // Left upper
  { x: -120, y: -80, rotation: -5 },     // Left top
  { x: -40, y: -90, rotation: 3 },       // Near left
  { x: 40, y: -90, rotation: -3 },       // Near right
  { x: 120, y: -80, rotation: 5 },       // Right top
  { x: 220, y: -60, rotation: -12 },     // Right upper
  { x: 320, y: -20, rotation: 8 },       // Far right
]

// Simple floating stamp - no drag, just click
const DeskStamp = ({ project, position, onClick, index }) => {
  return (
    <motion.div
      className="desk-stamp"
      style={{
        '--stamp-color': project.color,
        '--stamp-accent': project.accentColor,
        left: `calc(50% + ${position.x}px)`,
        top: position.y
      }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -5, 0],
      }}
      transition={{
        opacity: { duration: 0.4, delay: index * 0.08 },
        scale: { duration: 0.4, delay: index * 0.08 },
        y: { duration: 2.5 + (index % 3) * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
      }}
      onClick={() => onClick(project)}
      whileHover={{ 
        scale: 1.1, 
        y: -10,
        zIndex: 1000,
        transition: { type: 'spring', stiffness: 400, damping: 15 }
      }}
    >
      <div 
        className="desk-stamp__inner"
        style={{ transform: `rotate(${position.rotation}deg)` }}
      >
        <StampSVG project={project} />
      </div>
    </motion.div>
  )
}

// SVG Stamp
const StampSVG = ({ project }) => (
  <div className="stamp-svg">
    <svg viewBox="0 0 100 130" className="stamp-svg__border">
      <defs>
        <mask id={`stamp-mask-${project.id}`}>
          <rect width="100" height="130" fill="white"/>
          {Array.from({ length: 11 }).map((_, i) => (
            <circle key={`t${i}`} cx={5 + i * 9} cy="2.5" r="2.8" fill="black"/>
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <circle key={`b${i}`} cx={5 + i * 9} cy="127.5" r="2.8" fill="black"/>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={`l${i}`} cx="2.5" cy={6 + i * 9} r="2.8" fill="black"/>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={`r${i}`} cx="97.5" cy={6 + i * 9} r="2.8" fill="black"/>
          ))}
        </mask>
      </defs>
      <rect 
        width="100" 
        height="130" 
        fill={project.color}
        mask={`url(#stamp-mask-${project.id})`}
      />
    </svg>
    
    <div className="stamp-svg__content" style={{ backgroundColor: project.color }}>
      {project.id.charCodeAt(0) % 3 === 0 && (
        <div className="stamp-svg__postmark">
          <svg viewBox="0 0 70 70">
            <defs>
              <path id={`pm-${project.id}`} d="M 35,35 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"/>
            </defs>
            <text fill="rgba(44,44,44,0.12)" fontSize="5" fontFamily="monospace" letterSpacing="2">
              <textPath href={`#pm-${project.id}`}>
                {project.year} • PHUKET •
              </textPath>
            </text>
          </svg>
        </div>
      )}
      
      <div className="stamp-svg__header">
        <span>THAILAND</span>
        <span>{project.year}</span>
      </div>
      
      <div 
        className="stamp-svg__artwork"
        style={{ backgroundColor: project.accentColor }}
      >
        <span>{project.title.charAt(0)}</span>
      </div>
      
      <div className="stamp-svg__value">
        {parseInt(project.year) - 2018}B
      </div>
      
      <div className="stamp-svg__title">{project.title}</div>
    </div>
    
    <div className="stamp-svg__shadow" />
  </div>
)

export default function InteractiveTypewriter({ onSelectProject }) {
  const [lines, setLines] = useState([''])
  const [currentLine, setCurrentLine] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [pressedKey, setPressedKey] = useState(null)
  const paperRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(interval)
  }, [])

  const handleType = useCallback((char) => {
    setPressedKey(char)
    setLines(prev => {
      const newLines = [...prev]
      if (!newLines[currentLine]) newLines[currentLine] = ''
      newLines[currentLine] += char
      return newLines
    })
    setTimeout(() => setPressedKey(null), 150)
  }, [currentLine])

  const handleBackspace = useCallback(() => {
    setPressedKey('BACKSPACE')
    setLines(prev => {
      const newLines = [...prev]
      newLines[currentLine] = (newLines[currentLine] || '').slice(0, -1)
      return newLines
    })
    setTimeout(() => setPressedKey(null), 150)
  }, [currentLine])

  const handleEnter = useCallback(() => {
    setPressedKey('ENTER')
    setCurrentLine(prev => prev + 1)
    setLines(prev => [...prev, ''])
    setTimeout(() => setPressedKey(null), 150)
  }, [currentLine])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Backspace') { e.preventDefault(); handleBackspace() }
      else if (e.key === 'Enter') { e.preventDefault(); handleEnter() }
      else if (e.key === ' ') { e.preventDefault(); handleType(' ') }
      else if (e.key.length === 1 && e.key.match(/[a-zA-Z0-9\s.,!?;:'"-]/)) {
        e.preventDefault()
        handleType(e.key.toUpperCase())
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleType, handleBackspace, handleEnter])



  return (
    <div className="interactive-typewriter">
      <div className="typewriter-scene">
        {projects.map((project, index) => (
          <DeskStamp
            key={project.id}
            project={project}
            position={STAMP_POSITIONS[index] || { x: 0, y: 0, rotation: 0 }}
            onClick={onSelectProject}
            index={index}
          />
        ))}

        <div className="typewriter-unit">
          <div className="typewriter-paper" ref={paperRef}>
            <div className="typewriter-paper__header">
              <span>jittika.2024</span>
              <span>design studio</span>
            </div>

            <div className="typewriter-paper__content">
              {lines.map((line, i) => (
                <div key={i} className="typewriter-paper__line">
                  {line}
                  {i === currentLine && (
                    <span className={`cursor ${cursorVisible ? 'cursor--on' : ''}`}>▌</span>
                  )}
                </div>
              ))}
            </div>

            <div className="typewriter-paper__footer">
              <span>····</span>
            </div>
          </div>

          <div className="typewriter-body">
            <div className="typewriter-roller">
              <div className="roller-knob" />
              <div className="roller-bar" />
              <div className="roller-knob" />
            </div>

            <div className="typewriter-chassis">
              <div className="typewriter-ribbon">
                {Array.from({ length: 22 }).map((_, i) => (
                  <div key={i} className="ribbon-slot" />
                ))}
              </div>

              <div className="typewriter-brand">JITTIKA S.</div>

              <div className="typewriter-keys">
                {KEYBOARD_ROWS.map((row, i) => (
                  <div key={i} className={`key-row ${i === 1 ? 'key-row--offset' : ''}`}>
                    {row.map(char => (
                      <button
                        key={char}
                        className={`key ${pressedKey === char ? 'key--pressed' : ''}`}
                        onClick={() => handleType(char)}
                      >
                        {char}
                      </button>
                    ))}
                  </div>
                ))}
                <div className="key-row key-row--bottom">
                  <button className={`key key--wide ${pressedKey === 'ENTER' ? 'key--pressed' : ''}`} onClick={handleEnter}>ENTER</button>
                  <button className={`key key--space ${pressedKey === ' ' ? 'key--pressed' : ''}`} onClick={() => handleType(' ')}>SPACE</button>
                  <button className={`key key--wide ${pressedKey === 'BACKSPACE' ? 'key--pressed' : ''}`} onClick={handleBackspace}>⌫</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        className="scene-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="handwritten">Drag stamps to paper or click to view</span>
      </motion.div>
    </div>
  )
}
