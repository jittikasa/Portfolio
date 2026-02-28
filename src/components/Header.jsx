import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SignatureName from './SignatureName'
import { Cloud } from './HeroClouds'
import './Header.css'

function HeaderPaintFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="header-paint" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
    </svg>
  )
}

export default function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        const offset = 80
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = element.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  const navItems = [
    { label: 'Work', id: 'work' },
    { label: 'Play', id: 'play' },
    { label: 'Contact', id: 'contact' }
  ]

  const ElasticLink = ({ label, id }) => {
    const letters = label.split('')
    const isRoutePage = id === 'contact' || id === 'play'
    if (isRoutePage) {
      return (
        <Link to={`/${id}`} className="nav-link-elastic" style={{ '--total': letters.length }}>
          {letters.map((char, i) => (
            <span key={i} style={{ '--index': i + 1 }}>{char}</span>
          ))}
        </Link>
      )
    }
    return (
      <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)} className="nav-link-elastic" style={{ '--total': letters.length }}>
        {letters.map((char, i) => (
          <span key={i} style={{ '--index': i + 1 }}>{char}</span>
        ))}
      </a>
    )
  }

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <HeaderPaintFilter />
      <div className="header-container">
        <div className="logo-wrapper">
          <AnimatePresence>
            {scrolled && (
              <motion.div 
                className="header-paint-bg logo-paint"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.7, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Cloud variant="c" filter="header-paint" />
              </motion.div>
            )}
          </AnimatePresence>
          <Link to="/" className="logo">
            <SignatureName variant="logo" />
          </Link>
        </div>

        <nav className="nav">
          <ElasticLink label="Work" id="work" />
          <span className="nav-dot">•</span>
          <ElasticLink label="Play" id="play" />
          <span className="nav-dot">•</span>
          <ElasticLink label="Contact" id="contact" />
        </nav>
      </div>
    </header>
  )
}
