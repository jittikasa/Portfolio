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
                  <img src="/JS-Stamp.png" alt="Stamp" className="pc-stamp-img" />
                </div>
              </div>
              
              <div className="pc-address-lines">
                <div className="pc-address-line">
                  <span className="pc-to">To: </span>
                  <div className="pc-link-item">
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
                    <a href="https://linkedin.com/in/jittikas" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
                <div className="pc-address-line">
                  <div className="pc-link-item">
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
