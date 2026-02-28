import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getWorkProjects } from '../data/projects'
import { PaintFilter, Cloud } from '../components/HeroClouds'
import './WorkDesign.css'

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

function DesignCard({ project, index }) {
  const ref = useFadeUp()

  return (
    <article ref={ref} className="wd-card" style={{ '--delay': `${index * 0.08}s`, '--accent': project.accentColor, '--card-color': project.color }}>
      <div className="wd-card-image">
        {project.images?.[0]
          ? <img src={project.images[0]} alt={project.title} />
          : <>
              <div className="wd-card-wash" aria-hidden="true" />
              <span className="wd-card-placeholder mono">Preview</span>
            </>
        }
      </div>
      <div className="wd-card-info">
        <h3 className="wd-card-title">{project.title}</h3>
        <p className="wd-card-subtitle serif-italic">{project.subtitle}</p>
        <div className="wd-card-tags">
          {project.tags.map(tag => (
            <span key={tag} className="wd-tag mono">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function WorkDesign() {
  const projects = getWorkProjects('design')

  return (
    <div className="wd-page">
      <PaintFilter />

      {/* Back */}
      <div className="wd-back-wrap">
        <Link to="/work" className="wd-back mono">← All Work</Link>
      </div>

      {/* Hero */}
      <header className="wd-hero">
        <div className="wd-hero-clouds" aria-hidden="true">
          <Cloud className="sz-sm" variant="c" filter="cloud-paint-soft"  style={{ top: '-5%',  left: '-8%'  }} />
          <Cloud className="sz-xs" variant="a" filter="cloud-paint-wispy" style={{ top: '15%',  left: '80%'  }} />
          <Cloud className="sz-xs" variant="d" filter="cloud-paint"       style={{ top: '65%',  left: '90%'  }} />
        </div>

        <div className="wd-hero-inner">
          <motion.span
            className="wd-hero-label mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Design Work
          </motion.span>

          <motion.h1
            className="wd-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Visual & UX Design
          </motion.h1>

          <motion.p
            className="wd-hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.0, delay: 0.5 }}
          >
            Website designs, UX research, and brand identities crafted in Figma
            for property, hospitality, and lifestyle brands.
          </motion.p>
        </div>
      </header>

      {/* Gallery */}
      <section className="wd-gallery">
        <div className="wd-gallery-container">
          {projects.map((p, i) => (
            <DesignCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
