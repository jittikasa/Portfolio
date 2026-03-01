import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

const ElasticLink = ({ label, id }) => {
  const letters = label.split('')
  return (
    <Link to={`/${id}`} className="nav-link-elastic" style={{ '--total': letters.length }}>
      {letters.map((char, i) => (
        <span key={i} style={{ '--index': i + 1 }}>{char}</span>
      ))}
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <ElasticLink label="Support" id="support" />
          <span className="nav-dot">•</span>
          <ElasticLink label="Contact" id="contact" />
        </nav>
      </div>
    </header>
  )
}
