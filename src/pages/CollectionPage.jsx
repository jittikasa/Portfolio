import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProjectModal from '../components/ProjectModal'
import StampCollection from '../components/StampCollection'
import MonetScene from '../components/monet/MonetScene'
import './CollectionPage.css'

export default function CollectionPage() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="collection-page">
      <MonetScene />
      
      {/* Header */}
      <header className="collection-page__header">
        <Link to="/" className="collection-page__back">
          ← Back to studio
        </Link>
        <h1 className="collection-page__title">Stamp Collection</h1>
        <p className="collection-page__subtitle">
          A complete archive of projects
        </p>
      </header>

      {/* Full Collection */}
      <section className="collection-page__canvas">
        <StampCollection onSelectProject={setSelectedProject} />
      </section>

      {/* Footer */}
      <footer className="collection-page__footer">
        <span>JITTIKA S. © 2024</span>
        <span>•</span>
        <span>PHUKET, THAILAND</span>
      </footer>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
