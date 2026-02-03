import { motion } from 'framer-motion'
import './FloatingStamp.css'

const TypeIcon = ({ type }) => {
  const icons = {
    app: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
    website: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    design: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    )
  }
  return <span className="floating-stamp__type-icon">{icons[type] || icons.design}</span>
}

// Gentle floating patterns
const getFloatVariants = (index) => {
  const patterns = [
    { y: [0, -8, 0], rotate: [0, 1, 0] },
    { y: [0, -6, 0], rotate: [0, -1.5, 0] },
    { y: [0, -10, 0], rotate: [0, 0.5, 0] },
    { y: [0, -7, 0], rotate: [0, -1, 0] },
  ]
  
  const pattern = patterns[index % patterns.length]
  const duration = 5 + (index % 2) * 1.5
  
  return {
    float: {
      y: pattern.y,
      rotate: pattern.rotate,
      transition: {
        duration,
        delay: index * 0.15,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
}

export default function FloatingStamp({ project, onClick, index = 0 }) {
  const { title, subtitle, type, year, color, accentColor, rotation } = project
  
  const baseRotation = rotation + (index % 2 === 0 ? -1 : 1)
  const floatVariants = getFloatVariants(index)

  return (
    <motion.article
      className={`floating-stamp floating-stamp--${type}`}
      style={{ 
        '--stamp-color': color,
        '--stamp-accent': accentColor
      }}
      variants={floatVariants}
      animate="float"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ 
        y: -12,
        scale: 1.03,
        rotate: baseRotation + 2,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onClick?.(project)}
    >
      {/* Soft glow on hover */}
      <div className="floating-stamp__glow" style={{ background: accentColor }} />
      
      {/* Stamp body */}
      <div className="floating-stamp__body" style={{ transform: `rotate(${baseRotation}deg)` }}>
        {/* Perforations */}
        <div className="floating-stamp__perforation floating-stamp__perforation--top" />
        <div className="floating-stamp__perforation floating-stamp__perforation--bottom" />
        <div className="floating-stamp__perforation floating-stamp__perforation--left" />
        <div className="floating-stamp__perforation floating-stamp__perforation--right" />
        
        {/* Inner */}
        <div className="floating-stamp__inner" style={{ backgroundColor: color }}>
          {/* Header */}
          <div className="floating-stamp__header">
            <span className="floating-stamp__year">{year}</span>
            <TypeIcon type={type} />
          </div>
          
          {/* Artwork */}
          <div className="floating-stamp__visual">
            <div className="floating-stamp__artwork" style={{ backgroundColor: accentColor }}>
              <span>{title.charAt(0)}</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="floating-stamp__content">
            <h3 className="floating-stamp__title">{title}</h3>
            <p className="floating-stamp__subtitle">{subtitle}</p>
          </div>
          
          {/* Corner */}
          <div className="floating-stamp__corner" style={{ borderColor: accentColor }} />
        </div>
      </div>
      
      {/* Shadow */}
      <div className="floating-stamp__shadow" />
    </motion.article>
  )
}
