import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectModal from '../components/ProjectModal'
import InteractiveTypewriter from '../components/InteractiveTypewriter'
import './Home.css'

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="home">
      {/* Hero - Full Page Interactive Experience */}
      <section className="hero-full">
        <div className="hero-full__container">
          {/* Left: Narrative */}
          <div className="hero-full__narrative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero-full__eyebrow">jittika / digital studio</span>
              <h1 className="hero-full__title">
                Type a letter.<br/>
                Stamp it with<br/>
                <em>your story.</em>
              </h1>
              <p className="hero-full__description">
                Create a message, then drag stamps to mark it. 
                Each stamp opens a project from my collection.
              </p>
            </motion.div>
          </div>

          {/* Right: Interactive Typewriter - 15% bigger */}
          <motion.div 
            className="hero-full__typewriter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InteractiveTypewriter onSelectProject={setSelectedProject} />
          </motion.div>
        </div>

        {/* Footer within hero */}
        <div className="hero-full__footer">
          <span>JITTIKA S. © 2024</span>
          <span className="hero-full__divider">•</span>
          <span>PHUKET, THAILAND</span>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
