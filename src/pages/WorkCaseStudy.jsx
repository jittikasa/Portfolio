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

function ScreenshotStack({ images, labels, project }) {
  return (
    <div className="cs-screenshot-stack">
      {images.map((img, i) => (
        <div key={img} className={`cs-stack-item cs-stack-item--${i}`}>
          <span className="cs-stack-label mono">{labels[i] || `View ${i+1}`}</span>
          <BrowserFrame src={img} alt={`${project.title} — screenshot ${i}`} />
        </div>
      ))}
    </div>
  )
}

export default function WorkCaseStudy() {
  const { id } = useParams()
  const project = getProjectById(id)

  if (!project || project.category !== 'work' || project.subcategory !== 'dev') {
    return <Navigate to="/work" replace />
  }

  const hasTimeline = project.timeline?.length > 0
  const hasPillars = project.pillars?.length > 0
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
            className="cs-tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {project.tags.map((tag, i) => (
              <span key={tag} className="cs-tag">
                <span className="cs-tag-dot" style={{ background: dotColors[i % dotColors.length] }} />
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </header>

      <div className="cs-container">

        {hasTimeline && (
          <FadeUp>
            <div className="cs-hero-row">
              <div className="cs-hero-row-media">
                {images[0] && (
                  <BrowserFrame src={images[0]} alt={`${project.title} — homepage`} loading="eager" />
                )}
              </div>
              <div className="cs-hero-row-info">
                {project.overview && (
                  <p className="cs-intro-text">{project.overview}</p>
                )}
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

                {/* Atelier Timeline — Back in hero info area */}
                <div className="cs-atelier-wrap">
                  <span className="cs-timeline-label-script">Project Timeline</span>
                  <div className="cs-atelier-timeline">
                    {project.timeline.map((entry, i) => (
                    <motion.button 
                      key={entry.year} 
                      className="cs-atelier-step"
                      onClick={() => {
                        // Scroll to foundation for 2023, engine for 2026, or respective phase
                        let targetId = `phase-${entry.year}`
                        if (hasPillars) {
                          if (entry.year === '2023') targetId = 'pillar-foundation'
                          if (entry.year === '2026') targetId = 'pillar-engine'
                        }
                        const el = document.getElementById(targetId)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0, transition: { delay: 0.2 + (i * 0.1) } }
                      }}
                      whileHover="hover"
                    >
                      <div className="cs-atelier-marker">
                        <motion.div 
                          className="cs-atelier-bloom" 
                          style={{ backgroundColor: dotColors[i % dotColors.length] }}
                          variants={{ 
                            hover: { scale: 1.8, filter: 'blur(3px)', opacity: 0.85 } 
                          }}
                        />
                      </div>
                      <div className="cs-atelier-content">
                        <span className="cs-atelier-year mono">{entry.year}</span>
                        <h4 className="cs-atelier-title">{entry.title}</h4>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        )}

        {/* Dynamic Pillars (The Storytelling Backbone) */}
        {hasPillars ? (
          project.pillars.map((pillar, i) => (
            <FadeUp key={pillar.id}>
              <section id={`pillar-${pillar.id}`} className="cs-pillar-section">
                <div className={`cs-pillar ${i % 2 !== 0 ? 'cs-pillar--reverse' : ''}`}>
                  <div className="cs-pillar-text">
                    <span className="cs-pillar-label mono">Chapter {i + 1} — {pillar.title}</span>
                    <h3 className="cs-pillar-subtitle">{pillar.subtitle}</h3>
                    <p className="cs-pillar-desc">{pillar.description}</p>
                    <div className="cs-pillar-tags">
                      {pillar.tags.map(t => <span key={t} className="cs-pillar-tag mono">{t}</span>)}
                    </div>
                  </div>
                  
                  <div className="cs-pillar-media">
                    <ScreenshotStack 
                      images={pillar.imageIndices.map(idx => images[idx])} 
                      labels={pillar.imageIndices.map(idx => project.pageLabels[idx])}
                      project={project}
                    />
                  </div>
                </div>
              </section>
            </FadeUp>
          ))
        ) : hasTimeline && (
          /* Original phase row logic for legacy projects */
          project.timeline.map((entry, i) => (
            <FadeUp key={entry.year}>
              <div 
                id={`phase-${entry.year}`}
                className={`cs-editorial ${i % 2 !== 0 ? 'cs-editorial--reverse' : ''}`}
              >
                <div className="cs-editorial-text">
                  <span className="cs-editorial-label mono">{entry.year} — {entry.title}</span>
                  <p className="cs-plugin-desc">{entry.description}</p>
                </div>
                <div className="cs-editorial-media">
                  {images[entry.imageIndex] && (
                    <BrowserFrame src={images[entry.imageIndex]} alt={`${project.title} — ${entry.title}`} />
                  )}
                </div>
              </div>
            </FadeUp>
          ))
        )}

        {/* Project Results Summary */}
        <FadeUp>
          <div className="cs-results-grid">
            {project.systemOverview && (
              <div className="cs-results-card cs-results-card--system">
                <span className="cs-editorial-label mono">{project.systemOverview.title}</span>
                <p className="cs-plugin-desc">{project.systemOverview.description}</p>
                {project.systemOverview.plugins?.map((plugin) => (
                  <div key={plugin.name} className="cs-plugin">
                    <h4 className="cs-plugin-name">{plugin.name}</h4>
                    <p className="cs-plugin-desc">{plugin.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {project.whatWasBuilt?.length > 0 && (
              <div className="cs-results-card cs-results-card--list">
                <span className="cs-editorial-label mono">Project Deliverables</span>
                <ul className="cs-built-list">
                  {project.whatWasBuilt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </FadeUp>

        {/* Other projects navigation */}
        {devProjects.length > 1 && (
          <FadeUp>
            <div className="cs-others">
              <span className="cs-others-label">Other Projects</span>
              <div className="cs-others-list">
                <Link to="/work" className="cs-others-link">
                  <span>All Work</span>
                  <span className="cs-others-arrow">↗</span>
                </Link>
                {devProjects.filter(p => p.id !== project.id).map(p => (
                  <Link key={p.id} to={`/work/${p.id}`} className="cs-others-link">
                    <span>{p.title}</span>
                    <span className="cs-others-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </FadeUp>
        )}
      </div>
    </div>
  )
}
