import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Cloud, PaintFilter } from '../components/HeroClouds'
import { MailCheckIcon } from '../components/MailCheckIcon'
import './Contact.css'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const mailIconRef = useRef(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const data = new FormData(e.target)
      const res = await fetch('https://formspree.io/f/xkovenyl', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        mailIconRef.current?.startAnimation()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-canvas">
      <div className="contact-clouds" aria-hidden="true">
        <PaintFilter />
        <Cloud className="sz-md" variant="c" filter="cloud-paint-soft"  style={{ top: '-4%',  left: '-8%'  }} />
        <Cloud className="sz-sm" variant="a" filter="cloud-paint-wispy" style={{ top: '5%',   left: '72%'  }} />
        <Cloud className="sz-xs" variant="b" filter="cloud-paint-wispy" style={{ top: '30%',  left: '-2%'  }} />
        <Cloud className="sz-sm" variant="d" filter="cloud-paint-soft"  style={{ top: '55%',  left: '80%'  }} />
        <Cloud className="sz-xs" variant="c" filter="cloud-paint-wispy" style={{ top: '70%',  left: '10%'  }} />
        <Cloud className="sz-xs" variant="a" filter="cloud-paint-wispy" style={{ top: '85%',  left: '60%'  }} />
        <Cloud className="sz-xs" variant="d" filter="cloud-paint"       style={{ top: '-2%',  left: '88%'  }} />
      </div>

      <motion.div
        className="contact-inner"
        initial="hidden"
        animate="show"
        variants={stagger}
      >

        {/* Header */}
        <motion.div className="contact-header" variants={fade}>
          <p className="contact-eyebrow mono">Get in touch</p>
          <h1 className="contact-title">Let's make<br /><em>something good.</em></h1>
          <p className="contact-sub">
            Whether it's a project, a collaboration, or just a hello —
            I'd love to hear from you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          variants={fade}
          noValidate
        >
          {/* Honeypot — hidden from humans, bots fill it, Formspree rejects */}
          <input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            className="contact-honeypot"
          />

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label mono">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={status === 'sending' || status === 'success'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label mono">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'sending' || status === 'success'}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label mono">What's this about?</label>
            <select
              id="subject"
              name="subject"
              className="form-input form-select"
              value={form.subject}
              onChange={handleChange}
              required
              disabled={status === 'sending' || status === 'success'}
            >
              <option value="" disabled>Choose a topic</option>
              <option value="Product Design">Product Design</option>
              <option value="App Development">App Development</option>
              <option value="Web Development">Web Development</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Just saying hi">Just saying hi</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label mono">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-input form-textarea"
              placeholder="Tell me about your project, idea, or just say hello..."
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
              disabled={status === 'sending' || status === 'success'}
            />
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <motion.p
              className="form-feedback form-success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Message sent — I'll be in touch soon.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              className="form-feedback form-error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Something went wrong. Try emailing me directly at{' '}
              <a href="mailto:hello@jittika.com">hello@jittika.com</a>
            </motion.p>
          )}

          <button
            type="submit"
            className="form-submit"
            disabled={status === 'sending' || status === 'success'}
            onMouseEnter={() => mailIconRef.current?.startAnimation()}
            onMouseLeave={() => mailIconRef.current?.stopAnimation()}
          >
            <MailCheckIcon ref={mailIconRef} size={16} />
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent' : 'Send message'}
          </button>
        </motion.form>

        {/* Side note */}
        <motion.div className="contact-aside" variants={fade}>
          <p className="contact-aside-text">
            Or reach me directly at{' '}
            <a href="mailto:hello@jittika.com" className="contact-email-link">
              hello@jittika.com
            </a>
          </p>
        </motion.div>

      </motion.div>
    </div>
  )
}
