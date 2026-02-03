import { motion } from 'framer-motion'
import './ProjectStamp.css'

// Type icons with more detail
const TypeIcon = ({ type }) => {
  const icons = {
    app: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
        <path d="M8 6h8" strokeWidth="1" opacity="0.5"/>
        <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    website: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none"/>
        <circle cx="10" cy="6" r="1" fill="currentColor" stroke="none"/>
        <circle cx="14" cy="6" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
    design: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" opacity="0.6"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    )
  }
  
  return <span className="project-stamp__type-icon">{icons[type] || icons.design}</span>
}

// Generate denomination value based on project
const getDenomination = (type, year) => {
  const base = parseInt(year) - 2019
  if (type === 'app') return `${base}฿`
  if (type === 'website') return `${base * 2}฿`
  return `${base * 3}฿`
}

export default function ProjectStamp({ 
  project, 
  onClick,
  index = 0,
  className = '' 
}) {
  const { title, subtitle, type, year, color, accentColor, rotation, tags } = project
  
  // Varied rotation for organic feel (deterministic based on index)
  const pseudoRandom = ((index * 9301 + 49297) % 233280) / 233280
  const variedRotation = rotation + (index % 2 === 0 ? -0.8 : 0.8) + (pseudoRandom * 0.4 - 0.2)
  const denomination = getDenomination(type, year)
  
  return (
    <motion.article
      className={`project-stamp project-stamp--${type} ${className}`}
      style={{ 
        '--stamp-rotation': `${variedRotation}deg`,
        '--stamp-color': color,
        '--stamp-accent': accentColor
      }}
      initial={{ opacity: 0, y: 60, rotate: variedRotation - 8 }}
      whileInView={{ opacity: 1, y: 0, rotate: variedRotation }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ 
        y: -20, 
        rotate: variedRotation + 5,
        scale: 1.05,
        zIndex: 100,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onClick={() => onClick?.(project)}
    >
      {/* Paper texture overlay */}
      <div className="project-stamp__texture" aria-hidden="true" />
      
      {/* Perforated border - SVG for precision */}
      <svg className="project-stamp__perforations" viewBox="0 0 100 130" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <mask id={`perforation-mask-${index}`}>
            <rect width="100" height="130" fill="white"/>
            {/* Top edge holes */}
            {[...Array(11)].map((_, i) => (
              <circle key={`t${i}`} cx={5 + i * 9} cy="2" r="2.5" fill="black"/>
            ))}
            {/* Bottom edge holes */}
            {[...Array(11)].map((_, i) => (
              <circle key={`b${i}`} cx={5 + i * 9} cy="128" r="2.5" fill="black"/>
            ))}
            {/* Left edge holes */}
            {[...Array(14)].map((_, i) => (
              <circle key={`l${i}`} cx="2" cy={6 + i * 9} r="2.5" fill="black"/>
            ))}
            {/* Right edge holes */}
            {[...Array(14)].map((_, i) => (
              <circle key={`r${i}`} cx="98" cy={6 + i * 9} r="2.5" fill="black"/>
            ))}
          </mask>
        </defs>
        <rect width="100" height="130" fill={color} mask={`url(#perforation-mask-${index})`} className="project-stamp__perforated-bg"/>
      </svg>
      
      {/* Inner content area */}
      <div className="project-stamp__inner">
        {/* Top bar: Country + Year */}
        <div className="project-stamp__top-bar">
          <span className="project-stamp__country">
            <span className="project-stamp__country-flag">🇹🇭</span>
            <span className="project-stamp__country-text">THAILAND</span>
          </span>
          <span className="project-stamp__year">{year}</span>
        </div>
        
        {/* Main visual area */}
        <div className="project-stamp__visual">
          {/* Cancellation postmark */}
          <div className="project-stamp__postmark" aria-hidden="true">
            <div className="project-stamp__postmark-circle">
              <svg viewBox="0 0 100 100">
                <defs>
                  <path id={`circlePath-${index}`} d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                </defs>
                <text fill="rgba(44,44,44,0.15)" fontSize="7" fontFamily="monospace" letterSpacing="2">
                  <textPath href={`#circlePath-${index}`}>
                    PHUKET • DESIGN STUDIO • {year} •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="project-stamp__postmark-lines">
              <span /><span /><span />
            </div>
          </div>
          
          {/* Main image/icon area */}
          <div className="project-stamp__artwork">
            <div 
              className="project-stamp__placeholder"
              style={{ 
                background: `linear-gradient(135deg, ${accentColor} 0%, ${adjustColor(accentColor, -20)} 100%)`,
                boxShadow: `0 8px 32px ${accentColor}40, inset 0 2px 4px rgba(255,255,255,0.3)`
              }}
            >
              <span className="project-stamp__initial">{title.charAt(0)}</span>
              <div className="project-stamp__gloss" aria-hidden="true" />
            </div>
          </div>
          
          {/* Denomination mark */}
          <div className="project-stamp__denomination">
            <span className="project-stamp__denomination-value">{denomination}</span>
          </div>
        </div>
        
        {/* Content area */}
        <div className="project-stamp__content">
          <div className="project-stamp__header-row">
            <h3 className="project-stamp__title">{title}</h3>
            <TypeIcon type={type} />
          </div>
          <p className="project-stamp__subtitle">{subtitle}</p>
          
          {/* Tags as micro-text */}
          <div className="project-stamp__tags">
            {tags.slice(0, 2).map((tag, i) => (
              <span key={tag} className="project-stamp__tag">
                {i > 0 && <span className="project-stamp__tag-separator">•</span>}
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="project-stamp__watermark" aria-hidden="true">
          <svg viewBox="0 0 40 40" opacity="0.03">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M10 20h20M20 10v20" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
        
        {/* Corner accent */}
        <div className="project-stamp__corner" style={{ borderColor: accentColor }} />
      </div>
      
      {/* Hover reveal */}
      <motion.div 
        className="project-stamp__hover-reveal"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="project-stamp__cta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          View Project
        </span>
      </motion.div>
      
      {/* Shadow layer */}
      <div className="project-stamp__shadow" aria-hidden="true" />
    </motion.article>
  )
}

// Helper to darken color for gradients
function adjustColor(color, amount) {
  const usePound = color[0] === '#'
  const col = usePound ? color.slice(1) : color
  const num = parseInt(col, 16)
  let r = (num >> 16) + amount
  let g = ((num >> 8) & 0x00FF) + amount
  let b = (num & 0x0000FF) + amount
  r = r > 255 ? 255 : r < 0 ? 0 : r
  g = g > 255 ? 255 : g < 0 ? 0 : g
  b = b > 255 ? 255 : b < 0 ? 0 : b
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')
}
