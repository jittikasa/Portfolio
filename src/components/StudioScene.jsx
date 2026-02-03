import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import './StudioScene.css'
import { projects } from '../data/projects'

// Helper to get Phuket time
const getPhuketTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Bangkok',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

// Draggable Stamp for the scene
const SceneStamp = ({ project, index, onStampPaper, paperRef }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isOnPaper, setIsOnPaper] = useState(false)
  const controls = useDragControls()
  const stampRef = useRef(null)

  const handleDragEnd = () => {
    setIsDragging(false)
    
    // Check if dropped on paper
    if (paperRef.current && stampRef.current) {
      const paperRect = paperRef.current.getBoundingClientRect()
      const stampRect = stampRef.current.getBoundingClientRect()
      
      const isOverlapping = !(
        stampRect.right < paperRect.left ||
        stampRect.left > paperRect.right ||
        stampRect.bottom < paperRect.top ||
        stampRect.top > paperRect.bottom
      )
      
      if (isOverlapping) {
        onStampPaper(project)
        setIsOnPaper(true)
        setTimeout(() => setIsOnPaper(false), 300)
      }
    }
  }

  // Pseudo-random initial position around the typewriter (deterministic)
  const pseudoRandom1 = ((index * 9301 + 49297) % 233280) / 233280
  const pseudoRandom2 = ((index * 49297 + 9301) % 233280) / 233280
  const pseudoRandom3 = ((index * 12345 + 67890) % 233280) / 233280
  const initialX = (index % 2 === 0 ? 1 : -1) * (150 + pseudoRandom1 * 100)
  const initialY = -50 + pseudoRandom2 * 100
  const rotation = project.rotation + (pseudoRandom3 * 4 - 2)

  return (
    <motion.div
      ref={stampRef}
      className={`scene-stamp ${isDragging ? 'scene-stamp--dragging' : ''} ${isOnPaper ? 'scene-stamp--stamped' : ''}`}
      style={{
        '--stamp-color': project.color,
        '--stamp-accent': project.accentColor
      }}
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ 
        x: isOnPaper ? 0 : initialX, 
        y: isOnPaper ? 0 : initialY, 
        opacity: 1, 
        scale: isOnPaper ? 0.5 : 1,
        rotate: rotation 
      }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      drag
      dragControls={controls}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.1, zIndex: 100 }}
      whileDrag={{ scale: 1.15, zIndex: 200, cursor: 'grabbing' }}
    >
      {/* Stamp body */}
      <div className="scene-stamp__body" style={{ backgroundColor: project.color }}>
        <div className="scene-stamp__perforation scene-stamp__perforation--top" />
        <div className="scene-stamp__perforation scene-stamp__perforation--bottom" />
        <div className="scene-stamp__perforation scene-stamp__perforation--left" />
        <div className="scene-stamp__perforation scene-stamp__perforation--right" />
        
        <div className="scene-stamp__inner">
          <div className="scene-stamp__artwork" style={{ backgroundColor: project.accentColor }}>
            <span>{project.title.charAt(0)}</span>
          </div>
          <div className="scene-stamp__title">{project.title}</div>
        </div>
      </div>
      
      {/* Shadow */}
      <div className="scene-stamp__shadow" />
      
      {/* Drag hint */}
      <div className="scene-stamp__hint">Drag to paper</div>
    </motion.div>
  )
}

// Coffee cup with steam
const CoffeeCup = () => {
  const [isSipping, setIsSipping] = useState(false)

  return (
    <motion.div 
      className="coffee-cup"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      onClick={() => {
        setIsSipping(true)
        setTimeout(() => setIsSipping(false), 1000)
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Steam particles */}
      <div className="coffee-steam">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="coffee-steam__particle"
            animate={{
              y: [-10, -40],
              opacity: [0.6, 0],
              x: [0, (i - 1) * 5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Cup body */}
      <div className={`coffee-cup__body ${isSipping ? 'coffee-cup--sipping' : ''}`}>
        <div className="coffee-cup__rim" />
        <div className="coffee-cup__liquid" />
        <div className="coffee-cup__handle" />
        <div className="coffee-cup__saucer" />
      </div>
      
      {/* Label */}
      <div className="coffee-cup__label"> Phuket Coffee </div>
    </motion.div>
  )
}

// Window with Phuket view
const StudioWindow = () => {
  const [time, setTime] = useState(getPhuketTime())
  const [isDaytime, setIsDaytime] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getPhuketTime()
      setTime(newTime)
      const hour = parseInt(newTime.split(':')[0])
      setIsDaytime(hour >= 6 && hour < 18)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="studio-window"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="studio-window__frame">
        {/* Sky */}
        <div className={`studio-window__sky ${isDaytime ? 'studio-window__sky--day' : 'studio-window__sky--night'}`}>
          {/* Sun or Moon */}
          <div className={`studio-window__celestial ${isDaytime ? 'studio-window__sun' : 'studio-window__moon'}`} />
          
          {/* Clouds */}
          {isDaytime && (
            <>
              <motion.div 
                className="studio-window__cloud"
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="studio-window__cloud studio-window__cloud--2"
                animate={{ x: [0, -15, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
          
          {/* Stars (night only) */}
          {!isDaytime && (
            <div className="studio-window__stars">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="studio-window__star" style={{ 
                  left: `${20 + i * 15}%`, 
                  top: `${20 + (i % 2) * 30}%`,
                  animationDelay: `${i * 0.3}s`
                }} />
              ))}
            </div>
          )}
          
          {/* Palm tree silhouette */}
          <div className="studio-window__palm">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 100 Q50 70 45 50 Q40 30 20 25 M45 50 Q50 35 35 20 M45 50 Q55 35 65 25 M45 50 Q60 40 80 35" 
                stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Sea horizon */}
          <div className="studio-window__sea" />
        </div>
        
        {/* Window frame details */}
        <div className="studio-window__sill" />
        <div className="studio-window__pane studio-window__pane--vertical" />
        <div className="studio-window__pane studio-window__pane--horizontal" />
      </div>
      
      {/* Time display */}
      <div className="studio-window__time">
        <span className="studio-window__location">📍 Phuket</span>
        <span className="studio-window__clock">{time}</span>
      </div>
    </motion.div>
  )
}

// Cork board with Polaroids
const CorkBoard = ({ onSelectProject }) => {
  const polaroids = projects.slice(0, 4)

  return (
    <motion.div 
      className="cork-board"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="cork-board__frame">
        {/* Cork texture */}
        <div className="cork-board__surface" />
        
        {/* Polaroids */}
        {polaroids.map((project, index) => (
          <motion.div
            key={project.id}
            className="polaroid"
            style={{ 
              '--rotation': `${-3 + index * 2}deg`,
              '--x': `${10 + (index % 2) * 45}%`,
              '--y': `${10 + Math.floor(index / 2) * 45}%`
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: -3 + index * 2 }}
            transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            onClick={() => onSelectProject(project)}
          >
            {/* Pin */}
            <div className="polaroid__pin" />
            
            {/* Photo */}
            <div className="polaroid__photo" style={{ backgroundColor: project.color }}>
              <div className="polaroid__artwork" style={{ backgroundColor: project.accentColor }}>
                {project.title.charAt(0)}
              </div>
            </div>
            
            {/* Caption */}
            <div className="polaroid__caption">{project.title}</div>
          </motion.div>
        ))}
        
        {/* Decorative sticky note */}
        <motion.div 
          className="sticky-note"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05, rotate: -1 }}
        >
          <div className="sticky-note__tape" />
          <p>Remember to<br/>drink water 💧</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Desk lamp
const DeskLamp = () => {
  const [isOn, setIsOn] = useState(true)

  return (
    <motion.div 
      className={`desk-lamp ${isOn ? 'desk-lamp--on' : ''}`}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ delay: 0.6 }}
      onClick={() => setIsOn(!isOn)}
    >
      {/* Lamp arm */}
      <div className="desk-lamp__base" />
      <div className="desk-lamp__arm desk-lamp__arm--lower" />
      <div className="desk-lamp__joint" />
      <div className="desk-lamp__arm desk-lamp__arm--upper" />
      
      {/* Lamp head */}
      <div className="desk-lamp__head">
        <div className="desk-lamp__bulb" />
        <div className="desk-lamp__shade" />
      </div>
      
      {/* Light cone */}
      {isOn && (
        <motion.div 
          className="desk-lamp__light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Switch */}
      <div className="desk-lamp__switch">{isOn ? 'ON' : 'OFF'}</div>
    </motion.div>
  )
}

// Pencil holder with pencils
const PencilHolder = () => {
  return (
    <motion.div 
      className="pencil-holder"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="pencil-holder__cup">
        {/* Pencils */}
        <div className="pencil pencil--yellow" />
        <div className="pencil pencil--blue" />
        <div className="pencil pencil--red" />
        <div className="ruler" />
      </div>
    </motion.div>
  )
}

// Main Studio Scene
export default function StudioScene({ onSelectProject }) {
  const [stampedProject, setStampedProject] = useState(null)
  const [typedText, setTypedText] = useState([''])
  const [currentLine, setCurrentLine] = useState(0)
  const paperRef = useRef(null)

  // Handle stamp dropped on paper
  const handleStampPaper = (project) => {
    setStampedProject(project)
    setTimeout(() => setStampedProject(null), 2000)
    onSelectProject(project)
  }

  // Handle typing
  const handleType = useCallback((char) => {
    setTypedText(prev => {
      const newLines = [...prev]
      if (!newLines[currentLine]) newLines[currentLine] = ''
      
      if (char === 'ENTER') {
        setCurrentLine(currentLine + 1)
        newLines[currentLine + 1] = ''
      } else if (char === 'BACKSPACE') {
        newLines[currentLine] = newLines[currentLine].slice(0, -1)
      } else {
        newLines[currentLine] += char
      }
      return newLines
    })
  }, [currentLine])

  return (
    <div className="studio-scene">
      {/* Wood desk surface */}
      <div className="studio-scene__desk">
        {/* Wood grain texture */}
        <div className="studio-scene__wood-grain" />
        
        {/* Desk shadow/vignette */}
        <div className="studio-scene__vignette" />
      </div>

      {/* Window - top right */}
      <StudioWindow />

      {/* Cork board - top left */}
      <CorkBoard onSelectProject={onSelectProject} />

      {/* Desk lamp - left side */}
      <DeskLamp />

      {/* Typewriter - center */}
      <div className="studio-scene__typewriter-area">
        <motion.div 
          className="scene-typewriter"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Paper with ref for drop detection */}
          <div className="scene-typewriter__paper-wrapper" ref={paperRef}>
            <div className="scene-typewriter__paper">
              {/* Stamped impression */}
              <AnimatePresence>
                {stampedProject && (
                  <motion.div
                    className="paper-stamp"
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                      '--stamp-color': stampedProject.color,
                      '--stamp-accent': stampedProject.accentColor 
                    }}
                  >
                    <div className="paper-stamp__content" style={{ backgroundColor: stampedProject.color }}>
                      <span style={{ color: stampedProject.accentColor }}>
                        {stampedProject.title.charAt(0)}
                      </span>
                    </div>
                    <div className="paper-stamp__text">{stampedProject.title}</div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Typed text */}
              <div className="scene-typewriter__text">
                <div className="scene-typewriter__header">
                  <span>jittika.2024</span>
                  <span>design studio</span>
                </div>
                {typedText.map((line, i) => (
                  <div key={i} className="scene-typewriter__line">
                    {line || (i === currentLine ? '▌' : '')}
                  </div>
                ))}
                {!stampedProject && typedText.length < 3 && (
                  <div className="scene-typewriter__hint">
                    Drag a stamp here or type...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Typewriter body */}
          <div className="scene-typewriter__body">
            <div className="scene-typewriter__keyboard">
              {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, i) => (
                <div key={i} className="scene-typewriter__key-row">
                  {row.split('').map(char => (
                    <button 
                      key={char}
                      className="scene-typewriter__key"
                      onClick={() => handleType(char)}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              ))}
              <div className="scene-typewriter__key-row">
                <button className="scene-typewriter__key scene-typewriter__key--wide" onClick={() => handleType('ENTER')}>
                  ENTER
                </button>
                <button className="scene-typewriter__key scene-typewriter__key--space" onClick={() => handleType(' ')}>
                  SPACE
                </button>
                <button className="scene-typewriter__key scene-typewriter__key--wide" onClick={() => handleType('BACKSPACE')}>
                  ⌫
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating stamps around typewriter */}
      <div className="studio-scene__stamps">
        {projects.map((project, index) => (
          <SceneStamp 
            key={project.id}
            project={project}
            index={index}
            onStampPaper={handleStampPaper}
            paperRef={paperRef}
          />
        ))}
      </div>

      {/* Coffee cup - right side */}
      <CoffeeCup />

      {/* Pencil holder - left side */}
      <PencilHolder />

      {/* Plant - decoration */}
      <motion.div 
        className="studio-plant"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: 'spring' }}
      >
        <div className="studio-plant__pot" />
        <div className="studio-plant__leaf studio-plant__leaf--1" />
        <div className="studio-plant__leaf studio-plant__leaf--2" />
        <div className="studio-plant__leaf studio-plant__leaf--3" />
      </motion.div>
    </div>
  )
}
