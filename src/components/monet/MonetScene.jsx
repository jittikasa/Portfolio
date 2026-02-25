import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './MonetScene.css'

// Generate more random particles for "flowers"
const generateParticles = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4, // Larger for flowers
    color: ['#E8D5C0', '#D8C8D8', '#FFB7B2', '#E2F0CB'][Math.floor(Math.random() * 4)], // Pastel colors
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }))
}

// More blobs for a richer "painted" background
const blobs = [
  // Deep water / leaves
  { color: '#2A403D', x: 50, y: 50, size: 90, delay: 0 },
  { color: '#3E5234', x: 10, y: 10, size: 60, delay: 2 },
  { color: '#6B8C85', x: 90, y: 80, size: 70, delay: 4 },
  
  // Pastel flowers / reflections
  { color: '#FFDAC1', x: 20, y: 30, size: 30, delay: 1 }, // Peach
  { color: '#E2F0CB', x: 70, y: 20, size: 35, delay: 3 }, // Mint
  { color: '#B5EAD7', x: 40, y: 60, size: 40, delay: 0 }, // Green
  { color: '#C7CEEA', x: 80, y: 50, size: 35, delay: 2 }, // Periwinkle
  { color: '#F7D1D1', x: 30, y: 80, size: 25, delay: 1 }, // Pink
  { color: '#E8D5C0', x: 60, y: 10, size: 30, delay: 4 }, // Cream
]

export default function MonetScene() {
  const [particles, setParticles] = useState([])
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 100])
  const y2 = useTransform(scrollY, [0, 1000], [0, -80])
  
  // Mouse interaction
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    setParticles(generateParticles(60)) // More particles for "lots of flowers"

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="monet-scene">
      {/* 1. Base Gradient (CSS) */}

      {/* 2. Painted Blobs (Background Composition) */}
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
              y: i % 2 === 0 ? y1 : y2, // Parallax effect
            }}
            animate={{
              x: [0, 20, -20, 0],
              scale: [1, 1.05, 0.95, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay
            }}
          />
        ))}
      </div>

      {/* 3. Interactive Light Blob */}
      <motion.div 
        className="monet-blob"
        style={{
          x: mouseX,
          y: mouseY,
          width: '600px',
          height: '600px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(80px)',
          mixBlendMode: 'soft-light',
          position: 'fixed',
          top: -300,
          left: -300,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* 4. "Flowers" (Small floating dabs of paint) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="monet-flower"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* 5. Canvas Texture Overlay */}
      <div className="monet-water-texture" />
      
      {/* 6. SVG Filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="paint-daub">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
