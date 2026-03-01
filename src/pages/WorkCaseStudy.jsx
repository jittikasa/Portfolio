import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getProjectById } from '../data/projects'
import { PaintFilter, Cloud } from '../components/HeroClouds'
import './WorkCaseStudy.css'

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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function FadeUp({ children, className = '' }) {
  const ref = useFadeUp()
  return (
    <div ref={ref} className={`cs-fade-up ${className}`}>
      {children}
    </div>
  )
}

export default function WorkCaseStudy() {
  const { id } = useParams()
  const project = getProjectById(id)

  if (!project || project.category !== 'work' || project.subcategory !== 'dev') {
    return <Navigate to="/work" replace />
  }

  return (
    <div className="cs-page">
      <PaintFilter />

      {/* Back link */}
      <div className="cs-back-wrap">
        <Link to="/work" className="cs-back mono">← All Work</Link>
      </div>

      {/* Hero */}
      <header className="cs-hero">
        <div className="cs-hero-clouds" aria-hidden="true">
          <Cloud className="sz-sm" variant="c" filter="cloud-paint-soft"  style={{ top: '-10%', left: '-8%'  }} />
          <Cloud className="sz-xs" variant="a" filter="cloud-paint-wispy" style={{ top: '20%',  left: '82%'  }} />
          <Cloud className="sz-xs" variant="d" filter="cloud-paint"       style={{ top: '70%',  left: '88%'  }} />
        </div>

        <div className="cs-hero-inner">
          <motion.span
            className="cs-hero-type mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8 }}
          >
            {project.type} · {project.year}
          </motion.span>

          <motion.h1
            className="cs-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="cs-hero-subtitle serif-italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1.0, delay: 0.3 }}
          >
            {project.subtitle}
          </motion.p>

          <motion.span
            className="cs-hero-role mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {project.role}
          </motion.span>
        </div>
      </header>

      <div className="cs-container">
        <hr className="cs-divider" />

        {/* Tags */}
        <FadeUp>
          <div className="cs-tags">
            {project.tags.map((tag, i) => (
              <span key={tag}>
                <span className="cs-tag">{tag}</span>
                {i < project.tags.length - 1 && (
                  <span className="cs-tag-sep">/</span>
                )}
              </span>
            ))}
          </div>
        </FadeUp>

        <hr className="cs-divider" />

        {/* Body — 2 column */}
        {project.overview && (
          <div className="cs-body">
            <FadeUp>
              <div className="cs-overview">
                <p>{project.overview}</p>
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-visit mono"
                  >
                    Visit Site →
                  </a>
                )}
              </div>
            </FadeUp>

            <div className="cs-sidebar">
              {project.systemOverview && (
                <FadeUp>
                  <div className="cs-sidebar-section">
                    <span className="cs-sidebar-label mono">{project.systemOverview.title}</span>
                    {project.systemOverview.plugins.map((plugin) => (
                      <div key={plugin.name} className="cs-plugin">
                        <h4 className="cs-plugin-name">{plugin.name}</h4>
                        <p className="cs-plugin-desc">{plugin.description}</p>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              )}

              {project.whatWasBuilt?.length > 0 && (
                <FadeUp>
                  <div className="cs-sidebar-section">
                    <span className="cs-sidebar-label mono">What Was Built</span>
                    <ul className="cs-built-list">
                      {project.whatWasBuilt.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              )}
            </div>
          </div>
        )}

        {/* Gallery placeholders */}
        <FadeUp>
          <div className="cs-gallery">
            {project.images?.length ? (
              <>
                <div className="cs-gallery-grid cs-gallery-full">
                  <div className="cs-gallery-item cs-gallery-item--hero">
                    <img src={project.images[0]} alt={`${project.title} screenshot 1`} />
                  </div>
                </div>

                {project.images.length > 1 && (
                  <div className="cs-gallery-grid cs-gallery-pair">
                    {project.images.slice(1).map((image, index) => (
                      <div key={image} className="cs-gallery-item cs-gallery-item--pair">
                        <img src={image} alt={`${project.title} screenshot ${index + 2}`} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="cs-gallery-grid cs-gallery-full">
                  <div className="cs-gallery-item cs-gallery-item--hero">
                    <div className="cs-gallery-wash" aria-hidden="true" />
                    <span className="mono">Image</span>
                  </div>
                </div>
                <div className="cs-gallery-grid cs-gallery-pair">
                  <div className="cs-gallery-item cs-gallery-item--pair">
                    <div className="cs-gallery-wash" aria-hidden="true" />
                    <span className="mono">Image</span>
                  </div>
                  <div className="cs-gallery-item cs-gallery-item--pair">
                    <div className="cs-gallery-wash" aria-hidden="true" />
                    <span className="mono">Image</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
