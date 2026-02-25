import './GrainOverlay.css'

// Monet Design Rationale:
// Adds a tactile "canvas" texture to the screen, preventing the sterility
// of pure digital pixels.

export default function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg className="grain-svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  )
}
