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

  // Bird starts among Row 3 clouds (~22vh, ~55vw), glides left and slightly up
  const rawBirdX = useTransform(scrollY, [0, vh * 1.8], ['55vw', '-25vw'])
  const birdX = useSpring(rawBirdX, { stiffness: 30, damping: 20 })
  const birdY = useTransform(scrollY, [0, vh * 0.8, vh * 1.8], ['22vh', '16vh', '8vh'])
  const birdOpacity = useTransform(scrollY, [0, vh * 0.1, vh * 1.4, vh * 1.8], [0, 1, 1, 0])

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
        style={{ x: birdX, y: birdY, opacity: birdOpacity }}
      />
      <CloudsUpper />
    </motion.div>
  )
}
