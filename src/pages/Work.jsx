import { useEffect, useRef, useCallback } from 'react'
import { getProjectsByCategory } from '../data/projects'
import './Work.css'

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

function FadeUp({ children, className = '', stagger = false }) {
  const ref = useFadeUp()
  return (
    <div ref={ref} className={`${stagger ? 'fade-up-stagger' : 'fade-up'} ${className}`}>
      {children}
    </div>
  )
}

function CaseStudyCard({ project, index }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className="case-study">
      <hr className="case-study-divider" />

      {/* Header */}
      <FadeUp>
        <header className="case-study-header">
          <span className="case-study-number mono">{number}</span>
          <h2 className="case-study-title">{project.title}</h2>
          <p className="case-study-subtitle">{project.subtitle}</p>
          <div className="case-study-meta-row">
            <span>{project.year}</span>
            <span className="case-study-meta-divider">/</span>
            <span>{project.role}</span>
            <span className="case-study-meta-divider">/</span>
            <span>{project.type}</span>
          </div>
        </header>
      </FadeUp>

      {/* Tags */}
      <FadeUp>
        <div className="case-study-tags">
          {project.tags.map((tag, i) => (
            <span key={tag}>
              <span className="case-study-tag">{tag}</span>
              {i < project.tags.length - 1 && (
                <span className="case-study-tag-divider">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
              )}
            </span>
          ))}
        </div>
      </FadeUp>

      <hr className="case-study-divider" />

      {/* Body — 2 column */}
      <div className="case-study-body">
        <FadeUp>
          <div className="case-study-overview">
            <p>{project.overview}</p>
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-visit"
              >
                Visit Site →
              </a>
            )}
          </div>
        </FadeUp>

        <div className="case-study-sidebar">
          {project.systemOverview && (
            <FadeUp>
              <div className="case-study-sidebar-section">
                <span className="case-study-sidebar-label mono">{project.systemOverview.title}</span>
                {project.systemOverview.plugins.map((plugin) => (
                  <div key={plugin.name} className="case-study-plugin">
                    <h4 className="case-study-plugin-name">{plugin.name}</h4>
                    <p className="case-study-plugin-desc">{plugin.description}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}

          {project.whatWasBuilt && (
            <FadeUp>
              <div className="case-study-sidebar-section">
                <span className="case-study-sidebar-label mono">What Was Built</span>
                <ul className="case-study-built-list">
                  {project.whatWasBuilt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          )}
        </div>
      </div>

      {/* Gallery placeholders */}
      <FadeUp>
        <div className="case-study-gallery">
          <div className="case-study-gallery-grid case-study-gallery-full">
            <div className="case-study-gallery-item case-study-gallery-item--hero">
              Image
            </div>
          </div>
          <div className="case-study-gallery-grid case-study-gallery-pair" style={{ marginTop: 2 }}>
            <div className="case-study-gallery-item case-study-gallery-item--pair">
              Image
            </div>
            <div className="case-study-gallery-item case-study-gallery-item--pair">
              Image
            </div>
          </div>
        </div>
      </FadeUp>
    </article>
  )
}

export default function Work() {
  const projects = getProjectsByCategory('work')

  return (
    <div className="work-page">
      {/* Hero */}
      <section className="work-hero">
        <h1 className="work-hero-title">Selected Work</h1>
        <hr className="work-hero-rule" />
        <p className="work-hero-count mono">
          {String(projects.length).padStart(2, '0')} Project{projects.length !== 1 ? 's' : ''}
        </p>
      </section>

      {/* Case Studies */}
      {projects.map((project, i) => (
        <CaseStudyCard key={project.id} project={project} index={i} />
      ))}
    </div>
  )
}
