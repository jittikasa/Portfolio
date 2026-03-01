import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProjectsByCategory } from '../data/projects'
import { PaintFilter, Cloud } from '../components/HeroClouds'
import './Work.css'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } }
}

function useFadeUp() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function DesignPreviewModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <motion.div
      className="work-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="work-modal-panel"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        style={{ '--project-accent': project.accentColor, '--project-color': project.color }}
      >
        <button type="button" className="work-modal-close" onClick={onClose} aria-label="Close design preview">
          ×
        </button>

        <div className="work-modal-header">
          <span className="work-modal-meta mono">{project.type} · {project.year}</span>
          <h2 className="work-modal-title">{project.title}</h2>
          <p className="work-modal-subtitle serif-italic">{project.subtitle}</p>
        </div>

        <div className="work-modal-shot">
          {project.images?.length
            ? (
              <div className="work-modal-shot-gallery">
                {project.images.slice(0, 3).map((image, index) => (
                  <div key={image} className="work-modal-shot-frame">
                    <img src={image} alt={`${project.title} design preview ${index + 1}`} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="work-modal-shot-placeholder" aria-hidden="true">
                <div className="work-modal-shot-wash" />
                <span className="work-modal-shot-label mono">Design Preview</span>
                <div className="work-modal-shot-ui">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
        </div>

        <div className="work-modal-footer">
          <div className="work-modal-tags">
            {project.tags.map(tag => (
              <span key={tag} className="work-modal-tag mono">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, onOpenDesign }) {
  const ref = useFadeUp()
  const number = String(index + 1).padStart(2, '0')
  const isDev = project.subcategory === 'dev'
  const cardStyle = {
    '--accent': project.accentColor,
    '--card-color': project.color,
    '--delay': `${index * 0.1}s`
  }

  const cardBody = (
    <>
      <div className="work-card-image">
        {project.images?.[0]
          ? <>
              <img src={project.images[0]} alt={project.title} />
              <div className="work-card-overlay" aria-hidden="true" />
            </>
          : <>
              <div className="work-card-wash" aria-hidden="true" />
              <span className="work-card-number mono">{number}</span>
            </>
        }
      </div>
      <div className="work-card-info">
        <span className="work-card-type mono">{project.type}</span>
        <h2 className="work-card-title">{project.title}</h2>
        <p className="work-card-subtitle serif-italic">{project.subtitle}</p>
      </div>
    </>
  )

  if (!isDev) {
    return (
      <button
        type="button"
        className="work-card"
        ref={ref}
        style={cardStyle}
        onClick={() => onOpenDesign(project)}
      >
        {cardBody}
      </button>
    )
  }

  return (
    <Link
      to={`/work/${project.id}`}
      className="work-card"
      ref={ref}
      style={cardStyle}
    >
      {cardBody}
    </Link>
  )
}

export default function Work() {
  const allWork = getProjectsByCategory('work')
  const devProjects = allWork.filter(p => p.subcategory === 'dev')
  const designProjects = allWork.filter(p => p.subcategory === 'design')
  const [selectedDesign, setSelectedDesign] = useState(null)

  return (
    <>
      <div className="work-canvas">
        <div className="work-clouds" aria-hidden="true">
          <PaintFilter />
          <Cloud className="sz-md" variant="c" filter="cloud-paint-soft"  style={{ top: '-4%',  left: '-8%'  }} />
          <Cloud className="sz-sm" variant="a" filter="cloud-paint-wispy" style={{ top: '5%',   left: '72%'  }} />
          <Cloud className="sz-xs" variant="b" filter="cloud-paint-wispy" style={{ top: '30%',  left: '-2%'  }} />
          <Cloud className="sz-sm" variant="d" filter="cloud-paint-soft"  style={{ top: '55%',  left: '80%'  }} />
          <Cloud className="sz-xs" variant="c" filter="cloud-paint-wispy" style={{ top: '70%',  left: '10%'  }} />
          <Cloud className="sz-xs" variant="a" filter="cloud-paint-wispy" style={{ top: '85%',  left: '60%'  }} />
        </div>

        <motion.div
          className="work-inner"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Hero — matches contact/support pattern */}
          <motion.div className="work-header" variants={fade}>
            <p className="work-eyebrow mono">Selected Work</p>
            <h1 className="work-title">Development, design<br /><em>& everything between.</em></h1>
            <p className="work-sub">
              Client projects, freelance builds, and design work — from full-stack platforms to Figma prototypes.
            </p>
          </motion.div>

          {/* Dev + Design — full case studies */}
          <motion.section className="work-grid-section" variants={fade}>
            <span className="work-section-label mono">Development & Design</span>
            <div className="work-grid">
              {devProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpenDesign={setSelectedDesign} />
              ))}
            </div>
          </motion.section>

          {/* Design only */}
          <motion.section className="work-grid-section" variants={fade}>
            <span className="work-section-label mono">Design</span>
            <div className="work-grid work-grid--design">
              {designProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={devProjects.length + i} onOpenDesign={setSelectedDesign} />
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedDesign ? (
          <DesignPreviewModal project={selectedDesign} onClose={() => setSelectedDesign(null)} />
        ) : null}
      </AnimatePresence>
    </>
  )
}
