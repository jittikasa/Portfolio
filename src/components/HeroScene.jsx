import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { CloudsLower, CloudsUpper } from './HeroClouds'
import './HeroScene.css'

export default function HeroScene() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Zoom completes at 1.5vh (was 2.3vh)
  const rawScale     = useTransform(scrollY, [0, vh * 1.5], [1.7, 1])
  const scale        = useSpring(rawScale, { stiffness: 40, damping: 25, mass: 1.2 })

  // Scene fades out 2.0–2.5vh (was 3.2–3.8vh)
  const sceneOpacity = useTransform(scrollY, [vh * 2.0, vh * 2.5], [1, 0])

  // Bird — compressed flight arc
  const rawBirdX = useTransform(scrollY,
    [0, vh * 0.3, vh * 0.6, vh * 1.0, vh * 1.5, vh * 2.0],
    ['59vw', '50vw', '30vw', '15vw', '8vw', '12vw']
  )
  const birdX = useSpring(rawBirdX, { stiffness: 18, damping: 28, mass: 1.2 })

  // Sine-wave hover on air currents
  const birdHover = useTransform(scrollY, [0, vh * 2.0], [0, Math.PI * 12])
  const birdYOffset = useTransform(birdHover, (v) => Math.sin(v) * 18)

  // Organic arc: dip slightly first, then sweep up steeply
  const rawBirdY = useTransform(scrollY,
    [0, vh * 0.2, vh * 0.5, vh * 0.8, vh * 1.2, vh * 1.6, vh * 2.0],
    ['31vh', '33vh', '24vh', '14vh', '2vh', '-20vh', '-55vh']
  )
  const birdY = useSpring(rawBirdY, { stiffness: 12, damping: 32, mass: 1.5 })

  // Bird fades out with scene
  const birdOpacity = useTransform(scrollY, [0, vh * 1.8, vh * 2.3], [1, 1, 0])

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
