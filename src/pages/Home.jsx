import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import HeroScene from '../components/HeroScene'
import SignatureName from '../components/SignatureName'
import { Cloud } from '../components/HeroClouds'
import { getProjectsByService } from '../data/projects'
import './Home.css'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

const mist = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.0, ease: "easeOut" } }
}

const vh = typeof window !== 'undefined' ? window.innerHeight : 800

function HeroStatus({ scrollY }) {
  const opacity = useTransform(scrollY, [vh * 1.2, vh * 1.55], [1, 0])
  return (
    <motion.div
      className="hero-status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.0 }}
      style={{ opacity }}
    >
      Phuket, TH&nbsp;&nbsp;|&nbsp;&nbsp;<span className="status-dot">●</span> Open to projects
    </motion.div>
  )
}

function HeroInner({ scrollY, children }) {
  const opacity = useTransform(scrollY, [vh * 1.2, vh * 1.55], [1, 0])
  return (
    <motion.div className="h-hero-inner" style={{ opacity }}>
      {children}
    </motion.div>
  )
}

function HeroBio({ children }) {
  return (
    <motion.div className="h-hero-inner h-hero-bio-persist">
      <div className="hero-bio">
        {children}
      </div>
    </motion.div>
  )
}

function BioLine({ children, scrollY, at }) {
  const opacity = useTransform(scrollY, [vh * at, vh * (at + 0.35)], [0, 1])
  return (
    <motion.span style={{ opacity, display: 'block' }}>
      {children}
    </motion.span>
  )
}

export default function Home() {
  const { scrollY } = useScroll()

  const services = [
    {
      title: "Product Design",
      icon: "◈",
      key: "product-design",
      link: "/work",
      description: "UX, UI, and strategy for digital products. Turning messy problems into interfaces that feel obvious — from early concepts to polished screens ready to build."
    },
    {
      title: "App Development",
      icon: "◎",
      key: "app-dev",
      link: "/play",
      description: "iOS apps I build mostly for the fun of it — because an idea won't leave me alone until I see it exist. Native Swift, obsessively tweaked, and made for how people actually use their phones."
    },
    {
      title: "Web Development",
      icon: "✧",
      key: "web-dev",
      link: "/work",
      description: "Hand-built in React or WordPress — custom themes, plugins, and everything in between. Fast, accessible, and faithful to the design."
    }
  ]

  return (
    <div className="home-canvas">
      
      {/* ── 1. HERO ── */}
      <section className="h-hero">
        <div className="h-hero-sticky">
          <HeroScene />
          <HeroStatus scrollY={scrollY} />

          <HeroInner scrollY={scrollY}>
            <motion.p
              className="hero-tagline"
              initial={{ clipPath: 'inset(-20% 100% -20% -5%)', opacity: 0 }}
              animate={{ clipPath: 'inset(-20% -5% -20% -5%)', opacity: 1 }}
              transition={{ duration: 2.0, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              Designer &amp; maker
            </motion.p>
          </HeroInner>

          {/* Bio persists after reveal but fades before next section */}
          <HeroBio>
              <motion.span
                style={{ display: 'block' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                Hi I'm Jittika.
              </motion.span>
              <BioLine scrollY={scrollY} at={0.3}>
                Just someone who can't stop making things — websites, apps, brand work, and paintings on free afternoons.
              </BioLine>
              <BioLine scrollY={scrollY} at={0.5}>
                This is where I keep some of them.
              </BioLine>
              <BioLine scrollY={scrollY} at={0.65}>
                Full-time in digital marketing,
              </BioLine>
              <BioLine scrollY={scrollY} at={0.75}>
                making things and designing on the side.
              </BioLine>
          </HeroBio>

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
                className="service-stroke"
                initial="hidden"
                whileInView="show"
                variants={fade}
              >
                <div className="stroke-header">
                  <span className="stroke-icon">{s.icon}</span>
                  <span className="stroke-title">{s.title}</span>
                </div>
                
                <div className="stroke-content">
                  <p className="stroke-description">
                    {s.description}
                  </p>
                  <div className="stroke-projects">
                    {getProjectsByService(s.key).slice(0, 3).map(p => {
                      const pillTo = p.category === 'play' ? `/play?app=${p.id}`
                        : p.subcategory === 'dev' ? `/work/${p.id}`
                        : '/work'
                      return (
                        <Link
                          key={p.id}
                          to={pillTo}
                          className="stroke-project-pill"
                        >
                          <span className="pill-dot" style={{ background: p.accentColor }} />
                          {p.title}
                        </Link>
                      )
                    })}
                    <Link
                      to={s.link}
                      className="stroke-see-all"
                    >
                      See all →
                    </Link>
                  </div>
                </div>
                <div className="stroke-wash"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
