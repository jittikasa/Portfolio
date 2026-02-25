import SignatureName from './SignatureName'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact">
      <div className="footer-ragged-edge" aria-hidden="true" />

      <div className="pc-wrap">

        {/* Floating postcard */}
        <div className="pc-card">

          <div className="pc-topbar">
            <span className="pc-label">POST CARD</span>
            <span className="pc-airmail">✈ AIR MAIL</span>
          </div>

          <div className="pc-body">

            {/* Left — message + ruled lines */}
            <div className="pc-message">
              <p className="pc-text">
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
              <div className="pc-stamp" aria-hidden="true">
                <span>JS</span>
              </div>
              <div className="pc-links">
                <p className="pc-to">TO:</p>
                <a href="mailto:hello@jittika.com">hello@jittika.com</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Dribbble</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Jittika Sakulchit. All rights reserved.</p>
      </div>
    </footer>
  )
}
