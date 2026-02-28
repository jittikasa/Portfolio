// Portfolio projects
// Palette: Monet Giverny — sage, water, petal, bloom, canvas

export const projects = [
  {
    category: 'play',
    id: 'shellist',
    title: 'Shellist',
    subtitle: 'Track habits beautifully',
    description: 'Connect habits to dreams through integrated vision boards. Pearl-themed ocean-inspired interface with streak tracking that makes your progress feel tangible — no subscriptions, no third-party analytics.',
    type: 'iOS App',
    year: '2024',
    tags: ['iOS', 'SwiftUI'],
    color: '#D9E4D2',
    accentColor: '#3E5234',
    rotation: -2,
    featured: true,
    links: { appStore: 'https://apps.apple.com/us/app/shellist/id6755242144' },
    images: ['/shellist-screens.webp', '/shellist-screens-2.webp', '/shellist-icon.png'],
    features: [
      'Vision boards that link to your habits',
      'Daily, weekly & monthly tracking views',
      'Pearl chain streak visualization',
      'Lunar & pearl home screen widgets',
      'iCloud sync across all devices',
      'Swipe gestures for quick completion',
      'Calendar view showing progress'
    ],
    details: {
      price: '$4.99 · One-time purchase',
      privacy: '100% private — data stays on-device & personal iCloud',
      platform: 'iOS 17+'
    }
  },
  {
    category: 'play',
    id: 'polamoment',
    title: 'PolaMoment',
    subtitle: 'Vintage instant camera for iPhone',
    description: 'Point, shoot, and watch your photo develop with authentic film simulations. Brings the charm of instant Polaroid photography to iOS with vintage filters and classic frames.',
    type: 'iOS App',
    year: '2024',
    tags: ['iOS', 'Photography'],
    color: '#C5D8E8',
    accentColor: '#5B7A96',
    rotation: 1.5,
    featured: true,
    links: {},
    images: ['/pola-image-1.jpeg', '/pola-image-2.jpeg', '/pola-icon.png'],
    features: [
      'Authentic film development animation',
      'Multiple vintage filter presets',
      'Classic Polaroid frame styles',
      'Native iOS camera integration',
      'Photo library import support',
      'Share directly to social media'
    ],
    details: {
      price: 'Coming soon',
      platform: 'iOS 17+'
    }
  },
]

export const getProjectById = (id) => projects.find(p => p.id === id)
export const getProjectsByType = (type) => projects.filter(p => p.type === type)
export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getProjectsByCategory = (category) => projects.filter(p => p.category === category)
