import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import HeroClouds from './HeroClouds'
import './HeroScene.css'

export default function HeroScene() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Zoom completes at 250vh — spring makes it feel organic, not mechanical
  const rawScale     = useTransform(scrollY, [0, vh * 2.5], [2, 1])
  const scale        = useSpring(rawScale, { stiffness: 60, damping: 20 })

  // Freeze: 250–270vh, then fade out 270–340vh
  const sceneOpacity = useTransform(scrollY, [vh * 2.7, vh * 3.4], [1, 0])

  return (
    <motion.div className="hero-scene" style={{ opacity: sceneOpacity }}>
      <motion.div className="scene-painting" style={{ scale }}>
        <img src="/beach.jpg" alt="" draggable="false" />
      </motion.div>
      <HeroClouds />
    </motion.div>
  )
}
