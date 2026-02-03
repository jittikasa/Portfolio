import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Stamp.css'

// Pre-defined motion components outside of render
const MotionLink = motion(Link)
const MotionA = motion.a
const MotionDiv = motion.div

export default function Stamp({
  children,
  rotation = 0,
  variant = 'default',
  size = 'medium',
  href,
  to,
  className = '',
  onClick,
  hoverLift = true,
  ...props
}) {
  const stampClass = `stamp stamp--${variant} stamp--${size} ${className}`
  const stampStyle = { '--stamp-rotation': `${rotation}deg` }
  const hoverProps = hoverLift ? { 
    whileHover: { y: -6, rotate: rotation + 2 },
    whileTap: { scale: 0.98 }
  } : {}
  const transitionProps = { transition: { type: 'spring', stiffness: 300, damping: 20 } }

  const content = (
    <>
      <div className="stamp__inner">
        {children}
      </div>
      {/* Perforated edges */}
      <div className="stamp__perforation stamp__perforation--top" />
      <div className="stamp__perforation stamp__perforation--bottom" />
      <div className="stamp__perforation stamp__perforation--left" />
      <div className="stamp__perforation stamp__perforation--right" />
    </>
  )

  if (to) {
    return (
      <MotionLink
        to={to}
        className={stampClass}
        style={stampStyle}
        onClick={onClick}
        {...hoverProps}
        {...transitionProps}
        {...props}
      >
        {content}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <MotionA
        href={href}
        className={stampClass}
        style={stampStyle}
        onClick={onClick}
        {...hoverProps}
        {...transitionProps}
        {...props}
      >
        {content}
      </MotionA>
    )
  }

  return (
    <MotionDiv
      className={stampClass}
      style={stampStyle}
      onClick={onClick}
      {...hoverProps}
      {...transitionProps}
      {...props}
    >
      {content}
    </MotionDiv>
  )
}

// Stamp content helpers
Stamp.Icon = function StampIcon({ children, className = '' }) {
  return <div className={`stamp__icon ${className}`}>{children}</div>
}

Stamp.Title = function StampTitle({ children, className = '' }) {
  return <h3 className={`stamp__title ${className}`}>{children}</h3>
}

Stamp.Subtitle = function StampSubtitle({ children, className = '' }) {
  return <p className={`stamp__subtitle ${className}`}>{children}</p>
}

Stamp.Meta = function StampMeta({ children, className = '' }) {
  return <span className={`stamp__meta ${className}`}>{children}</span>
}
