import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Shared easing
const easeOut = [0.22, 1, 0.36, 1]

// Page transition wrapper
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Fade in when element enters viewport
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
  duration = 0.7
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {}
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animations
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delayStart = 0
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayStart
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Child item for stagger
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: easeOut }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Clip-path reveal animation (like off.site)
export function ClipReveal({
  children,
  direction = 'up',
  className = '',
  delay = 0,
  duration = 0.8
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const clipPaths = {
    up: {
      hidden: 'inset(100% 0% 0% 0%)',
      visible: 'inset(0% 0% 0% 0%)'
    },
    down: {
      hidden: 'inset(0% 0% 100% 0%)',
      visible: 'inset(0% 0% 0% 0%)'
    },
    left: {
      hidden: 'inset(0% 100% 0% 0%)',
      visible: 'inset(0% 0% 0% 0%)'
    },
    right: {
      hidden: 'inset(0% 0% 0% 100%)',
      visible: 'inset(0% 0% 0% 0%)'
    },
    center: {
      hidden: 'inset(50% 50% 50% 50%)',
      visible: 'inset(0% 0% 0% 0%)'
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={
        isInView
          ? { clipPath: clipPaths[direction].visible }
          : { clipPath: clipPaths[direction].hidden }
      }
      transition={{ duration, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

// Scale on hover
export function ScaleOnHover({ children, scale = 1.02, className = '' }) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  )
}

// Smooth reveal for sections
export function SectionReveal({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}


