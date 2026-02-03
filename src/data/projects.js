// Portfolio projects - each represented as a stamp
// Types: 'website' | 'design' | 'app'

export const projects = [
  {
    id: 'shellist',
    title: 'Shellist',
    subtitle: 'Minimal habit tracking',
    description: 'A beautifully minimal iOS app for tracking daily habits. Designed with simplicity in mind, Shellist helps users build better routines without overwhelming them with features.',
    type: 'app',
    year: '2024',
    tags: ['iOS', 'Product Design', 'SwiftUI'],
    color: '#E8D5C4',
    accentColor: '#C45C3E',
    rotation: -2,
    featured: true,
    links: {
      appStore: '#',
      caseStudy: '#'
    },
    images: []
  },
  {
    id: 'polamoment',
    title: 'PolaMoment',
    subtitle: 'Vintage instant camera',
    description: 'A nostalgic camera app that brings the charm of Polaroid photography to iOS. Features realistic film simulations, development timers, and a beautiful vintage interface.',
    type: 'app',
    year: '2023',
    tags: ['iOS', 'Photography', 'UI Design'],
    color: '#D4E5E0',
    accentColor: '#2C5F5D',
    rotation: 1.5,
    featured: true,
    links: {
      appStore: '#',
      caseStudy: '#'
    },
    images: []
  },
  {
    id: 'atelier-website',
    title: 'Atelier Lumière',
    subtitle: 'Photography studio website',
    description: 'A sophisticated website for a high-end photography studio. Features immersive galleries, smooth transitions, and an editorial layout that lets the work speak for itself.',
    type: 'website',
    year: '2024',
    tags: ['Web Design', 'Development', 'GSAP'],
    color: '#F5F0E6',
    accentColor: '#1a1a1a',
    rotation: -1,
    featured: false,
    links: {
      live: '#',
      caseStudy: '#'
    },
    images: []
  },
  {
    id: 'botanica-brand',
    title: 'Botanica',
    subtitle: 'Organic skincare brand',
    description: 'Complete brand identity for an organic skincare line. Includes logo design, packaging, typography system, and brand guidelines.',
    type: 'design',
    year: '2024',
    tags: ['Branding', 'Packaging', 'Print'],
    color: '#E8E0D5',
    accentColor: '#4A6741',
    rotation: 2.5,
    featured: false,
    links: {
      caseStudy: '#'
    },
    images: []
  },
  {
    id: 'nomad-travel',
    title: 'Nomad',
    subtitle: 'Travel planning platform',
    description: 'A comprehensive travel planning web application. Users can discover destinations, create itineraries, and collaborate with fellow travelers.',
    type: 'website',
    year: '2023',
    tags: ['Web App', 'UX Design', 'React'],
    color: '#DDE5F0',
    accentColor: '#3D5A80',
    rotation: -3,
    featured: false,
    links: {
      live: '#',
      caseStudy: '#'
    },
    images: []
  },
  {
    id: 'muse-editorial',
    title: 'Muse Magazine',
    subtitle: 'Editorial design system',
    description: 'Art direction and editorial design for an independent arts and culture magazine. Created a flexible design system for print and digital editions.',
    type: 'design',
    year: '2023',
    tags: ['Editorial', 'Typography', 'Print'],
    color: '#F0E8E0',
    accentColor: '#8B4513',
    rotation: 1,
    featured: false,
    links: {
      caseStudy: '#'
    },
    images: []
  },
  {
    id: 'harmony-music',
    title: 'Harmony',
    subtitle: 'Music streaming app',
    description: 'Conceptual design for a music streaming application focused on discovery and social listening. Features innovative interaction patterns and a bold visual identity.',
    type: 'app',
    year: '2023',
    tags: ['UI/UX', 'Mobile', 'Concept'],
    color: '#E5D4E0',
    accentColor: '#6B3A6B',
    rotation: -2.5,
    featured: false,
    links: {
      caseStudy: '#',
      prototype: '#'
    },
    images: []
  },
  {
    id: 'kinfolk-cafe',
    title: 'Kinfolk Café',
    subtitle: 'Restaurant website & branding',
    description: 'Brand identity and website for a specialty coffee shop. Warm, welcoming aesthetic that reflects the café\'s community-focused values.',
    type: 'website',
    year: '2024',
    tags: ['Branding', 'Web Design', 'Development'],
    color: '#EDE5D8',
    accentColor: '#8B6914',
    rotation: 2,
    featured: false,
    links: {
      live: '#',
      caseStudy: '#'
    },
    images: []
  }
]

export const getProjectById = (id) => projects.find(p => p.id === id)
export const getProjectsByType = (type) => projects.filter(p => p.type === type)
export const getFeaturedProjects = () => projects.filter(p => p.featured)
