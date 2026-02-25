import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import './CustomCursor.css'

// Monet Design Rationale:
// The cursor acts as a paintbrush tip—lagging slightly behind (spring physics),
// expanding over interactables to "soak" them in attention.

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring physics for the "paintbrush lag" feel
  const springConfig = { damping: 20, stiffness: 100 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16) // Center offset
      cursorY.set(e.clientY - 16)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .project-tile, input, textarea, .cursor-hover')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      aria-hidden="true"
    />
  )
}
