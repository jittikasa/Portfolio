import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import HeroScene from '../components/HeroScene'
import SignatureName from '../components/SignatureName'
import { Cloud } from '../components/HeroClouds'
import './Home.css'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

const mist = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.0, ease: "easeOut" } }
}


const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      title: "Product Design",
      icon: "◈",
      description: "From iOS apps to digital platforms — I design experiences that are easy to use and hard to forget. Strategy, UX, and UI as one continuous thought."
    },
    {
      title: "Brand Identity",
      icon: "✧",
      description: "Visual systems that give brands a distinct voice. Logo, typography, colour, and every touchpoint that carries meaning — built to last."
    },
    {
      title: "Web Development",
      icon: "◌",
      description: "Hand-built in React. Fast, accessible, and faithful to the design — because a great idea deserves to be executed properly."
    }
  ]

  return (
    <div className="home-canvas">
      
      {/* ── 1. HERO ── */}
      <section className="h-hero">
        <div className="h-hero-sticky">
          <HeroScene />
          <div className="h-hero-inner">
            <motion.p
              className="hero-tagline"
              initial={{ clipPath: 'inset(-20% 100% -20% -5%)', opacity: 0 }}
              animate={{ clipPath: 'inset(-20% -5% -20% -5%)', opacity: 0.7 }}
              transition={{ duration: 2.0, delay: 3.2, ease: [0.4, 0, 0.2, 1] }}
            >
              Designer &amp; maker
            </motion.p>

            <motion.p
              className="hero-bio"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 5.2 }}
            >
              I build websites, iOS apps, brand identities — and anything that deserves to feel considered.
            </motion.p>

          </div>
        </div>
      </section>

{/* ── 3. BRUSHSTROKE SERVICES ── */}
      <section className="h-services" id="work">
        {/* Ambient clouds floating in/around the section */}
        <div className="services-clouds" aria-hidden="true">
          <Cloud className="sz-md" variant="c" filter="cloud-paint-soft"  style={{ top: '-4%',  left: '-8%'  }} />
          <Cloud className="sz-sm" variant="a" filter="cloud-paint-wispy" style={{ top: '5%',   left: '72%'  }} />
          <Cloud className="sz-xs" variant="b" filter="cloud-paint-wispy" style={{ top: '30%',  left: '-2%'  }} />
          <Cloud className="sz-sm" variant="d" filter="cloud-paint-soft"  style={{ top: '55%',  left: '80%'  }} />
          <Cloud className="sz-xs" variant="c" filter="cloud-paint-wispy" style={{ top: '70%',  left: '10%'  }} />
          <Cloud className="sz-xs" variant="a" filter="cloud-paint-wispy" style={{ top: '85%',  left: '60%'  }} />
          <Cloud className="sz-xs" variant="d" filter="cloud-paint"      style={{ top: '-2%',  left: '88%'  }} />
        </div>
        <div className="services-layers">
          <motion.h2 
            className="section-title-center"
            initial="hidden"
            whileInView="show"
            variants={mist}
          >
            My Atelier
          </motion.h2>

          <div className="services-floating-list">
            {services.map((s, i) => (
              <motion.div
                key={i}
                className={`service-stroke ${activeService === i ? 'active' : ''}`}
                onClick={() => setActiveService(activeService === i ? null : i)}
                initial="hidden"
                whileInView="show"
                variants={fade}
              >
                <div className="stroke-header">
                  <span className="stroke-icon">{s.icon}</span>
                  <span className="stroke-title">{s.title}</span>
                  <span className="stroke-toggle">{activeService === i ? '−' : '+'}</span>
                </div>
                <AnimatePresence>
                  {activeService === i && (
                    <motion.p
                      className="stroke-description"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {s.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="stroke-wash"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ── 5. FLOATING PORTFOLIO ── hidden until more projects ready */}
      <section className="h-work" id="projects" style={{ display: 'none' }}>
        <div className="work-canvas">
          <motion.h2 variants={mist} initial="hidden" whileInView="show" className="work-title">Selected Works</motion.h2>
          
          <div className="monet-grid">
            {projects.map((p) => (
              <motion.div 
                key={p.id}
                className="monet-tile"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                onClick={() => setSelectedProject(p)}
              >
                <div className="tile-wash-wrapper">
                  <div className="tile-wash" style={{ '--c': p.color, '--a': p.accentColor }}></div>
                  <div className="tile-content-float">
                    <span className="tile-year mono">{p.year}</span>
                    <h3 className="tile-title">{p.title}</h3>
                    <p className="tile-type mono">{p.type}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

    </div>
  )
}
