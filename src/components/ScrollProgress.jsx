import { motion, useScroll, useSpring } from 'framer-motion'
import './ScrollProgress.css'

// Monet Design Rationale:
// A subtle indicator of journey, painting a line across the top of the viewport
// with the full garden palette.

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
    />
  )
}
