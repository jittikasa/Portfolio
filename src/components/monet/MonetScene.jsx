import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './MonetScene.css'

// Monet Palette: Woman with a Parasol
const PALETTE = {
  sky: ['#909fd4', '#aab8e8', '#cdd6f5', '#eef2fb'],
  grass: ['#8BC34A', '#226d3e', '#558b2f', '#aed581', '#33691e'],
  flowers: ['#FFC72C', '#FF8C00', '#FDD835', '#FFF176', '#E6EE9C'],
  shadows: ['#B081C6', '#7E57C2', '#5E35B1'],
  clouds: ['#f0e4e4', '#ffffff', '#e0e0e0'],
  dress: ['#f0e4e4', '#e8eaf6', '#c5cae9'],
}

export default function MonetScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let w, h

    // Helper: Random range
    const random = (min, max) => Math.random() * (max - min) + min
    const randomColor = (colors) => colors[Math.floor(Math.random() * colors.length)]

    // Helper: Draw a brush stroke
    const drawStroke = (x, y, length, angle, color, width) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.lineCap = 'round'
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
      ctx.stroke()
    }

    // Helper: Draw a dab (for flowers/clouds)
    const drawDab = (x, y, radius, color) => {
      ctx.beginPath()
      ctx.fillStyle = color
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const init = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      
      // Initial Paint
      paintScene()
    }

    const paintScene = () => {
      // 1. Sky Background
      const gradient = ctx.createLinearGradient(0, 0, 0, h)
      gradient.addColorStop(0, '#909fd4')
      gradient.addColorStop(0.6, '#cdd6f5')
      gradient.addColorStop(1, '#eef2fb')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // 2. Clouds (Upper Half) - Whispy strokes
      for (let i = 0; i < 400; i++) {
        const x = random(0, w)
        const y = random(0, h * 0.5)
        const length = random(20, 60)
        const angle = random(-0.2, 0.2)
        const width = random(10, 30)
        const color = randomColor(PALETTE.clouds)
        ctx.globalAlpha = random(0.3, 0.6)
        drawStroke(x, y, length, angle, color, width)
      }

      // 3. Grassy Hill (Lower Half) - Diagonal strokes
      // Hill shape: curved from bottom left to mid right
      const hillFunction = (x) => h - (Math.sin(x * 0.002) * 100 + x * 0.1 + h * 0.2)

      for (let i = 0; i < 2000; i++) {
        const x = random(0, w)
        const baseY = hillFunction(x)
        const y = random(baseY - 50, h) // Start from hill top downwards
        
        const length = random(15, 40)
        const angle = random(-Math.PI / 2 - 0.5, -Math.PI / 2 + 0.5) // Upwardsish
        const width = random(2, 6)
        
        // Shadow color near bottom/left, bright near top
        let color = randomColor(PALETTE.grass)
        if (y > h - 100) color = randomColor(PALETTE.shadows) // Deep shadows
        
        ctx.globalAlpha = random(0.6, 0.9)
        drawStroke(x, y, length, angle, color, width)
      }

      // 4. Flowers (Scattered in grass) - Dabs
      for (let i = 0; i < 300; i++) {
        const x = random(0, w)
        const baseY = hillFunction(x)
        const y = random(baseY, h)
        
        const radius = random(2, 6)
        const color = randomColor(PALETTE.flowers)
        
        ctx.globalAlpha = random(0.7, 1)
        drawDab(x, y, radius, color)
      }

      // 5. "Woman with a Parasol" (Abstract Silhouette)
      // Position her on the hill, slightly left
      const figureX = w * 0.3
      const figureY = hillFunction(figureX) - 20
      
      drawFigure(figureX, figureY)
    }

    const drawFigure = (x, y) => {
      // Dress (White/Blue strokes)
      for (let i = 0; i < 150; i++) {
        const dx = random(-30, 40)
        const dy = random(-100, 0)
        const length = random(10, 30)
        const angle = Math.PI / 2 + random(-0.3, 0.3) // Vertical downwards
        const color = randomColor(PALETTE.dress)
        
        // Wind blowing dress to the right
        const windX = dx + (dy * -0.2) 
        
        ctx.globalAlpha = random(0.5, 0.9)
        drawStroke(x + windX, y + dy, length, angle, color, random(4, 10))
      }

      // Parasol (Green/Shadows)
      const parasolY = y - 110
      for (let i = 0; i < 100; i++) {
        const px = random(-50, 50)
        const py = random(-20, 10)
        const color = randomColor(PALETTE.grass) // Green underside
        
        // Oval shape check
        if ((px*px)/2500 + (py*py)/400 <= 1) {
             drawDab(x + px, parasolY + py, random(4, 8), color)
        }
      }
      // Parasol Top (Lighter)
       for (let i = 0; i < 100; i++) {
        const px = random(-50, 50)
        const py = random(-30, 0)
        const color = '#aed581' 
         if ((px*px)/2500 + (py*py)/900 <= 1) {
             drawDab(x + px, parasolY + py - 5, random(4, 8), color)
        }
      }
    }

    // Animation Loop (Wind effect)
    let t = 0
    const animate = () => {
      t += 0.05
      // Ideally we redraw only moving parts, but for "Impressionism", 
      // static is okay. Let's add moving clouds/grass layers if performance allows.
      // For now, static painting is better than "just gradient".
      // We can add a "wind" overlay.
      
      // Wind particles (white lines)
      if (Math.random() > 0.8) {
         const x = random(0, w)
         const y = random(0, h)
         ctx.globalAlpha = 0.3
         drawStroke(x, y, 50, 0.2, '#fff', 1)
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    // Resize handler
    window.addEventListener('resize', init)
    
    init()
    animate()

    return () => {
      window.removeEventListener('resize', init)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="monet-scene">
      <canvas ref={canvasRef} className="monet-canvas" />
      <div className="monet-texture-overlay" />
    </div>
  )
}
