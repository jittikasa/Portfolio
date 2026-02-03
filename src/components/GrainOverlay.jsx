import './GrainOverlay.css'

export default function GrainOverlay({ opacity = 0.4, className = '' }) {
  return (
    <div
      className={`grain-overlay ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="grain-overlay__svg">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  )
}
