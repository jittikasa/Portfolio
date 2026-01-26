'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Typewriter from '@/components/Typewriter'
import NavDots from '@/components/NavDots'

// Section quotes that appear on the typewriter
const sectionQuotes: Record<string, string> = {
  hero: "Every pixel tells a story...\n\nWelcome to my corner\nof the internet.",
  about: "Design is not just\nwhat it looks like.\n\nDesign is how\nit works.",
  projects: "Code is poetry.\n\nEach project is\na new verse.",
  skills: "The details are not\nthe details.\n\nThey make the design.",
  blog: "Writing clarifies\nthinking.\n\nSharing multiplies it.",
  contact: "Let's create\nsomething beautiful\ntogether...",
}

const sections = ['hero', 'about', 'projects', 'skills', 'blog', 'contact']

// Project data
const apps = [
  {
    name: 'Shellist',
    tagline: 'Build habits like pearls',
    description: 'A mindful habit tracker with beautiful visualizations. Transform your life one habit at a time.',
    link: 'https://islanderstudio.app/shellist',
    color: '#4D7C5E',
  },
  {
    name: 'PolaMoment',
    tagline: 'Capture vintage memories',
    description: 'Transform everyday photos into timeless Polaroid-style memories with authentic filters.',
    link: 'https://islanderstudio.app/polamoment',
    color: '#C45C3E',
  },
]

const websites = [
  {
    name: 'Coming Soon',
    tagline: 'Web projects in progress',
    description: 'New website projects will be showcased here. Stay tuned for updates.',
    link: '#',
    color: '#8C8C8C',
  },
]

const skills = [
  { name: 'UI/UX Design', items: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'] },
  { name: 'Branding', items: ['Visual Identity', 'Logo Design', 'Brand Strategy', 'Style Guides'] },
  { name: 'Motion Design', items: ['Micro-interactions', 'UI Animations', 'Transitions', 'Prototypes'] },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    setIsLoaded(true)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track scroll position to update active section
  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const handleScroll = () => {
      const scrollPosition = content.scrollTop + 200

      for (const section of sections) {
        const element = sectionRefs.current[section]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    content.addEventListener('scroll', handleScroll, { passive: true })
    return () => content.removeEventListener('scroll', handleScroll)
  }, [])

  const navigateToSection = useCallback((section: string) => {
    const element = sectionRefs.current[section]
    if (element && contentRef.current) {
      contentRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [])

  const setSectionRef = useCallback((section: string) => (el: HTMLElement | null) => {
    sectionRefs.current[section] = el
  }, [])

  // Mobile layout: Typewriter hero then content
  if (isMobile) {
    return (
      <main className="min-h-screen">
        {/* Mobile Typewriter Hero */}
        <section className="h-screen flex flex-col items-center justify-center p-8 bg-[var(--cream)]">
          <div className="w-full max-w-sm">
            <Typewriter text={sectionQuotes[activeSection]} />
          </div>
          <button
            onClick={() => {
              document.getElementById('mobile-content')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="mt-8 flex flex-col items-center gap-2 text-[var(--ink-light)]"
          >
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-body)' }}>
              Scroll to explore
            </span>
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* Mobile Content */}
        <div id="mobile-content">
          <MobileContent />
        </div>
      </main>
    )
  }

  // Desktop layout: Split screen
  return (
    <main className="h-screen flex">
      {/* Left: Typewriter (Fixed) */}
      <div className="w-1/2 h-full flex items-center justify-center bg-[var(--cream)] border-r border-[var(--paper-dark)]">
        <div className={`w-full max-w-md px-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <Typewriter text={sectionQuotes[activeSection]} />
        </div>
      </div>

      {/* Right: Scrollable Content */}
      <div
        ref={contentRef}
        className="w-1/2 h-full overflow-y-auto scroll-panel bg-[var(--paper)]"
      >
        {/* Hero Section */}
        <section
          ref={setSectionRef('hero')}
          id="hero"
          className="min-h-screen flex flex-col justify-center px-12 py-20"
        >
          <div className={`space-y-6 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <p className="text-sm uppercase tracking-widest text-[var(--ink-light)]" style={{ fontFamily: 'var(--font-body)' }}>
              Creative Developer & Designer
            </p>
            <h1 className="editorial-heading text-5xl md:text-6xl text-[var(--ink)]">
              Hi, I'm Jittika
            </h1>
            <p className="editorial-subhead text-2xl text-[var(--ink-soft)]">
              I craft thoughtful digital experiences
            </p>
            <p className="text-lg text-[var(--ink-soft)] max-w-md leading-relaxed">
              I design and build iOS apps and websites that feel personal.
              Every project is an opportunity to create something meaningful.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigateToSection('projects')}
                className="px-6 py-3 bg-[var(--ink)] text-[var(--cream)] text-sm font-medium hover:bg-[var(--ink-soft)] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                View my work
              </button>
              <button
                onClick={() => navigateToSection('contact')}
                className="px-6 py-3 border-2 border-[var(--ink)] text-[var(--ink)] text-sm font-medium hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Get in touch
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          ref={setSectionRef('about')}
          id="about"
          className="min-h-screen px-12 py-20"
        >
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-body)' }}>
                About
              </p>
              <h2 className="editorial-heading text-4xl mt-2 text-[var(--ink)]">
                Designer who codes,<br />developer who designs
              </h2>
            </div>

            <div className="grid gap-8">
              {/* Photo placeholder */}
              <div className="aspect-square max-w-xs bg-[var(--paper-dark)] rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-[var(--ink-light)] opacity-30" />
                  <p className="mt-4 text-sm text-[var(--ink-light)] italic" style={{ fontFamily: 'var(--font-body)' }}>
                    Photo coming soon
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-[var(--ink-soft)] leading-relaxed">
                <p>
                  I'm a creative developer based in Thailand with a passion for crafting
                  digital experiences that feel both beautiful and intuitive.
                </p>
                <p>
                  My work sits at the intersection of design and development—I believe
                  the best products come from understanding both the pixels and the code
                  behind them.
                </p>
                <p>
                  When I'm not building apps, you'll find me exploring photography,
                  reading about design systems, or hunting for the perfect coffee spot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={setSectionRef('projects')}
          id="projects"
          className="min-h-screen px-12 py-20"
        >
          <div className="space-y-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-body)' }}>
                Projects
              </p>
              <h2 className="editorial-heading text-4xl mt-2 text-[var(--ink)]">
                Things I've built
              </h2>
            </div>

            {/* Apps */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-[var(--ink-light)] mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                Apps
              </h3>
              <div className="space-y-6">
                {apps.map((app) => (
                  <ProjectCard key={app.name} project={app} />
                ))}
              </div>
            </div>

            {/* Websites */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-[var(--ink-light)] mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                Websites
              </h3>
              <div className="space-y-6">
                {websites.map((site) => (
                  <ProjectCard key={site.name} project={site} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          ref={setSectionRef('skills')}
          id="skills"
          className="min-h-screen px-12 py-20"
        >
          <div className="space-y-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-body)' }}>
                Skills
              </p>
              <h2 className="editorial-heading text-4xl mt-2 text-[var(--ink)]">
                What I do
              </h2>
            </div>

            <div className="space-y-10">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <h3 className="editorial-heading text-xl text-[var(--ink)] mb-4">
                    {skill.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 bg-[var(--cream)] text-[var(--ink-soft)] text-sm rounded-full border border-[var(--paper-dark)]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section
          ref={setSectionRef('blog')}
          id="blog"
          className="min-h-screen px-12 py-20"
        >
          <div className="space-y-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-body)' }}>
                Blog
              </p>
              <h2 className="editorial-heading text-4xl mt-2 text-[var(--ink)]">
                Thoughts & Writing
              </h2>
              <p className="mt-4 text-[var(--ink-soft)]">
                Articles about app development, design, and ASO (App Store Optimization).
              </p>
            </div>

            {/* Blog placeholder */}
            <div className="bg-[var(--cream)] rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--paper-dark)] flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--ink-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="editorial-heading text-xl text-[var(--ink)] mb-2">
                Blog Coming Soon
              </h3>
              <p className="text-[var(--ink-soft)] text-sm">
                I'm working on articles about app marketing, ASO strategies, and design process.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={setSectionRef('contact')}
          id="contact"
          className="min-h-screen px-12 py-20"
        >
          <div className="space-y-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-body)' }}>
                Contact
              </p>
              <h2 className="editorial-heading text-4xl mt-2 text-[var(--ink)]">
                Let's work together
              </h2>
              <p className="mt-4 text-[var(--ink-soft)] max-w-md">
                Have a project in mind? Want to collaborate? Or just want to say hello?
                I'd love to hear from you.
              </p>
            </div>

            {/* Contact Form */}
            <form className="space-y-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--ink)] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--paper-dark)] rounded-lg focus:border-[var(--accent)] focus:ring-0 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--ink)] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--paper-dark)] rounded-lg focus:border-[var(--accent)] focus:ring-0 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--ink)] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--paper-dark)] rounded-lg focus:border-[var(--accent)] focus:ring-0 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[var(--accent)] text-white font-medium rounded-lg hover:bg-[var(--accent-soft)] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Send Message
              </button>
            </form>

            {/* Alternative contact */}
            <div className="pt-8 border-t border-[var(--paper-dark)]">
              <p className="text-sm text-[var(--ink-light)] mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                Or reach out directly:
              </p>
              <a
                href="mailto:hello@jittika.com"
                className="inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@jittika.com
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-12 py-8 border-t border-[var(--paper-dark)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--ink-light)]" style={{ fontFamily: 'var(--font-body)' }}>
            <p>© {new Date().getFullYear()} Jittika. All rights reserved.</p>
            <p>Made with care in Thailand</p>
          </div>
        </footer>
      </div>

      {/* Navigation Dots */}
      <NavDots
        sections={sections}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />
    </main>
  )
}

// Project Card Component
function ProjectCard({ project }: { project: { name: string; tagline: string; description: string; link: string; color: string } }) {
  return (
    <a
      href={project.link}
      target={project.link !== '#' ? '_blank' : undefined}
      rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
      className="block group"
    >
      <div className="p-6 bg-[var(--cream)] rounded-lg border border-[var(--paper-dark)] hover-lift">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          {project.link !== '#' && (
            <svg className="w-4 h-4 text-[var(--ink-light)] group-hover:text-[var(--ink)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </div>
        <h4 className="editorial-heading text-xl text-[var(--ink)] mb-1">
          {project.name}
        </h4>
        <p className="editorial-subhead text-[var(--accent)] mb-3">
          {project.tagline}
        </p>
        <p className="text-sm text-[var(--ink-soft)]">
          {project.description}
        </p>
      </div>
    </a>
  )
}

// Mobile Content Component
function MobileContent() {
  return (
    <div className="bg-[var(--paper)]">
      {/* Hero */}
      <section className="px-6 py-16">
        <p className="text-sm uppercase tracking-widest text-[var(--ink-light)]" style={{ fontFamily: 'var(--font-body)' }}>
          Creative Developer & Designer
        </p>
        <h1 className="editorial-heading text-4xl mt-2 text-[var(--ink)]">
          Hi, I'm Jittika
        </h1>
        <p className="editorial-subhead text-xl text-[var(--ink-soft)] mt-2">
          I craft thoughtful digital experiences
        </p>
      </section>

      {/* About */}
      <section className="px-6 py-16 bg-[var(--cream)]">
        <p className="text-sm uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-body)' }}>
          About
        </p>
        <h2 className="editorial-heading text-3xl mt-2 text-[var(--ink)]">
          Designer who codes
        </h2>
        <p className="mt-4 text-[var(--ink-soft)]">
          I'm a creative developer based in Thailand with a passion for crafting
          digital experiences that feel both beautiful and intuitive.
        </p>
      </section>

      {/* Projects */}
      <section className="px-6 py-16">
        <p className="text-sm uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-body)' }}>
          Projects
        </p>
        <h2 className="editorial-heading text-3xl mt-2 mb-8 text-[var(--ink)]">
          Things I've built
        </h2>
        <div className="space-y-4">
          {apps.map((app) => (
            <ProjectCard key={app.name} project={app} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-16 bg-[var(--cream)]">
        <p className="text-sm uppercase tracking-widest text-[var(--accent)]" style={{ fontFamily: 'var(--font-body)' }}>
          Contact
        </p>
        <h2 className="editorial-heading text-3xl mt-2 text-[var(--ink)]">
          Let's connect
        </h2>
        <a
          href="mailto:hello@jittika.com"
          className="inline-flex items-center gap-2 mt-4 text-[var(--ink)] hover:text-[var(--accent)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          hello@jittika.com
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-sm text-[var(--ink-light)]" style={{ fontFamily: 'var(--font-body)' }}>
        <p>© {new Date().getFullYear()} Jittika. Made with care in Thailand</p>
      </footer>
    </div>
  )
}
