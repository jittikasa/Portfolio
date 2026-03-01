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
    tags: ['iOS', 'Habit Tracker', 'Widgets', 'iCloud Sync'],
    color: '#D9E4D2',
    accentColor: '#3E5234',
    rotation: -2,
    services: ['app-dev', 'product-design'],
    featured: true,
    links: {
      appStore: 'https://apps.apple.com/us/app/shellist/id6755242144',
      support: '/support'
    },
    images: ['/play/shellist/screens-1.webp', '/play/shellist/screens-2.webp', '/play/shellist/icon.png'],
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
    tags: ['iOS', 'Instant Camera', 'Film Filters'],
    color: '#C5D8E8',
    accentColor: '#5B7A96',
    rotation: 1.5,
    services: ['app-dev', 'product-design'],
    featured: true,
    links: { support: '/support' },
    images: ['/play/polamoment/icon.png'],
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
  // ── Work: Dev + Design (full case studies) ──
  {
    category: 'work',
    subcategory: 'dev',
    id: 'dinipetty',
    title: 'Dini Petty',
    subtitle: 'Archive & licensing platform for a Canadian television icon',
    type: 'Web Platform',
    year: '2024',
    role: 'Full-Stack Developer',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'REST API', 'Custom Plugins'],
    color: '#37351E',
    accentColor: '#8BAABF',
    services: ['web-dev'],
    featured: true,
    links: { live: 'https://dinipetty.com' },
    images: [
      '/work/dinipetty/screencapture-dinipetty-2026-03-01-08_21_00.png',
      '/work/dinipetty/screencapture-dinipetty-the-dini-petty-show-media-licensing-2026-03-01-08_21_34.png',
      '/work/dinipetty/screencapture-dinipetty-booking-2026-03-01-08_21_19.png',
      '/work/dinipetty/screencapture-dinipetty-product-britney-spears-jeanne-cooper-sandraa-shamas-more-2026-03-01-08_21_53.png',
      '/work/dinipetty/screencapture-dinipetty-elmore-leonard-writing-without-an-outline-why-characters-must-talk-2026-03-01-08_22_26.png'
    ],
    overview: 'Built a custom WordPress/WooCommerce platform to organize, surface, and license historical TV content from The Dini Petty Show. The system turns WooCommerce products into searchable archive entries with a quote-based licensing workflow — no traditional e-commerce checkout, no payment gateway.',
    systemOverview: {
      title: '3-Plugin Architecture',
      plugins: [
        { name: 'Dini Petty Archives', description: 'Core plugin — registers WooCommerce metadata, powers REST API endpoints, admin tools, cache control.' },
        { name: 'Dini Petty Search', description: 'Frontend search experience — filterable archive via shortcode with pagination, sorting, year/topic filters.' },
        { name: 'Dini Petty Quotes', description: 'WooCommerce-native licensing workflow — quote requests through cart/checkout without standard payment.' }
      ]
    },
    whatWasBuilt: [
      'Custom WooCommerce data model with _dinipetty_* metadata fields',
      'REST API endpoints for archive listings, year filters, guest autocomplete',
      'Shortcode-driven frontend archive search experience',
      'Quote request system integrated into WooCommerce orders & statuses',
      'Admin dashboards for cache control, search defaults, quote handling',
      'Simplified architecture with WooCommerce products as single source of truth'
    ]
  },
  {
    category: 'work',
    subcategory: 'dev',
    id: 'baanimjai',
    title: 'Baan Imjai',
    subtitle: 'Property listing platform for a Phuket real estate agency',
    type: 'Web Platform',
    year: '2024',
    role: 'Developer & Designer',
    tags: ['WordPress', 'PHP', 'Custom Theme', 'Property Listings'],
    color: '#2C3E2D',
    accentColor: '#8BA899',
    services: ['web-dev', 'product-design'],
    featured: true,
    links: {},
    images: [],
    overview: '',
    systemOverview: null,
    whatWasBuilt: []
  },
  {
    category: 'work',
    subcategory: 'dev',
    id: 'anodard',
    title: 'Anodard',
    subtitle: 'Digital presence for a Thai hospitality brand',
    type: 'Website',
    year: '2023',
    role: 'Developer & Designer',
    tags: ['WordPress', 'PHP', 'Custom Theme', 'WooCommerce'],
    color: '#3D2E2E',
    accentColor: '#C9A8A8',
    services: ['web-dev', 'product-design'],
    featured: true,
    links: {},
    images: [],
    overview: '',
    systemOverview: null,
    whatWasBuilt: []
  },
  // ── Work: Design Only (grouped on /work/design) ──
  {
    category: 'work',
    subcategory: 'design',
    id: 'elyana',
    title: 'Elyana',
    subtitle: 'Brand identity & web design',
    type: 'Web Design',
    year: '2023',
    role: 'Designer',
    tags: ['Figma', 'UI/UX'],
    color: '#4A3F35',
    accentColor: '#C5D8E8',
    services: ['product-design'],
    images: [
      '/work/elyana/Home.webp',
      '/work/elyana/Hillside%20Collection.webp',
      '/work/elyana/4%20Bedrooms%20Villa.webp'
    ]
  },
  {
    category: 'work',
    subcategory: 'design',
    id: 'baanazalea',
    title: 'Baan Azalea',
    subtitle: 'Property website design for a Phuket villa development',
    type: 'Web Design',
    year: '2024',
    role: 'Designer',
    tags: ['Figma', 'UI/UX'],
    color: '#2E3D3E',
    accentColor: '#8BAABF',
    services: ['product-design'],
    images: [
      '/work/baanazalea/Homepage.webp',
      '/work/baanazalea/Villas.webp',
      '/work/baanazalea/Villa%20Juniper.webp',
      '/work/baanazalea/Villa%20Magnolia.webp'
    ]
  },
  {
    category: 'work',
    subcategory: 'design',
    id: 'phuketprime',
    title: 'Phuket Prime',
    subtitle: 'UX design for a premium property platform',
    type: 'Web Design',
    year: '2023',
    role: 'Designer',
    tags: ['Figma', 'UX Research', 'UI/UX'],
    color: '#1E2A37',
    accentColor: '#8BAABF',
    services: ['product-design'],
    images: [
      '/work/phuketprime/Discover.webp',
      '/work/phuketprime/Buy.webp',
      '/work/phuketprime/Single%20Property%201.webp'
    ]
  },
  {
    category: 'work',
    subcategory: 'design',
    id: 'kudohotel',
    title: 'KUDO Hotel & Beach Club',
    subtitle: 'Website design for a Phuket beachfront resort',
    type: 'Web Design',
    year: '2024',
    role: 'Designer',
    tags: ['Figma', 'UI/UX'],
    color: '#37351E',
    accentColor: '#C9A8A8',
    services: ['product-design'],
    images: [
      '/work/kudohotel/Homepage.webp',
      '/work/kudohotel/Hotel.webp',
      '/work/kudohotel/About.webp',
      '/work/kudohotel/Blogs.webp'
    ]
  },
]

export const getProjectById = (id) => projects.find(p => p.id === id)
export const getProjectsByType = (type) => projects.filter(p => p.type === type)
export const getFeaturedProjects = () => projects.filter(p => p.featured)
export const getProjectsByCategory = (category) => projects.filter(p => p.category === category)
export const getWorkProjects = (subcategory) => projects.filter(p => p.category === 'work' && p.subcategory === subcategory)
export const getProjectsByService = (key) => projects.filter(p => p.services?.includes(key))
