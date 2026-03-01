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
    year: '2023',
    role: 'Full-Stack Developer',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'REST API', 'Custom Plugins'],
    color: '#37351E',
    accentColor: '#8BAABF',
    services: ['web-dev'],
    featured: true,
    links: { live: 'https://dinipetty.com' },
    images: [
      '/work/dinipetty/screencapture-dinipetty-2026-03-01-08_21_00.jpg',
      '/work/dinipetty/screencapture-dinipetty-the-dini-petty-show-media-licensing-2026-03-01-08_21_34.jpg',
      '/work/dinipetty/screencapture-dinipetty-booking-2026-03-01-08_21_19.jpg',
      '/work/dinipetty/screencapture-dinipetty-product-britney-spears-jeanne-cooper-sandraa-shamas-more-2026-03-01-08_21_53.jpg',
      '/work/dinipetty/screencapture-dinipetty-elmore-leonard-writing-without-an-outline-why-characters-must-talk-2026-03-01-08_22_26.jpg',
      '/work/dinipetty/screencapture-dinipetty-product-patty-duke-on-the-dini-petty-show-2026-03-01-16_42_30.png'
    ],
    overview: 'Built a custom WordPress/WooCommerce platform to organize, surface, and license historical TV content from The Dini Petty Show. The project evolved from a standard brand site into a complex media archive engine.',
    pillars: [
      {
        id: 'foundation',
        title: 'The Foundation',
        subtitle: 'Website & UX Build',
        description: 'The initial phase focused on creating a digital home for Dini Petty’s brand. We built a high-performance WordPress site that prioritized content readability, media management, and a clean booking workflow for her public speaking and media engagements.',
        imageIndices: [2, 3, 4], // Booking, Product, Blog
        tags: ['UX Design', 'Custom Theme', 'Media Management']
      },
      {
        id: 'engine',
        title: 'The Engine',
        subtitle: 'Media Archive & Licensing System',
        description: 'The core innovation: a custom-built archival system. We scraped and cleaned decades of raw episode data, structured it into a searchable database, and replaced the standard e-commerce checkout with a bespoke licensing quote workflow.',
        imageIndices: [5, 1], // New PNG, Licensing page
        tags: ['Database Architecture', 'Custom Plugin', 'Data Scraping']
      }
    ],
    timeline: [
      { year: '2023', title: 'Website & E-Commerce' },
      { year: '2024', title: 'Continued Support' },
      { year: '2025', title: 'Maintenance & Updates' },
      { year: '2026', title: 'Archives & Licensing System' }
    ],
    pageLabels: ['Homepage', 'Media Licensing', 'Booking', 'Product Detail', 'Blog Post', 'Quote Cart'],
    systemOverview: {
      title: 'Data & Archives',
      description: 'Scraped and cleaned decades of raw episode data — standardizing guest names, dates, topics, and media references across hundreds of entries. Built the data pipeline from scratch and structured everything into a searchable WooCommerce-based archive.',
    },
    whatWasBuilt: [
      'Data scraping, cleanup, and structuring of decades of episode records',
      'Custom archives plugin with REST API, metadata, and admin tools',
      'Filterable search with pagination, sorting, and year/topic filters',
      'Quote-based licensing workflow replacing standard WooCommerce checkout',
      'Guest name autocomplete and episode cross-referencing',
      'Admin dashboards for cache control, search defaults, and quote handling'
    ]
  },
  {
    category: 'work',
    subcategory: 'dev',
    id: 'baanimjai',
    title: 'Baan Imjai',
    subtitle: 'Website for a nature homestay & café in Nakhon Sawan',
    type: 'Website',
    year: '2024',
    role: 'Developer & Designer',
    tags: ['WordPress', 'Booking System', 'PHP', 'Theme Customization'],
    color: '#2C3E2D',
    accentColor: '#8BA899',
    services: ['web-dev', 'product-design'],
    featured: true,
    links: { live: 'https://baanimjai.com' },
    images: [
      '/work/baanimjai/screencapture-baanimjai-2026-03-01-12_01_39.jpg',
      '/work/baanimjai/screencapture-baanimjai-about-us-2026-03-01-12_02_44.jpg',
      '/work/baanimjai/screencapture-baanimjai-our-cafe-2026-03-01-12_03_07.jpg'
    ],
    overview: 'Customized a WordPress theme for Baan Imjai, a mud-brick homestay and café in Nakhon Sawan. The site showcases their five earth-built guest rooms, an organic café, and hands-on workshops — from mud-house construction to farm tours — with an integrated booking system and bilingual support.',
    pageLabels: ['Homepage', 'About Us', 'Our Café'],
    systemOverview: null,
    whatWasBuilt: []
  },
  {
    category: 'work',
    subcategory: 'dev',
    id: 'anodard',
    title: 'Anodard',
    subtitle: 'Website for a boutique villa-hotel in Nai Yang, Phuket',
    type: 'Website',
    year: '2023',
    role: 'Developer & Designer',
    tags: ['WordPress', 'PHP', 'Theme Customization'],
    color: '#3D2E2E',
    accentColor: '#C9A8A8',
    services: ['web-dev', 'product-design'],
    featured: true,
    links: { live: 'https://anodardphuket.com' },
    images: [
      '/work/anodard/screencapture-anodardphuket-2026-03-01-11_48_06.jpg',
      '/work/anodard/screencapture-anodardphuket-about-us-2026-03-01-11_48_32.jpg',
      '/work/anodard/screencapture-anodardphuket-contact-us-2026-03-01-11_49_14.jpg'
    ],
    overview: 'Customized a WordPress theme for Anodard, a boutique villa-hotel tucked near Nai Yang Beach in Phuket. The site highlights their individually designed villas, pet-friendly philosophy, eco-friendly practices, and the quiet charm of staying five minutes from the airport and the sea.',
    pageLabels: ['Homepage', 'About Us', 'Contact'],
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
