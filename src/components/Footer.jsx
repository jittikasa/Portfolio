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
                <svg className="cancellation-lines" width="200" height="100" viewBox="0 0 200 100" fill="none" stroke="currentColor">
                  <g strokeWidth="1.5" opacity="0.8">
                    <path d="M0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20" />
                    <path d="M0 32 Q 25 17, 50 32 T 100 32 T 150 32 T 200 32" />
                    <path d="M0 44 Q 25 29, 50 44 T 100 44 T 150 44 T 200 44" />
                    <path d="M0 56 Q 25 41, 50 56 T 100 56 T 150 56 T 200 56" />
                    <path d="M0 68 Q 25 53, 50 68 T 100 68 T 150 68 T 200 68" />
                    <path d="M0 80 Q 25 65, 50 80 T 100 80 T 150 80 T 200 80" />
                  </g>
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
