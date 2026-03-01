import { motion } from 'framer-motion'
import './Privacy.css'

export default function Privacy() {
  const fade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <motion.header 
          className="privacy-header"
          initial="hidden"
          animate="show"
          variants={fade}
        >
          <span className="mono eyebrow">LEGAL</span>
          <h1 className="privacy-title">
            Privacy & Data <br />
            <span className="decorative">Protection.</span>
          </h1>
          <p className="privacy-intro">
            This policy explains how I handle information when you visit <br />
            this site or reach out for projects.
          </p>
          <p className="privacy-updated mono">Last updated: March 1, 2026</p>
        </motion.header>

        <motion.div 
          className="privacy-content"
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          variants={fade}
        >
          <section>
            <h2>General</h2>
            <p>
              Your privacy is extremely important to me. This policy explains how I handle 
              information when you visit this site or reach out for projects. In short: 
              I respect your data as much as I respect my own craft.
            </p>
          </section>

          <section>
            <h2>Data Collection</h2>
            <p>
              This website is designed to be as minimal and private as possible. 
              I do not use tracking cookies, analytics, or third-party advertising scripts. 
              The only data collected is what you voluntarily provide when contacting me 
              via email (name and email address).
            </p>
          </section>

          <section>
            <h2>How I Use It</h2>
            <p>
              If you email me, I will use your information solely to communicate with you 
              regarding your inquiry or project. I will never sell, rent, or share your 
              contact details with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2>Third-Party Links</h2>
            <p>
              This site may contain links to external platforms like LinkedIn or Dribbble. 
              These sites have their own privacy policies, and I am not responsible for 
              how they handle your data.
            </p>
          </section>

          <section>
            <h2>Security</h2>
            <p>
              I take reasonable steps to protect any information you send via email, 
              though no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              If you have any questions about this policy or want to request the 
              removal of your data, feel free to reach out at <a href="mailto:hello@jittika.com">hello@jittika.com</a>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
