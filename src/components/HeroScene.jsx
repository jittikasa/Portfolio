import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { CloudsLower, CloudsUpper } from './HeroClouds'
import './HeroScene.css'

export default function HeroScene() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Zoom completes earlier so the atelier section arrives sooner.
  const rawScale     = useTransform(scrollY, [0, vh * 1.1], [1.7, 1])
  const scale        = useSpring(rawScale, { stiffness: 40, damping: 25, mass: 1.2 })

  const sceneOpacity = useTransform(scrollY, [vh * 1.15, vh * 1.45], [1, 0])

  // Bird — compressed flight arc
  const rawBirdX = useTransform(scrollY,
    [0, vh * 0.25, vh * 0.5, vh * 0.8, vh * 1.1, vh * 1.4],
    ['59vw', '50vw', '30vw', '15vw', '8vw', '12vw']
  )
  const birdX = useSpring(rawBirdX, { stiffness: 18, damping: 28, mass: 1.2 })

  // Sine-wave hover on air currents
  const birdHover = useTransform(scrollY, [0, vh * 1.4], [0, Math.PI * 12])
  const birdYOffset = useTransform(birdHover, (v) => Math.sin(v) * 18)

  // Organic arc: dip slightly first, then sweep up steeply
  const rawBirdY = useTransform(scrollY,
    [0, vh * 0.18, vh * 0.38, vh * 0.6, vh * 0.9, vh * 1.15, vh * 1.4],
    ['31vh', '33vh', '24vh', '14vh', '2vh', '-20vh', '-55vh']
  )
  const birdY = useSpring(rawBirdY, { stiffness: 12, damping: 32, mass: 1.5 })

  // Bird fades out with scene
  const birdOpacity = useTransform(scrollY, [0, vh * 1.1, vh * 1.4], [1, 1, 0])

  return (
    <>
      <motion.div className="hero-scene" style={{ opacity: sceneOpacity }}>
        <motion.div className="scene-painting" style={{ scale }}>
          <img src="/beach.jpg" alt="" draggable="false" />
        </motion.div>
        <CloudsLower />
        <CloudsUpper />
      </motion.div>
      {/* Bird portaled to body so it escapes all stacking contexts */}
      {createPortal(
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
        />,
        document.body
      )}
    </>
  )
}
