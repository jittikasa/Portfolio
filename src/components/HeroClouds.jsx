import { motion, useScroll, useTransform } from 'framer-motion'
import './HeroClouds.css'

/*
  Monet-style impressionist clouds using SVG filters
  - feTurbulence for painterly brush-stroke texture
  - Warm palette: cream, lavender, soft rose (matching the beach painting)
  - Organic blob shapes via multiple ellipses
  - 3 depth layers with parallax scroll
*/

/* SVG filter that gives clouds an oil-paint / impressionist texture */
function PaintFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* Painterly texture — heavy turbulence like brushstrokes */}
        <filter id="cloud-paint" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="4"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="28"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="3" />
        </filter>

        <filter id="cloud-paint-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="3"
            seed="8"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <filter id="cloud-paint-wispy" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="5"
            seed="15"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="35"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
    </svg>
  )
}

/* Each cloud is an SVG with overlapping ellipses + painterly filter */
export function Cloud({ className, style, variant = 'a', filter = 'cloud-paint' }) {
  const shapes = {
    a: (
      <>
        <ellipse cx="120" cy="80" rx="80" ry="45" fill="rgba(247,244,235,0.7)" />
        <ellipse cx="70"  cy="90" rx="55" ry="38" fill="rgba(235,228,218,0.6)" />
        <ellipse cx="170" cy="85" rx="60" ry="35" fill="rgba(242,237,228,0.65)" />
        <ellipse cx="100" cy="70" rx="50" ry="30" fill="rgba(220,215,225,0.4)" />
        <ellipse cx="150" cy="95" rx="45" ry="28" fill="rgba(210,195,185,0.3)" />
        <ellipse cx="90"  cy="65" rx="40" ry="25" fill="rgba(255,250,245,0.5)" />
      </>
    ),
    b: (
      <>
        <ellipse cx="100" cy="75" rx="70" ry="40" fill="rgba(245,240,232,0.65)" />
        <ellipse cx="55"  cy="85" rx="50" ry="35" fill="rgba(230,222,215,0.55)" />
        <ellipse cx="155" cy="80" rx="55" ry="32" fill="rgba(238,232,225,0.6)" />
        <ellipse cx="85"  cy="65" rx="38" ry="24" fill="rgba(225,218,230,0.35)" />
        <ellipse cx="130" cy="90" rx="48" ry="30" fill="rgba(215,200,190,0.3)" />
      </>
    ),
    c: (
      <>
        <ellipse cx="90"  cy="70" rx="65" ry="38" fill="rgba(248,243,236,0.6)" />
        <ellipse cx="45"  cy="78" rx="40" ry="28" fill="rgba(232,225,218,0.5)" />
        <ellipse cx="140" cy="75" rx="48" ry="30" fill="rgba(240,235,226,0.55)" />
        <ellipse cx="95"  cy="60" rx="35" ry="22" fill="rgba(218,212,222,0.3)" />
      </>
    ),
    d: (
      <>
        <ellipse cx="110" cy="70" rx="90" ry="50" fill="rgba(246,242,234,0.7)" />
        <ellipse cx="55"  cy="82" rx="52" ry="36" fill="rgba(233,226,218,0.55)" />
        <ellipse cx="175" cy="78" rx="58" ry="34" fill="rgba(240,234,226,0.6)" />
        <ellipse cx="120" cy="58" rx="55" ry="30" fill="rgba(222,216,228,0.35)" />
        <ellipse cx="80"  cy="88" rx="42" ry="26" fill="rgba(252,248,242,0.5)" />
        <ellipse cx="160" cy="90" rx="50" ry="30" fill="rgba(212,198,188,0.3)" />
        <ellipse cx="110" cy="50" rx="42" ry="22" fill="rgba(255,252,248,0.4)" />
      </>
    ),
  }

  return (
    <svg
      className={`monet-cloud ${className || ''}`}
      style={style}
      viewBox="0 0 240 130"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g filter={`url(#${filter})`}>
        {shapes[variant]}
      </g>
    </svg>
  )
}

export default function HeroClouds() {
  const { scrollY } = useScroll()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  // Each cloud gets its own horizontal drift direction & speed
  // Negative = fly left, positive = fly right
  const drift = (range, px) => useTransform(scrollY, [0, vh * range], [0, px], { clamp: true })
  const fade  = (range)     => useTransform(scrollY, [0, vh * range], [1, 0], { clamp: true })

  // 18 clouds — scattered naturally across top 30%
  const c1x  = drift(1.3, -180);  const c1o  = fade(1.0)
  const c2x  = drift(1.5, 160);   const c2o  = fade(1.2)
  const c3x  = drift(1.4, -140);  const c3o  = fade(1.1)
  const c4x  = drift(1.6, 120);   const c4o  = fade(1.3)
  const c5x  = drift(1.8, -100);  const c5o  = fade(1.5)
  const c6x  = drift(2.0, 110);   const c6o  = fade(1.6)
  const c7x  = drift(2.2, -80);   const c7o  = fade(1.8)
  const c8x  = drift(2.0, 90);    const c8o  = fade(1.7)
  const c9x  = drift(2.5, -60);   const c9o  = fade(2.0)
  const c10x = drift(1.5, -150);  const c10o = fade(1.2)
  const c11x = drift(1.7, 130);   const c11o = fade(1.4)
  const c12x = drift(2.3, -70);   const c12o = fade(1.9)
  const c13x = drift(1.9, 100);   const c13o = fade(1.5)
  const c14x = drift(2.6, -50);   const c14o = fade(2.1)
  const c15x = drift(2.1, 85);    const c15o = fade(1.7)
  const c16x = drift(2.8, -45);   const c16o = fade(2.3)
  const c17x = drift(1.6, 140);   const c17o = fade(1.3)
  const c18x = drift(3.0, -35);   const c18o = fade(2.5)
  const c19x = drift(1.4, 150);   const c19o = fade(1.1)
  const c20x = drift(1.7, 120);   const c20o = fade(1.3)
  const c21x = drift(1.5, 115);   const c21o = fade(1.2)  // top-right fill
  const c22x = drift(1.3, -95);   const c22o = fade(1.0)  // near 'Work' nav
  const c23x = drift(1.8, 80);    const c23o = fade(1.4)  // top-right low

  return (
    <div className="hero-clouds" aria-hidden="true">
      <PaintFilter />

      {/*
        Spread layout — staggered checkerboard pattern
        On a 1440px screen: lg=620px(~43%), md=460px(~32%), sm=320px(~22%), xs=200px(~14%)
        Only 3-4 clouds per row, offset so no vertical stacking
      */}

      {/* Row 1 — top, heavy on edges, clear center */}
      <motion.div className="cloud-solo" style={{ x: c1x, opacity: c1o }}>
        <Cloud className="sz-lg" variant="d" filter="cloud-paint"
               style={{ top: '-3%', left: '-10%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c2x, opacity: c2o }}>
        <Cloud className="sz-lg" variant="a" filter="cloud-paint"
               style={{ top: '-2%', left: '80%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c17x, opacity: c17o }}>
        <Cloud className="sz-xs" variant="b" filter="cloud-paint"
               style={{ top: '1%', left: '58%' }} />
      </motion.div>

      {/* Top-right fill — near 'Work' nav */}
      <motion.div className="cloud-solo" style={{ x: c21x, opacity: c21o }}>
        <Cloud className="sz-sm" variant="b" filter="cloud-paint"
               style={{ top: '0%', left: '68%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c22x, opacity: c22o }}>
        <Cloud className="sz-sm" variant="c" filter="cloud-paint-soft"
               style={{ top: '-1%', left: '85%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c23x, opacity: c23o }}>
        <Cloud className="sz-xs" variant="a" filter="cloud-paint-soft"
               style={{ top: '10%', left: '76%' }} />
      </motion.div>

      {/* Row 2 — offset, no center */}
      <motion.div className="cloud-solo" style={{ x: c10x, opacity: c10o }}>
        <Cloud className="sz-md" variant="c" filter="cloud-paint"
               style={{ top: '10%', left: '18%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c4x, opacity: c4o }}>
        <Cloud className="sz-md" variant="a" filter="cloud-paint-soft"
               style={{ top: '8%', left: '68%' }} />
      </motion.div>

      {/* Row 3 — spread edges + one center-ish */}
      <motion.div className="cloud-solo" style={{ x: c9x, opacity: c9o }}>
        <Cloud className="sz-sm" variant="a" filter="cloud-paint-soft"
               style={{ top: '22%', left: '-4%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c5x, opacity: c5o }}>
        <Cloud className="sz-sm" variant="b" filter="cloud-paint-soft"
               style={{ top: '20%', left: '32%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c8x, opacity: c8o }}>
        <Cloud className="sz-sm" variant="d" filter="cloud-paint-soft"
               style={{ top: '22%', left: '80%' }} />
      </motion.div>

      {/* Row 4 — wispy, far apart */}
      <motion.div className="cloud-solo" style={{ x: c12x, opacity: c12o }}>
        <Cloud className="sz-xs" variant="c" filter="cloud-paint-wispy"
               style={{ top: '34%', left: '4%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c7x, opacity: c7o }}>
        <Cloud className="sz-xs" variant="b" filter="cloud-paint-wispy"
               style={{ top: '30%', left: '62%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c13x, opacity: c13o }}>
        <Cloud className="sz-xs" variant="a" filter="cloud-paint-wispy"
               style={{ top: '36%', left: '88%' }} />
      </motion.div>

      {/* Lone wisps — only in big empty zones */}
      <motion.div className="cloud-solo" style={{ x: c16x, opacity: c16o }}>
        <Cloud className="sz-xs" variant="c" filter="cloud-paint-wispy"
               style={{ top: '5%', left: '30%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c3x, opacity: c3o }}>
        <Cloud className="sz-xs" variant="a" filter="cloud-paint-wispy"
               style={{ top: '28%', left: '22%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c11x, opacity: c11o }}>
        <Cloud className="sz-xs" variant="d" filter="cloud-paint-wispy"
               style={{ top: '14%', left: '62%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c14x, opacity: c14o }}>
        <Cloud className="sz-xs" variant="b" filter="cloud-paint-wispy"
               style={{ top: '38%', left: '24%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c15x, opacity: c15o }}>
        <Cloud className="sz-xs" variant="c" filter="cloud-paint-wispy"
               style={{ top: '42%', left: '70%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c18x, opacity: c18o }}>
        <Cloud className="sz-xs" variant="b" filter="cloud-paint-wispy"
               style={{ top: '27%', left: '91%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c6x, opacity: c6o }}>
        <Cloud className="sz-xs" variant="c" filter="cloud-paint-wispy"
               style={{ top: '26%', left: '72%' }} />
      </motion.div>

      {/* Extra top-right clouds */}
      <motion.div className="cloud-solo" style={{ x: c19x, opacity: c19o }}>
        <Cloud className="sz-md" variant="b" filter="cloud-paint"
               style={{ top: '7%', left: '89%' }} />
      </motion.div>

      <motion.div className="cloud-solo" style={{ x: c20x, opacity: c20o }}>
        <Cloud className="sz-sm" variant="a" filter="cloud-paint"
               style={{ top: '16%', left: '93%' }} />
      </motion.div>

    </div>
  )
}
