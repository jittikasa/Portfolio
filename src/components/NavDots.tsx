'use client'

interface NavDotsProps {
  sections: string[]
  activeSection: string
  onNavigate: (section: string) => void
}

export default function NavDots({ sections, activeSection, onNavigate }: NavDotsProps) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onNavigate(section)}
          className="group relative flex items-center justify-end"
          aria-label={`Navigate to ${section}`}
        >
          {/* Label on hover */}
          <span
            className="absolute right-6 px-2 py-1 text-xs font-medium bg-[var(--ink)] text-[var(--cream)] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>

          {/* Dot */}
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === section
                ? 'bg-[var(--accent)] scale-125'
                : 'bg-[var(--paper-dark)] hover:bg-[var(--ink-light)]'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
