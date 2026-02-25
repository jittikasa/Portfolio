// Portfolio projects
// Palette: Monet Giverny — sage, water, petal, bloom, canvas

export const projects = [
  {
    id: 'shellist',
    title: 'Shellist',
    subtitle: 'Habit tracking, beautifully done',
    description: 'A minimal iOS app for building better habits. Shellist uses a pearl chain visualization to make your progress feel tangible and satisfying — each completion adds to your growing chain. Features a vision board, analytics heatmap, widget support, and full privacy with on-device storage.',
    type: 'iOS App',
    year: '2024',
    tags: ['iOS', 'Product Design', 'SwiftUI'],
    color: '#D9E4D2',
    accentColor: '#3E5234',
    rotation: -2,
    featured: true,
    links: { appStore: 'https://apps.apple.com/us/app/shellist/id6755242144' },
    images: ['/shellist-screens.webp', '/shellist-screens-2.webp', '/shellist-icon.png']
  },
  {
    id: 'polamoment',
    title: 'PolaMoment',
    subtitle: 'Vintage instant camera for iPhone',
    description: 'Brings the charm of instant Polaroid photography to iOS. Point, shoot, and watch your photo develop with authentic film simulations, vintage filters, and classic Polaroid frames. Built natively for iOS with support for the latest camera features.',
    type: 'iOS App',
    year: '2024',
    tags: ['iOS', 'Photography', 'UI Design'],
    color: '#C5D8E8',
    accentColor: '#5B7A96',
    rotation: 1.5,
    featured: true,
    links: {},
    images: ['/pola-image-1.jpeg', '/pola-image-2.jpeg', '/pola-icon.png']
  },
  {
    id: 'atelier-website',
    title: 'Atelier Lumière',
    subtitle: 'Photography studio website',
    description: 'A sophisticated website for a high-end photography studio. Features immersive galleries, smooth scroll transitions, and an editorial layout that lets the work speak for itself.',
    type: 'Website',
    year: '2024',
    tags: ['Web Design', 'Development', 'GSAP'],
    color: '#EDE4D5',
    accentColor: '#2A1F14',
    rotation: -1,
    featured: false,
    links: {},
    images: []
  },
  {
    id: 'botanica-brand',
    title: 'Botanica',
    subtitle: 'Organic skincare brand identity',
    description: 'Complete brand identity for an organic skincare line — logo, typography system, packaging, and brand guidelines. Rooted in a natural, minimal aesthetic that feels clean and considered.',
    type: 'Branding',
    year: '2024',
    tags: ['Branding', 'Packaging', 'Print'],
    color: '#A8B89A',
    accentColor: '#3E5234',
    rotation: 2.5,
    featured: false,
    links: {},
    images: []
  },
  {
    id: 'nomad-travel',
    title: 'Nomad',
    subtitle: 'Travel planning platform',
    description: 'A web application for building and sharing travel itineraries. Focused on making trip planning feel as good as the trip itself — clean UI, collaborative features, and destination discovery built in.',
    type: 'Web App',
    year: '2023',
    tags: ['Web App', 'UX Design', 'React'],
    color: '#8BAABF',
    accentColor: '#3E5234',
    rotation: -3,
    featured: false,
    links: {},
    images: []
  },
  {
    id: 'muse-editorial',
    title: 'Muse Magazine',
    subtitle: 'Editorial design system',
    description: 'Art direction and editorial design for an independent arts and culture magazine. A flexible system that works across print and digital — generous white space, expressive typography, and a restrained colour palette.',
    type: 'Editorial',
    year: '2023',
    tags: ['Editorial', 'Typography', 'Print'],
    color: '#E8D5C0',
    accentColor: '#7A4F28',
    rotation: 1,
    featured: false,
    links: {},
    images: []
  },
  {
    id: 'harmony-music',
    title: 'Harmony',
    subtitle: 'Music streaming concept',
    description: 'A conceptual redesign of music streaming for discovery and social listening. Built around the idea that finding new music should feel like a shared experience — not an algorithm.',
    type: 'Concept',
    year: '2023',
    tags: ['UI/UX', 'Mobile', 'Concept'],
    color: '#D8C8D8',
    accentColor: '#5A3F6B',
    rotation: -2.5,
    featured: false,
    links: {},
    images: []
  },
  {
    id: 'kinfolk-cafe',
    title: 'Kinfolk Café',
    subtitle: 'Restaurant branding & website',
    description: "Brand identity and website for a specialty coffee shop. Warm and welcoming — a visual identity that reflects the café's community-first values, from logo to menu design to digital presence.",
    type: 'Branding',
    year: '2024',
    tags: ['Branding', 'Web Design', 'Development'],
    color: '#E8E0CF',
    accentColor: '#7A5A28',
    rotation: 2,
    featured: false,
    links: {},
    images: []
  }
]

export const getProjectById = (id) => projects.find(p => p.id === id)
export const getProjectsByType = (type) => projects.filter(p => p.type === type)
export const getFeaturedProjects = () => projects.filter(p => p.featured)
