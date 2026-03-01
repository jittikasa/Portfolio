import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { CloudsLower, CloudsUpper } from './HeroClouds'
import './HeroScene.css'

export default function HeroScene() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Zoom completes at 230vh — heavier spring for organic, less mechanical feel
  const rawScale     = useTransform(scrollY, [0, vh * 2.3], [1.7, 1])
  const scale        = useSpring(rawScale, { stiffness: 40, damping: 25, mass: 1.2 })

  // Extended freeze: Zoom ends at 230vh, stay frozen at scale 1 until 320vh, then fade out 320–380vh
  const sceneOpacity = useTransform(scrollY, [vh * 3.2, vh * 3.8], [1, 0])

  // Bird starts among Row 3 clouds (~22vh, ~55vw), glides left toward logo, then glides UP
  // Adjust bird flight to match the 400vh scroll duration
  const rawBirdX = useTransform(scrollY, [0, vh * 1.5, vh * 3.0], ['55vw', '12vw', '12vw'])
  const birdX = useSpring(rawBirdX, { stiffness: 18, damping: 28, mass: 1.2 })

  // Add a subtle sine wave "hover" to make it feel like it's catchin air currents
  const birdHover = useTransform(scrollY, [0, vh * 3.2], [0, Math.PI * 10])
  const birdYOffset = useTransform(birdHover, (v) => Math.sin(v) * 15) // ±15px drift

  const rawBirdY = useTransform(scrollY, [0, vh * 1.0, vh * 1.5, vh * 3.2], ['22vh', '16vh', '12vh', '-40vh'])
  const birdY = useSpring(rawBirdY, { stiffness: 12, damping: 32, mass: 1.5 })

  // Keep bird visible until it's well off-screen
  const birdOpacity = useTransform(scrollY, [0, vh * 3.0, vh * 3.6], [1, 1, 0])

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
