import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { CloudsLower, CloudsUpper } from './HeroClouds'
import './HeroScene.css'

export default function HeroScene() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Zoom completes at 230vh — heavier spring for organic, less mechanical feel
  const rawScale     = useTransform(scrollY, [0, vh * 2.3], [1.7, 1])
  const scale        = useSpring(rawScale, { stiffness: 40, damping: 25, mass: 1.2 })

  // Freeze: 230vh, then fade out 220–260vh (50vh empty gap before atelier)
  const sceneOpacity = useTransform(scrollY, [vh * 2.2, vh * 2.6], [1, 0])

  // Bird starts among Row 3 clouds (~22vh, ~55vw), glides left toward logo, then glides UP
  // Smoother springs (lower stiffness, higher damping) for "lazy" organic flight
  const rawBirdX = useTransform(scrollY, [0, vh * 1.2, vh * 2.0], ['55vw', '12vw', '12vw'])
  const birdX = useSpring(rawBirdX, { stiffness: 18, damping: 28, mass: 1.2 })

  // Add a subtle sine wave "hover" to make it feel like it's catchin air currents
  const birdHover = useTransform(scrollY, [0, vh * 2], [0, Math.PI * 8])
  const birdYOffset = useTransform(birdHover, (v) => Math.sin(v) * 15) // ±15px drift

  const rawBirdY = useTransform(scrollY, [0, vh * 0.8, vh * 1.2, vh * 2.0], ['22vh', '16vh', '12vh', '-30vh'])
  const birdY = useSpring(rawBirdY, { stiffness: 12, damping: 32, mass: 1.5 })

  // Keep bird visible until it's well off-screen
  const birdOpacity = useTransform(scrollY, [0, vh * 1.8, vh * 2.1], [1, 1, 0])

  return (
    <motion.div className="hero-scene" style={{ opacity: sceneOpacity }}>
      <motion.div className="scene-painting" style={{ scale }}>
        <img src="/beach.jpg" alt="" draggable="false" />
      </motion.div>
      <CloudsLower />
      <motion.img
        src="/Js-bird.png"
        alt=""
        aria-hidden="true"
        draggable="false"
        className="hero-bird"
        style={{ 
          x: birdX, 
          y: useTransform([birdY, birdYOffset], ([y, offset]) => `calc(${y} + ${offset}px)`), 
          opacity: birdOpacity 
        }}
      />
      <CloudsUpper />
    </motion.div>
  )
}
