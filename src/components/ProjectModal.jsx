import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './ProjectModal.css'

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!project) return null

  const { title, subtitle, description, type, year, tags, color, accentColor, links, images } = project
  const hasImages = images && images.length > 0

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="project-modal">
          {/* Backdrop */}
          <motion.div
            className="project-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="project-modal__container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Close button */}
            <button
              className="project-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>

            <div className="project-modal__content">
              {/* Left: Image or stamp visual */}
              {hasImages ? (
                <div className="project-modal__visual project-modal__visual--image" style={{ backgroundColor: color }}>
                  <img
                    src={images[0]}
                    alt={title}
                    className="project-modal__cover-img"
                  />
                </div>
              ) : (
              <div className="project-modal__visual" style={{ backgroundColor: color }}>
                {/* Perforated edges */}
                <svg className="project-modal__perforations" viewBox="0 0 100 130" preserveAspectRatio="none">
                  <defs>
                    <mask id="modal-mask">
                      <rect width="100" height="130" fill="white"/>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <circle key={`t${i}`} cx={5 + i * 8.3} cy="3" r="3.5" fill="black"/>
                      ))}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <circle key={`b${i}`} cx={5 + i * 8.3} cy="127" r="3.5" fill="black"/>
                      ))}
                      {Array.from({ length: 15 }).map((_, i) => (
                        <circle key={`l${i}`} cx="3" cy={6 + i * 8.3} r="3.5" fill="black"/>
                      ))}
                      {Array.from({ length: 15 }).map((_, i) => (
                        <circle key={`r${i}`} cx="97" cy={6 + i * 8.3} r="3.5" fill="black"/>
                      ))}
                    </mask>
                  </defs>
                  <rect width="100" height="130" fill={color} mask="url(#modal-mask)"/>
                </svg>

                {/* Inner content */}
                <div className="project-modal__stamp-inner">
                  <div className="project-modal__stamp-header">
                    <span>THAILAND</span>
                    <span>{year}</span>
                  </div>

                  <div
                    className="project-modal__stamp-artwork"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span>{title.charAt(0)}</span>
                  </div>

                  <div className="project-modal__stamp-denomination">
                    {parseInt(year) - 2018}฿
                  </div>
                </div>
              </div>
              )}

              {/* Right: Info */}
              <div className="project-modal__info">
                <div className="project-modal__meta">
                  <span className="project-modal__type">{type}</span>
                  <span className="project-modal__year">{year}</span>
                </div>

                <h2 className="project-modal__title">{title}</h2>
                <p className="project-modal__subtitle">{subtitle}</p>
                
                <p className="project-modal__description">{description}</p>

                <div className="project-modal__tags">
                  {tags.map((tag, i) => (
                    <span key={tag} className="project-modal__tag">
                      {i > 0 && <span className="project-modal__tag-sep">•</span>}
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-modal__actions">
                  {links.live && (
                    <a href={links.live} className="project-modal__btn project-modal__btn--primary" target="_blank" rel="noopener noreferrer">
                      View Live →
                    </a>
                  )}
                  {links.appStore && (
                    <a href={links.appStore} className="project-modal__btn project-modal__btn--primary" target="_blank" rel="noopener noreferrer">
                      App Store →
                    </a>
                  )}
                  {links.caseStudy && (
                    <a href={links.caseStudy} className="project-modal__btn project-modal__btn--secondary">
                      Case Study
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
