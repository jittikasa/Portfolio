import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SignatureName from './SignatureName'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@jittika.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer-ragged-edge" aria-hidden="true" />

      <div className="pc-wrap">

        {/* Floating postcard with subtle tilt */}
        <motion.div 
          className="pc-card"
          whileHover={{ 
            rotateX: 2, 
            rotateY: -2,
            y: -5,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          style={{ transformStyle: "preserve-3d" }}
        >

          <div className="pc-topbar">
            <span className="pc-label">POST CARD</span>
            <span className="pc-airmail">✈ AIR MAIL</span>
          </div>

          <div className="pc-body">

            {/* Left — message + ruled lines */}
            <div className="pc-message">
              <p className="pc-text typewriter">
                Available for projects,<br />
                collaborations &<br />
                good conversations.
              </p>
              <div className="pc-sig">
                <SignatureName variant="footer" />
              </div>
            </div>

            <div className="pc-divider" aria-hidden="true" />

            {/* Right — address side */}
            <div className="pc-address">
              <div className="pc-stamp-area">
                <svg className="cancellation-lines" width="100" height="40" viewBox="0 0 100 40" fill="none" stroke="currentColor">
                  <path d="M0 5C20 5 30 15 50 15C70 15 80 5 100 5" strokeWidth="0.5" opacity="0.3"/>
                  <path d="M0 15C20 15 30 25 50 25C70 25 80 15 100 15" strokeWidth="0.5" opacity="0.3"/>
                  <path d="M0 25C20 25 30 35 50 35C70 35 80 25 100 25" strokeWidth="0.5" opacity="0.3"/>
                </svg>
                <div className="pc-stamp" aria-hidden="true">
                  <span>JS</span>
                </div>
              </div>
              
              <div className="pc-address-lines">
                <div className="pc-to-line">
                  <span className="pc-to">To: </span>
                  <div className="pc-link-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pc-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <button 
                      className={`pc-copy-btn ${copied ? 'copied' : ''}`}
                      onClick={copyEmail}
                      title="Click to copy email"
                    >
                      {copied ? 'Email Copied!' : 'hello@jittika.com'}
                    </button>
                  </div>
                </div>
                <div className="pc-address-line">
                  <div className="pc-link-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pc-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <a href="https://linkedin.com/in/jittikas" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
                <div className="pc-address-line">
                  <div className="pc-link-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pc-icon"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <Link to="/support">App Support</Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Jittika Sakulchit. All rights reserved.</p>
      </div>
    </footer>
  )
}
