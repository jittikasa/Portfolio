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
                    </div>

                    {active.features && active.features.length > 0 && (
                      <div className="binder-section">
                        <h3 className="binder-section-title mono">Features</h3>
                        <ul className="binder-features">
                          {active.features.map(f => <li key={f}>{f}</li>)}
                        </ul>
                      </div>
                    )}

                    {active.details && (
                      <div className="binder-section">
                        <h3 className="binder-section-title mono">Details</h3>
                        <div className="binder-details">
                          {Object.entries(active.details).map(([key, val]) => (
                            <div key={key} className="binder-detail-row">
                              <span className="binder-detail-label mono">{key}</span>
                              <span className="binder-detail-value">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {active.links && active.links.appStore && (
                      <a href={active.links.appStore} target="_blank" rel="noopener noreferrer" className="binder-app-store-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                        <span>App Store</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center gutter — overlapping shadow layers */}
            <div className="binder-gutter" aria-hidden="true" />

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
                  <div className="binder-image-wrap">
                    <motion.img
                      src={active.images[0]}
                      alt={active.title}
                      className="binder-hero-image"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Tabs — anchored to the right paper edge */}
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

      </div>

    </div>
  )
}
