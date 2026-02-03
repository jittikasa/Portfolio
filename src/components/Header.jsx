import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Use setTimeout to avoid setState during render phase
    const timeoutId = setTimeout(() => {
      setMenuOpen(false)
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (e, targetId) => {
    if (isHome) {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setMenuOpen(false)
    }
  }

  const navLinks = [
    { path: '/', label: 'Home', scrollTo: null },
    { path: '/#collection', label: 'Work', scrollTo: 'collection' },
    { path: '/#about', label: 'About', scrollTo: 'about' },
    { path: '/#contact', label: 'Contact', scrollTo: 'contact' },
  ]

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">J</span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => {
              const isActive = link.scrollTo 
                ? false
                : location.pathname === link.path

              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
                    onClick={(e) => link.scrollTo && handleNavClick(e, link.scrollTo)}
                  >
                    {link.label}
                    <span className="header__nav-underline" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          className={`header__menu-btn ${menuOpen ? 'header__menu-btn--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="header__menu-line" />
          <span className="header__menu-line" />
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="header__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="header__mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="header__mobile-header">
              <span className="header__logo-text">J</span>
              <button
                className="header__close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>

            <nav className="header__mobile-nav">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="header__mobile-link"
                    onClick={(e) => link.scrollTo && handleNavClick(e, link.scrollTo)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="header__mobile-footer">
              <a href="mailto:hello@jittika.com" className="header__mobile-email">
                hello@jittika.com
              </a>
              <p className="header__mobile-tagline">
                Designer & Maker from Phuket
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
