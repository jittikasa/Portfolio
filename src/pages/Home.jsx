import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import HeroScene from '../components/HeroScene'
import SignatureName from '../components/SignatureName'
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
    { title: "Product Design", icon: "◈" },
    { title: "Brand Identity", icon: "✧" },
    { title: "Web Development", icon: "◌" }
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            >
              Designer and maker based in Phuket, Thailand. I build website, iOS apps, craft brand identities, and design digital experiences — with an eye for detail and a soft spot for things that feel considered.
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <a href="#projects" className="monet-btn">See My Work</a>
            </motion.div>
          </div>
        </div>
      </section>

{/* ── 3. BRUSHSTROKE SERVICES ── */}
      <section className="h-services" id="work">
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
                onMouseEnter={() => setActiveService(i)}
                initial="hidden"
                whileInView="show"
                variants={fade}
              >
                <span className="stroke-icon">{s.icon}</span>
                <span className="stroke-title">{s.title}</span>
                <div className="stroke-wash"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ── 5. FLOATING PORTFOLIO ── */}
      <section className="h-work" id="projects">
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
