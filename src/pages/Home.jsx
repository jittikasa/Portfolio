import { motion } from 'framer-motion'
import './Home.css'

export default function Home() {
  return (
    <div className="coming-soon">
      <motion.div
        className="coming-soon__inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="coming-soon__eyebrow">Jittika S. · Phuket, Thailand</span>
        <h1 className="coming-soon__headline">
          Something beautiful<br />
          <em>is coming.</em>
        </h1>
        <p className="coming-soon__body">
          A new portfolio is on its way. In the meantime, say hello.
        </p>
        <a href="mailto:hello@jittika.com" className="coming-soon__link">
          hello@jittika.com
        </a>
      </motion.div>
    </div>
  )
}
