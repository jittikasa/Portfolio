import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [project])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-panel"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ '--project-color': project.color }} // Pass color to CSS
        >
          <button className="modal-close" onClick={onClose}>×</button>
          
          <div className="modal-header">
            <span className="modal-category">{project.type} · {project.year}</span>
            <h2>{project.title}</h2>
            <p className="modal-subtitle">{project.subtitle}</p>
          </div>

          <div className="modal-content">
            <div className="modal-description">
              <p>{project.description}</p>
              
              <div className="modal-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              {project.links && Object.keys(project.links).length > 0 && (
                <div className="modal-links">
                  {Object.entries(project.links).map(([key, url]) => {
                    const isInternal = url.startsWith('/')
                    if (isInternal) {
                      return (
                        <Link key={key} to={url} className="modal-link" onClick={onClose}>
                          Visit {key} →
                        </Link>
                      )
                    }
                    return (
                      <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="modal-link">
                        Visit {key} →
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
            
            <div className="modal-gallery">
              {project.images && project.images.map((img, i) => (
                <div key={i} className="gallery-item">
                   <img src={img} alt={`${project.title} screenshot ${i+1}`} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
