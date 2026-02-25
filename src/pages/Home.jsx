import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import './Home.css'

const services = [
  {
    num: '01',
    title: 'Product Design',
    body: 'End-to-end product design for iOS and web — from initial concept and wireframes through to polished, ship-ready interfaces that users love.'
  },
  {
    num: '02',
    title: 'Brand Identity',
    body: 'Logo, typography, colour systems, and brand guidelines that give your brand a clear, memorable, and lasting voice.'
  },
  {
    num: '03',
    title: 'Web Design & Development',
    body: 'Editorial websites and web apps built with care — from pixel-perfect Figma files to production-ready React code.'
  },
]

const fade = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function Home() {
  const [openIdx, setOpenIdx]       = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="home">

      {/* ══════════════════════════════════════
          HERO — split: text left + typewriter top-right
      ══════════════════════════════════════ */}
      <section className="hero">
        <div className="hero__left">
          <motion.p className="hero__eyebrow"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            Jittika S. · Phuket, Thailand
          </motion.p>
          <motion.h1 className="hero__headline"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            Where design &amp;<br />craft meet.
          </motion.h1>
          <motion.a href="#intro" className="hero__cta"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}>
            See My Work
          </motion.a>
          <div className="hero__scroll-hint">
            <span>Scroll to explore</span>
            <span className="hero__scroll-line" />
          </div>
        </div>
        <motion.div className="hero__right"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <img src="/typewriter.png" alt="Mint green typewriter" className="hero__img" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 1 — Photo left + Text right
          (West & Co "Planning that feels...")
      ══════════════════════════════════════ */}
      <section className="s-intro" id="intro">
        <motion.div className="s-intro__photo"
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <img src="/typewriter-wide.png" alt="Typewriter overhead" className="s-intro__img" />
        </motion.div>

        <div className="s-intro__copy">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="label">Design Studio</span>
            <h2 className="s-intro__heading">
              Design that feels<br />
              <em>as intentional</em><br />
              as it looks.
            </h2>
            <p className="s-intro__body">
              Jittika S. is a product designer and maker based in Phuket, Thailand — specialising in
              digital products, brand identities, and editorial design. Every project is approached
              with the same obsession: make it feel inevitable.
            </p>
            <p className="s-intro__body">
              I believe great design isn't just about where you look — it's about how it makes
              you feel every step of the way.
            </p>
            <a href="#work" className="underline-link">View My Work</a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — Photo | Services accordion | Photo
          (West & Co "Your trip, tailored to perfection")
      ══════════════════════════════════════ */}
      <section className="s-services" id="work">
        {/* Left photo */}
        <motion.div className="s-services__photo s-services__photo--left"
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <img src="/typewriter-wide.png" alt="" className="s-services__img" />
        </motion.div>

        {/* Centre content */}
        <motion.div className="s-services__content"
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="s-services__heading">
            Your work,<br />crafted to<br />perfection.
          </h2>
          <p className="s-services__sub">
            Every project is unique. I offer a range of services that can be tailored
            to your exact needs and vision:
          </p>

          <div className="accordion">
            {services.map((s, i) => (
              <div key={s.num} className="accordion__item">
                <button
                  className="accordion__trigger"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                >
                  <span className="accordion__num">{s.num}</span>
                  <span className="accordion__title">{s.title}</span>
                  <span className={`accordion__arrow ${openIdx === i ? 'accordion__arrow--open' : ''}`}>↓</span>
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      className="accordion__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{s.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <a href="mailto:hello@jittika.com" className="underline-link" style={{ marginTop: '32px', display: 'inline-block' }}>
            Start a Project
          </a>
        </motion.div>

        {/* Right photo */}
        <motion.div className="s-services__photo s-services__photo--right"
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <img src="/typewriter-grid.png" alt="" className="s-services__img" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — Quote / Testimonial
          (West & Co testimonial carousel)
      ══════════════════════════════════════ */}
      <section className="s-quote">
        <motion.div className="s-quote__inner"
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span className="s-quote__label">Design Philosophy</span>
          <blockquote className="s-quote__text">
            "Good design should feel inevitable — like it couldn't have been done any other way."
          </blockquote>
          <cite className="s-quote__cite">— Jittika S., Phuket</cite>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — "Meet Jittika" photo + panel
          (West & Co "Meet Taylor")
      ══════════════════════════════════════ */}
      <section className="s-about" id="about">
        <motion.div className="s-about__card"
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="s-about__photo">
            <img src="/about.png" alt="Jittika S." className="s-about__img" />
          </div>
          <div className="s-about__panel">
            <span className="label">About</span>
            <h2 className="s-about__heading">
              Meet Jittika:<br />
              your personal<br />
              design expert.
            </h2>
            <p className="s-about__body">
              A Phuket native with a global design perspective, Jittika has spent years building
              her craft across product, brand, and editorial design. Whether it's a polished iOS
              app or a cohesive brand identity, she brings the same care and intentionality to
              every project.
            </p>
            <a href="mailto:hello@jittika.com" className="btn-cta">Get in Touch</a>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          WORK GRID — portfolio projects
      ══════════════════════════════════════ */}
      <section className="s-work" id="projects">
        <div className="s-work__inner">
          <motion.div className="s-work__head"
            variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="label">Selected Work</span>
            <h2 className="s-work__title">Recent Projects</h2>
          </motion.div>

          <div className="s-work__grid">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                className="project-tile"
                style={{ '--c': p.color, '--a': p.accentColor }}
                onClick={() => setSelectedProject(p)}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
              >
                <div className="project-tile__swatch" />
                <div className="project-tile__body">
                  <div className="project-tile__top">
                    <span className="label">{p.type}</span>
                    <span className="project-tile__year">{p.year}</span>
                  </div>
                  <h3 className="project-tile__name">{p.title}</h3>
                  <p className="project-tile__sub">{p.subtitle}</p>
                  <span className="underline-link underline-link--sm">View →</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER — 3 column
      ══════════════════════════════════════ */}
      <footer className="footer">
        <div className="footer__cols">
          <div className="footer__col">
            <p className="footer__col-head">Services</p>
            <a href="#work" className="footer__col-link">Product Design</a>
            <a href="#work" className="footer__col-link">Brand Identity</a>
            <a href="#work" className="footer__col-link">Web Design & Dev</a>
            <a href="#work" className="footer__col-link">Editorial Design</a>
          </div>
          <div className="footer__col footer__col--center">
            <span className="footer__logo">J</span>
            <span className="footer__tagline">Jittika S. · Phuket</span>
          </div>
          <div className="footer__col footer__col--right">
            <p className="footer__col-head">Info</p>
            <a href="mailto:hello@jittika.com" className="footer__col-link">Contact</a>
            <a href="#projects" className="footer__col-link">Work</a>
            <a href="#about" className="footer__col-link">About</a>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__socials">
            <a href="mailto:hello@jittika.com" className="footer__social">hello@jittika.com</a>
          </div>
          <p className="footer__fine">© 2026 Jittika Sakulchit · All rights reserved</p>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
