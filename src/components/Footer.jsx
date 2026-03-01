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
                Always looking for the next meaningful <Link to="/work" className="pc-body-link">project</Link> to dive into, or a curious <Link to="/play" className="pc-body-link">experiment</Link> to bring to life. If you have a specific vision in mind or just want to talk shop, please <Link to="/contact" className="pc-body-link">drop a line</Link> and say hi.
              </p>
              <div className="pc-sig">
                <SignatureName variant="footer" />
              </div>
            </div>

            <div className="pc-divider" aria-hidden="true" />

            {/* Right — address side */}
            <div className="pc-address">
              <div className="pc-stamp-area">
                <svg className="cancellation-lines" width="200" height="80" viewBox="0 0 200 80" fill="none" stroke="currentColor">
                  <g strokeWidth="0.8" opacity="0.4">
                    <path d="M0 20 Q 25 10, 50 20 T 100 20 T 150 20 T 200 20" />
                    <path d="M0 35 Q 25 25, 50 35 T 100 35 T 150 35 T 200 35" />
                    <path d="M0 50 Q 25 40, 50 50 T 100 50 T 150 50 T 200 50" />
                    <path d="M0 65 Q 25 55, 50 65 T 100 65 T 150 65 T 200 65" />
                  </g>
                </svg>
                <div className="pc-stamp" aria-hidden="true">
                  <img src="/JS-Stamp.png" alt="Stamp" className="pc-stamp-img" />
                </div>
              </div>
              
              <div className="pc-address-lines">
                <div className="pc-address-line">
                  <span className="pc-to">To: </span>
                </div>
                <div className="pc-address-line">
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
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pc-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <Link to="/privacy">Privacy Policy</Link>
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
