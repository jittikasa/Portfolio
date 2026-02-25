import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './MonetScene.css'

// Random generator for particles
const generateParticles = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))
}

// Blobs for the background "painting"
const blobs = [
  { color: '#A8B89A', x: 20, y: 30, size: 40, delay: 0 }, // Sage
  { color: '#8BAABF', x: 80, y: 20, size: 50, delay: 2 }, // Water blue
  { color: '#D8C8D8', x: 50, y: 80, size: 45, delay: 4 }, // Lilac
  { color: '#E8D5C0', x: 10, y: 70, size: 35, delay: 1 }, // Cream
  { color: '#5B7A96', x: 90, y: 90, size: 40, delay: 3 }, // Deep blue
]

export default function MonetScene() {
  const [particles, setParticles] = useState([])
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -150])
  
  // Mouse interaction for ripples (simplified as a light follow)
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    setParticles(generateParticles(30))

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="monet-scene">
      {/* 1. Deep Water Gradient Base (CSS) */}
      
      {/* 2. Moving Blobs (The "Paint") */}
      <div className="monet-scene__blur-layer">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className="monet-blob"
            style={{
              backgroundColor: blob.color,
              width: `${blob.size}vw`,
              height: `${blob.size}vw`,
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              y: i % 2 === 0 ? y1 : y2, // Parallax
            }}
            animate={{
              x: [0, 30, -20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay
            }}
          />
        ))}
        
        {/* Mouse Follower Blob (Light) */}
        <motion.div 
          className="monet-blob"
          style={{
            x: mouseX,
            y: mouseY,
            width: '400px',
            height: '400px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            filter: 'blur(60px)',
            mixBlendMode: 'soft-light',
            position: 'fixed',
            top: -200,
            left: -200,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 3. Texture Overlay (Grain/Canvas) */}
      <div className="monet-water-texture" />

      {/* 4. Floating Particles (Pollen/Light) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="monet-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, -50, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* 5. SVG Filters (Hidden, referenced by ID) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="water-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
          </filter>
           <filter id="paint-daub">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
