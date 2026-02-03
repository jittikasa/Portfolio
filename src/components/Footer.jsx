import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <p className="footer__copyright">
            {currentYear} Jittika
          </p>
          <span className="footer__dot">·</span>
          <p className="footer__location">
            Phuket, Thailand
          </p>
        </div>
      </div>
    </footer>
  )
}
