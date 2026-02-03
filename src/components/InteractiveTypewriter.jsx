import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import './InteractiveTypewriter.css'
import { projects } from '../data/projects'

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.']
]

// Stamps scattered in half circle above typewriter
const STAMP_POSITIONS = [
  { x: -320, y: -80, rotation: -25 },    // Far left
  { x: -220, y: -140, rotation: -15 },   // Left
  { x: -100, y: -180, rotation: -8 },    // Left-center
  { x: 0, y: -200, rotation: 0 },        // Top center
  { x: 100, y: -180, rotation: 8 },      // Right-center
  { x: 220, y: -140, rotation: 15 },     // Right
  { x: 320, y: -80, rotation: 25 },      // Far right
  { x: 0, y: -120, rotation: -3 },       // Inner center (slightly lower)
]

// Proper Stamp with SVG perforations and floating
const DeskStamp = ({ project, position, onDrop, isDropped, onClick, index }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const stampRef = useRef(null)
  const dragStart = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    if (isDropped) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    
    const onMove = (e) => {
      setDragPos({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      })
    }
    
    const onUp = () => {
      setIsDragging(false)
      
      const paper = document.querySelector('.typewriter-paper')
      if (paper && stampRef.current) {
        const paperRect = paper.getBoundingClientRect()
        const stampRect = stampRef.current.getBoundingClientRect()
        const centerX = stampRect.left + stampRect.width / 2
        const centerY = stampRect.top + stampRect.height / 2
        
        if (centerX >= paperRect.left && centerX <= paperRect.right &&
            centerY >= paperRect.top && centerY <= paperRect.bottom) {
          onDrop(project)
        }
      }
      
      setDragPos({ x: 0, y: 0 })
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // Stamp behavior - no visual change when used, always clickable

  return (
    <motion.div
      ref={stampRef}
      className={`desk-stamp ${isDragging ? 'desk-stamp--dragging' : ''}`}
      style={{
        '--stamp-color': project.color,
        '--stamp-accent': project.accentColor,
        left: position.x,
        top: position.y
      }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -6 - (index % 3), 0],
        rotate: [position.rotation, position.rotation + (index % 2 === 0 ? 2 : -2), position.rotation]
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        scale: { duration: 0.5, delay: index * 0.1 },
        y: { duration: 3 + (index % 2), repeat: Infinity, ease: "easeInOut", delay: index * 0.15 },
        rotate: { duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
      }}
      onMouseDown={handleMouseDown}
      onClick={() => !isDragging && onClick(project)}
      whileHover={{ 
        scale: 1.08, 
        rotate: 0,
        zIndex: 100,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
    >
      <div 
        className="desk-stamp__inner"
        style={{
          transform: `translate(${dragPos.x}px, ${dragPos.y}px) rotate(${position.rotation}deg)`
        }}
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
  const [stampedProject, setStampedProject] = useState(null)
  const [usedStamps, setUsedStamps] = useState([])
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

  const handleStampDrop = (project) => {
    setStampedProject(project)
    setUsedStamps(prev => [...prev, project.id])
    setLines(prev => {
      const newLines = [...prev]
      newLines[currentLine] += ` [${project.title}]`
      return newLines
    })
    setTimeout(() => {
      setStampedProject(null)
      onSelectProject(project)
    }, 600)
  }

  return (
    <div className="interactive-typewriter">
      <div className="typewriter-scene">
        {projects.map((project, index) => (
          <DeskStamp
            key={project.id}
            project={project}
            position={STAMP_POSITIONS[index] || { x: 0, y: 0, rotation: 0 }}
            onDrop={handleStampDrop}
            isDropped={usedStamps.includes(project.id)}
            onClick={onSelectProject}
            index={index}
          />
        ))}

        <div className="typewriter-unit">
          <div className="typewriter-paper" ref={paperRef}>
            {stampedProject && (
              <motion.div
                className="stamp-impression"
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                exit={{ opacity: 0 }}
                style={{ color: stampedProject.accentColor }}
              >
                <svg viewBox="0 0 100 100">
                  <defs>
                    <path id="imp" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"/>
                  </defs>
                  <text fontSize="6" fontFamily="monospace" letterSpacing="2">
                    <textPath href="#imp">
                      {stampedProject.title} • {stampedProject.year} •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            )}

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
