import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProjectsByCategory } from '../data/projects'
import { PaintFilter } from '../components/HeroClouds'
import './Play.css'

export default function Play() {
  const projects = getProjectsByCategory('play')
  const [activeIndex, setActiveIndex] = useState(0)
  const active = projects[activeIndex]

  // Slightly scaled page-turn feel — scale pulls in as content exits/enters
  const pageContent = {
    initial: { opacity: 0, x: 18, scale: 0.97 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -18, scale: 0.97, transition: { duration: 0.26 } }
  }

  return (
    <div className="play-canvas">
      <PaintFilter />

      <div className="binder-container">

        {/* Pages — clipped to rounded corners */}
        <div className="binder-pages">
          <div className="binder-frame">

            {/* Left Page: Info */}
            <div className="binder-page binder-page--left">
              <div className="binder-holes">
                {[...Array(6)].map((_, i) => <div key={i} className="hole" />)}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${active.id}`}
                  className="binder-content"
                  variants={pageContent}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="binder-header">
                    <span className="binder-eyebrow mono">{activeIndex + 1} / {projects.length}</span>
                    <h1 className="binder-title">{active.title}</h1>
                    <p className="binder-subtitle serif-italic">{active.subtitle}</p>
                  </div>

                  <div className="binder-body">
                    <p className="binder-desc">{active.description}</p>

                    <div className="binder-tags">
                      {active.tags.map(t => <span key={t} className="tag mono">{t}</span>)}
                      <span className="tag mono">{active.year}</span>
                    </div>

                    {active.links && Object.keys(active.links).length > 0 && (
                      <div className="binder-links">
                        {Object.entries(active.links).map(([key, url]) => (
                          <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="binder-link mono">
                            {key} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Spine / Fold */}
            <div className="binder-spine" />

            {/* Right Page: Visuals */}
            <div className="binder-page binder-page--right" style={{ '--project-color': active.color }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${active.id}`}
                  className="binder-visual-container"
                  variants={pageContent}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="scrapbook-gallery">
                    {active.images.slice(0, 2).map((img, i) => (
                      <div key={i} className={`scrapbook-item scrapbook-item--${i === 0 ? 'primary' : 'secondary'}`}>
                        <motion.div
                          className="scrapbook-inner"
                          initial={{ opacity: 0, scale: 0.88, y: 12 }}
                          animate={{ opacity: 1, scale: 1, y: 0, rotate: i === 0 ? -1.5 : 3.5 }}
                          whileHover={{
                            y: -7,
                            rotate: i === 0 ? -2.5 : 4.5,
                            transition: { duration: 0.32, ease: 'easeOut', delay: 0 }
                          }}
                          transition={{ delay: i * 0.2 + 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <img src={img} alt={`${active.title} ${i + 1}`} />
                          <div className="tape" />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Tabs — outer div handles absolute positioning, inner motion.div handles entrance */}
        <div className="binder-tabs">
          <motion.div
            className="binder-tabs-inner"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {projects.map((p, i) => (
              <button
                key={p.id}
                className={`binder-tab ${activeIndex === i ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(i)}
                style={{ '--tab-color': p.color }}
              >
                <span className="tab-label mono">{p.title}</span>
              </button>
            ))}
          </motion.div>
        </div>

      </div>

      <div className="play-bg-text mono">Digital Collection / Vol. 2024</div>
    </div>
  )
}
