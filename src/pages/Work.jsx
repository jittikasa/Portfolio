import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer } from '../components/animations'
import ProjectStamp from '../components/ProjectStamp'
import ProjectModal from '../components/ProjectModal'
import GrainOverlay from '../components/GrainOverlay'
import { projects } from '../data/projects'
import './Work.css'

const filters = [
  { id: 'all', label: 'All Works' },
  { id: 'website', label: 'Websites' },
  { id: 'design', label: 'Design' },
  { id: 'app', label: 'Apps' }
]

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(p => p.type === activeFilter)
  }, [activeFilter])
  
  // Featured projects available for future use

  return (
    <div className="work-page">
      <GrainOverlay opacity={0.2} />
      
      <div className="work-page__container">
        {/* Header */}
        <header className="work-page__header">
          <FadeIn>
            <span className="work-page__eyebrow">Collection</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="work-page__title">Stamps</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="work-page__intro">
              A curated collection of my work. Each stamp represents a project 
              crafted with care and attention to detail.
            </p>
          </FadeIn>
        </header>

        {/* Stats */}
        <FadeIn delay={0.3}>
          <div className="work-page__stats">
            <div className="work-page__stat">
              <span className="work-page__stat-number">{projects.length}</span>
              <span className="work-page__stat-label">Projects</span>
            </div>
            <div className="work-page__stat-divider" />
            <div className="work-page__stat">
              <span className="work-page__stat-number">{projects.filter(p => p.type === 'app').length}</span>
              <span className="work-page__stat-label">Apps</span>
            </div>
            <div className="work-page__stat-divider" />
            <div className="work-page__stat">
              <span className="work-page__stat-number">{projects.filter(p => p.type === 'website').length}</span>
              <span className="work-page__stat-label">Websites</span>
            </div>
            <div className="work-page__stat-divider" />
            <div className="work-page__stat">
              <span className="work-page__stat-number">{projects.filter(p => p.type === 'design').length}</span>
              <span className="work-page__stat-label">Designs</span>
            </div>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.35}>
          <div className="work-page__filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`work-page__filter ${activeFilter === filter.id ? 'work-page__filter--active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
                <span className="work-page__filter-count">
                  {filter.id === 'all' 
                    ? projects.length 
                    : projects.filter(p => p.type === filter.id).length
                  }
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Stamps Grid */}
        <div className="work-page__collection">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="work-page__grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectStamp
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={setSelectedProject}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="work-page__empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>No projects found in this category.</p>
          </motion.div>
        )}

        {/* Footer note */}
        <FadeIn delay={0.5}>
          <div className="work-page__note">
            <p>
              Each project is a unique piece of digital craftsmanship. 
              Click on any stamp to explore the details.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
