import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './StampCollection.css'
import { projects } from '../data/projects'

// Filter tabs
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'app', label: 'Apps' },
  { id: 'website', label: 'Web' },
  { id: 'design', label: 'Design' }
]

// Generate scattered positions for stamps
const generateScatterPositions = (count) => {
  const positions = []
  const usedRects = []
  
  for (let i = 0; i < count; i++) {
    let attempts = 0
    let pos
    
    do {
      // Random position within grid area (percentages)
      const x = 15 + Math.random() * 65 // 15-80%
      const y = 10 + Math.random() * 75 // 10-85%
      const rotation = -15 + Math.random() * 30 // -15 to 15 deg
      const scale = 0.85 + Math.random() * 0.3 // 0.85-1.15
      
      pos = { x, y, rotation, scale }
      attempts++
    } while (attempts < 50 && usedRects.some(rect => 
      Math.abs(rect.x - pos.x) < 20 && Math.abs(rect.y - pos.y) < 25
    ))
    
    usedRects.push(pos)
    positions.push(pos)
  }
  
  return positions
}

// Generate organized grid positions
const generateGridPositions = (count) => {
  const positions = []
  const cols = 3
  
  for (let i = 0; i < count; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    
    positions.push({
      x: 20 + col * 28, // 20%, 48%, 76%
      y: 15 + row * 35, // staggered rows
      rotation: -3 + (i % 2) * 6, // alternating slight tilt
      scale: 1
    })
  }
  
  return positions
}

// Individual Stamp with SVG perforated edges
const StampCard = ({ project, position, onClick, index }) => {
  const { title, subtitle, type, year, color, accentColor, tags } = project
  
  // Size based on featured status
  const isLarge = project.featured
  const width = isLarge ? 160 : 130
  const height = isLarge ? 200 : 165

  return (
    <motion.div
      className={`stamp-card ${isLarge ? 'stamp-card--large' : ''} stamp-card--${type}`}
      style={{ 
        '--stamp-color': color,
        '--stamp-accent': accentColor,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 10 + index
      }}
      initial={{ 
        x: `${position.x}%`, 
        y: `${position.y}%`,
        rotate: position.rotation,
        scale: 0,
        opacity: 0
      }}
      animate={{ 
        x: `${position.x}%`, 
        y: `${position.y}%`,
        rotate: position.rotation,
        scale: position.scale,
        opacity: 1
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: index * 0.05
      }}
      whileHover={{ 
        scale: position.scale * 1.08,
        rotate: 0,
        zIndex: 100,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      onClick={() => onClick(project)}
    >
      {/* SVG Perforated border */}
      <svg 
        className="stamp-card__border" 
        viewBox="0 0 100 130" 
        preserveAspectRatio="none"
      >
        <defs>
          <mask id={`stamp-mask-${project.id}`}>
            <rect width="100" height="130" fill="white"/>
            {/* Top edge teeth */}
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={`t${i}`} cx={5 + i * 8.3} cy="3" r="3.5" fill="black"/>
            ))}
            {/* Bottom edge teeth */}
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={`b${i}`} cx={5 + i * 8.3} cy="127" r="3.5" fill="black"/>
            ))}
            {/* Left edge teeth */}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={`l${i}`} cx="3" cy={6 + i * 8.3} r="3.5" fill="black"/>
            ))}
            {/* Right edge teeth */}
            {Array.from({ length: 15 }).map((_, i) => (
              <circle key={`r${i}`} cx="97" cy={6 + i * 8.3} r="3.5" fill="black"/>
            ))}
          </mask>
        </defs>
        <rect 
          width="100" 
          height="130" 
          fill={color}
          mask={`url(#stamp-mask-${project.id})`}
        />
      </svg>

      {/* Inner content */}
      <div className="stamp-card__inner">
        {/* Postmark overlay on some stamps */}
        {index % 3 === 0 && (
          <div className="stamp-card__postmark">
            <svg viewBox="0 0 80 80">
              <defs>
                <path id={`circle-${project.id}`} d="M 40,40 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"/>
              </defs>
              <text fill="rgba(42,31,20,0.25)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="1.5">
                <textPath href={`#circle-${project.id}`}>
                  PHUKET • {year} • APPROVED •
                </textPath>
              </text>
            </svg>
          </div>
        )}

        {/* Header */}
        <div className="stamp-card__header">
          <span className="stamp-card__country">THAILAND</span>
          <span className="stamp-card__year">{year}</span>
        </div>

        {/* Main artwork */}
        <div className="stamp-card__artwork">
          <div 
            className="stamp-card__image"
            style={{ backgroundColor: accentColor }}
          >
            <span>{title.charAt(0)}</span>
          </div>
        </div>

        {/* Denomination */}
        <div className="stamp-card__denomination">
          {parseInt(year) - 2018}฿
        </div>

        {/* Content */}
        <div className="stamp-card__content">
          <h3 className="stamp-card__title">{title}</h3>
          <p className="stamp-card__subtitle">{subtitle}</p>
          <div className="stamp-card__meta">
            {tags[0]}
          </div>
        </div>

        {/* Corner accent */}
        <div className="stamp-card__corner" style={{ borderColor: accentColor }} />
      </div>

      {/* Shadow */}
      <div className="stamp-card__shadow" />
    </motion.div>
  )
}

export default function StampCollection({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isOrganized, setIsOrganized] = useState(false)
  const [key, setKey] = useState(0) // Force re-render for shuffle

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(p => p.type === activeFilter)
  }, [activeFilter])

  // Generate positions
  const positions = useMemo(() => {
    return isOrganized 
      ? generateGridPositions(filteredProjects.length)
      : generateScatterPositions(filteredProjects.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects.length, isOrganized, key])

  // Shuffle function
  const handleShuffle = () => {
    setKey(prev => prev + 1)
    setIsOrganized(false)
  }

  return (
    <div className="stamp-collection">
      {/* Grid paper background */}
      <div className="stamp-collection__grid" />

      {/* Controls */}
      <div className="stamp-collection__controls">
        <button 
          className={`control-btn ${isOrganized ? '' : 'control-btn--active'}`}
          onClick={handleShuffle}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="handwritten">shuffle</span>
        </button>
        
        <button 
          className={`control-btn ${isOrganized ? 'control-btn--active' : ''}`}
          onClick={() => setIsOrganized(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className="handwritten">organize</span>
        </button>
      </div>

      {/* Filter tabs - vertical */}
      <div className="stamp-collection__filters">
        {FILTERS.map(filter => (
          <button
            key={filter.id}
            className={`filter-tab ${activeFilter === filter.id ? 'filter-tab--active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Stamps container */}
      <div className="stamp-collection__canvas">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <StampCard
              key={`${project.id}-${key}`}
              project={project}
              position={positions[index]}
              onClick={onSelectProject}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Handwritten hint */}
      <div className="stamp-collection__hint">
        <svg className="stamp-collection__hint-arrow" viewBox="0 0 60 40">
          <path 
            d="M5 35 Q 20 5, 50 20" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <polygon points="48,16 55,22 48,24" fill="currentColor"/>
        </svg>
        <span className="handwritten">select a stamp</span>
        <span className="handwritten stamp-collection__hint-small">to see the details</span>
      </div>

      {/* Footer info */}
      <div className="stamp-collection__footer">
        <span>JITTIKA S. © 2024</span>
        <span className="stamp-collection__divider">•</span>
        <span>PHUKET, THAILAND</span>
      </div>
    </div>
  )
}
