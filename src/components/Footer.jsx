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
          <div className="pc-texture" aria-hidden="true"></div>
          
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
                <div className="pc-postmark" aria-hidden="true">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
                    <text x="50%" y="35%" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">PHUKET</text>
                    <text x="50%" y="55%" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="currentColor">28.02.26</text>
                    <text x="50%" y="75%" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">THAILAND</text>
                  </svg>
                </div>

                <div className="pc-stamp" aria-hidden="true">
                  <div className="pc-stamp-inner">
                    <div className="pc-stamp-img">
                      <img src="/beach.jpg" alt="Stamp" />
                    </div>
                    <div className="pc-stamp-value">40</div>
                    <div className="pc-stamp-country">THAILAND</div>
                  </div>
                  <div className="pc-stamp-edge"></div>
                </div>
              </div>
              
              <div className="pc-address-lines">
                <div className="pc-to-line">
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
