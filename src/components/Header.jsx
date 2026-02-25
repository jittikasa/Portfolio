import { Link, useLocation } from 'react-router-dom'
import SignatureName from './SignatureName'
import './Header.css'

export default function Header() {
  const location = useLocation()

  const handleNavClick = (e, targetId) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <SignatureName variant="logo" />
        </Link>

        <nav className="nav">
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Work</a>
        </nav>
      </div>
    </header>
  )
}
