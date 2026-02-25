import { motion, useScroll, useTransform } from 'framer-motion'
import './HeroScene.css'

export default function HeroScene() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Zoom completes at 300vh — then painting holds at full size
  const scale        = useTransform(scrollY, [0, vh * 3.0], [2, 1])

  // Freeze viewport: 300vh–420vh painting sits at 1× (clamp handles this)
  // Fade out: 420–500vh
  const sceneOpacity = useTransform(scrollY, [vh * 3.7, vh * 4.5], [1, 0])

  return (
    <motion.div className="hero-scene" style={{ opacity: sceneOpacity }}>
      <motion.div className="scene-painting" style={{ scale }}>
        <img src="/beach.jpg" alt="" draggable="false" />
      </motion.div>
    </motion.div>
  )
}
