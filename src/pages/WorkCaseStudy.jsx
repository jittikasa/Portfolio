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

  const hasTimeline = project.timeline?.length > 0
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

        {hasTimeline ? (
          <>
            {/* Hero row — 60/40 screenshot + overview */}
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

                  {/* Timeline widget — compact vertical marker */}
                  <div className="cs-timeline-widget">
                    {project.timeline.map((entry, i) => (
                      <div key={entry.year} className="cs-timeline-step">
                        <span className="cs-timeline-dot" style={{ background: dotColors[i % dotColors.length] }} />
                        <span className="cs-timeline-year mono">{entry.year}</span>
                        <span className="cs-timeline-title">{entry.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Phase rows — normal editorial layout */}
            {project.timeline.map((entry, i) => (
              <FadeUp key={entry.year}>
                <div className={`cs-editorial ${i % 2 !== 0 ? 'cs-editorial--reverse' : ''}`}>
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
            ))}

            {/* Row: system overview + screenshot */}
            {project.systemOverview && (
              <FadeUp>
                <div className="cs-editorial">
                  <div className="cs-editorial-text">
                    <span className="cs-editorial-label mono">{project.systemOverview.title}</span>
                    {project.systemOverview.description && (
                      <p className="cs-plugin-desc">{project.systemOverview.description}</p>
                    )}
                    {project.systemOverview.plugins?.map((plugin) => (
                      <div key={plugin.name} className="cs-plugin">
                        <h4 className="cs-plugin-name">{plugin.name}</h4>
                        <p className="cs-plugin-desc">{plugin.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="cs-editorial-media">
                    <BrowserFrame src={images[3] || images[1]} alt={`${project.title} — detail`} />
                  </div>
                </div>
              </FadeUp>
            )}

            {/* Row: screenshot + what was built (reversed) */}
            {project.whatWasBuilt?.length > 0 && (
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
                    <BrowserFrame src={images[4] || images[2]} alt={`${project.title} — detail`} />
                  </div>
                </div>
              </FadeUp>
            )}
          </>
        ) : isDetailed ? (
          <>
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
          <>
            {/* Hero screenshot + overview side by side */}
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
                </div>
              </div>
            </FadeUp>

            {/* Remaining screenshots — fanned stack */}
            {images.length > 1 && (
              <FadeUp>
                <div className="cs-pages-fan">
                  <div className="cs-pages-fan-stack">
                    {images.slice(1).map((image, index) => (
                      <div key={image} className="cs-pages-card">
                        <span className="cs-pages-card-label mono">
                          {project.pageLabels?.[index + 1] || `Page ${index + 2}`}
                        </span>
                        <BrowserFrame src={image} alt={`${project.title} — ${project.pageLabels?.[index + 1] || `page ${index + 2}`}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            )}
          </>
        )}

        {/* Other projects */}
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
