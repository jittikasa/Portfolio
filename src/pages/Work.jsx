import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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

function ProjectCard({ project, index }) {
  const ref = useFadeUp()
  const number = String(index + 1).padStart(2, '0')
  const isDev = project.subcategory === 'dev'
  const linkTo = isDev ? `/work/${project.id}` : '/work/design'

  return (
    <Link
      to={linkTo}
      className="work-card"
      ref={ref}
      style={{
        '--accent': project.accentColor,
        '--card-color': project.color,
        '--delay': `${index * 0.1}s`
      }}
    >
      <div className="work-card-image">
        {project.images?.[0]
          ? <img src={project.images[0]} alt={project.title} />
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
    </Link>
  )
}

export default function Work() {
  const allWork = getProjectsByCategory('work')
  const devProjects = allWork.filter(p => p.subcategory === 'dev')
  const designProjects = allWork.filter(p => p.subcategory === 'design')

  return (
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
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Design only */}
        <motion.section className="work-grid-section" variants={fade}>
          <span className="work-section-label mono">Design</span>
          <div className="work-grid work-grid--design">
            {designProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={devProjects.length + i} />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
