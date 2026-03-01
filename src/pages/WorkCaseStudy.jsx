import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getProjectById, getWorkProjects } from '../data/projects'
import { PaintFilter } from '../components/HeroClouds'
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

function BrowserFrame({ src, alt, loading = 'lazy' }) {
  return (
    <div className="cs-frame">
      <div className="cs-frame-bar">
        <span className="cs-frame-dot" />
        <span className="cs-frame-dot" />
        <span className="cs-frame-dot" />
      </div>
      <div className="cs-frame-viewport">
        <img src={src} alt={alt} loading={loading} />
      </div>
    </div>
  )
}

export default function WorkCaseStudy() {
  const { id } = useParams()
  const project = getProjectById(id)

  if (!project || project.category !== 'work' || project.subcategory !== 'dev') {
    return <Navigate to="/work" replace />
  }

  const isDetailed = project.systemOverview || project.whatWasBuilt?.length > 0
  const images = project.images || []
  const dotColors = ['#8BAABF', '#C9A8A8', '#7A7850', '#5B7A96', '#8A8760', '#B0AE8A']

  // Next project navigation
  const devProjects = getWorkProjects('dev')
  const currentIndex = devProjects.findIndex(p => p.id === project.id)
  const nextProject = devProjects[(currentIndex + 1) % devProjects.length]

  return (
    <div className="cs-page">
      <PaintFilter />

      {/* Hero */}
      <header className="cs-hero">
        <div className="cs-hero-inner">
          <motion.span
            className="cs-hero-type mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            className="cs-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.3 }}
          >
            {project.subtitle}
          </motion.p>

          <motion.div
            className="cs-hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="cs-hero-role mono">{project.role}</span>
            <div className="cs-tags">
              {project.tags.map((tag, i) => (
                <span key={tag} className="cs-tag">
                  <span className="cs-tag-dot" style={{ background: dotColors[i % dotColors.length] }} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <div className="cs-container">

        {/* Hero screenshot — full width */}
        {images[0] && (
          <FadeUp>
            <BrowserFrame src={images[0]} alt={`${project.title} — homepage`} loading="eager" />
          </FadeUp>
        )}

        {/* Overview + Visit */}
        {project.overview && (
          <FadeUp>
            <div className="cs-intro">
              <p className="cs-intro-text">{project.overview}</p>
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
        )}

        {/* Editorial rows — alternating screenshot + text */}
        {isDetailed ? (
          <>
            {/* Row: system overview + screenshot */}
            {project.systemOverview && images[1] && (
              <FadeUp>
                <div className="cs-editorial">
                  <div className="cs-editorial-text">
                    <span className="cs-editorial-label mono">{project.systemOverview.title}</span>
                    {project.systemOverview.plugins.map((plugin) => (
                      <div key={plugin.name} className="cs-plugin">
                        <h4 className="cs-plugin-name">{plugin.name}</h4>
                        <p className="cs-plugin-desc">{plugin.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="cs-editorial-media">
                    <BrowserFrame src={images[1]} alt={`${project.title} — detail`} />
                  </div>
                </div>
              </FadeUp>
            )}

            {/* Row: screenshot + what was built (reversed) */}
            {project.whatWasBuilt?.length > 0 && images[2] && (
              <FadeUp>
                <div className="cs-editorial cs-editorial--reverse">
                  <div className="cs-editorial-text">
                    <span className="cs-editorial-label mono">What Was Built</span>
                    <ul className="cs-built-list">
                      {project.whatWasBuilt.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cs-editorial-media">
                    <BrowserFrame src={images[2]} alt={`${project.title} — detail`} />
                  </div>
                </div>
              </FadeUp>
            )}

            {/* Remaining screenshots */}
            {images.slice(3).map((image, index) => (
              <FadeUp key={image}>
                <div className={`cs-editorial ${index % 2 === 0 ? '' : 'cs-editorial--reverse'}`}>
                  <div className="cs-editorial-media cs-editorial-media--full">
                    <BrowserFrame src={image} alt={`${project.title} — page ${index + 4}`} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </>
        ) : (
          /* Generic projects — alternating editorial rows for each remaining image */
          images.slice(1).map((image, index) => (
            <FadeUp key={image}>
              <div className={`cs-editorial ${index % 2 === 0 ? 'cs-editorial--reverse' : ''}`}>
                <div className="cs-editorial-media cs-editorial-media--solo">
                  <BrowserFrame src={image} alt={`${project.title} — page ${index + 2}`} />
                </div>
              </div>
            </FadeUp>
          ))
        )}

        {/* Other projects */}
        {devProjects.length > 1 && (
          <FadeUp>
            <div className="cs-others">
              <span className="cs-others-label">Other Projects</span>
              <div className="cs-others-list">
                {devProjects.filter(p => p.id !== project.id).map(p => (
                  <Link key={p.id} to={`/work/${p.id}`} className="cs-others-link">
                    <span>{p.title}</span>
                    <span className="cs-others-arrow">→</span>
                  </Link>
                ))}
              </div>
              <Link to="/work" className="cs-back-link">← All Work</Link>
            </div>
          </FadeUp>
        )}
      </div>
    </div>
  )
}
