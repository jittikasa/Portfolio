import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, PaintFilter } from '../components/HeroClouds'
import './Contact.css'
import './Support.css'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } }
}

const shellistFaqs = [
  {
    question: 'How much does Shellist cost?',
    answer: 'Shellist is available for a one-time purchase of $4.99 USD. No subscriptions, no recurring fees, no ads. Pay once and own it.'
  },
  {
    question: 'What makes Shellist worth it?',
    answer: 'Shellist turns habit tracking into a visual journey with pearl chain visualizations, analytics, vision boards, and widgets. You get the complete experience upfront without ads or locked features.'
  },
  {
    question: 'How is my data stored?',
    answer: 'All your habit data stays on your device. You can enable iCloud sync to keep it available across your Apple devices. Your data stays yours.'
  },
  {
    question: 'Can I export my habit data?',
    answer: 'Yes. You can export your habits and completion history whenever you need a backup or a copy of your data.'
  },
  {
    question: 'What iOS version do I need?',
    answer: 'Shellist requires iOS 17.0 or later.'
  },
  {
    question: 'Can I use Shellist offline?',
    answer: 'Yes. Shellist works offline. If iCloud sync is enabled, syncing happens in the background when you are connected.'
  }
]

const polaFaqs = [
  {
    question: 'When will PolaMoment be available?',
    answer: (
      <>
        PolaMoment is currently in testing and will be launching soon on the App Store. Email{' '}
        <a href="mailto:hello@jittika.com?subject=PolaMoment%20Waitlist">hello@jittika.com</a>{' '}
        to be notified when it launches.
      </>
    )
  },
  {
    question: 'Will PolaMoment be free?',
    answer: "We're still finalizing pricing details. We will share that before launch."
  },
  {
    question: 'What devices will PolaMoment support?',
    answer: 'PolaMoment will be available for iPhone and iPad running iOS 17.0 or later at launch.'
  }
]

const generalFaqs = [
  {
    question: 'Do you sell my data?',
    answer: (
      <>
        No. Personal data is not sold, shared, or monetized. Information stays on your device or in your personal iCloud.
      </>
    )
  },
  {
    question: 'Will there be an Android version?',
    answer: "The current focus is iOS. There is no Android timeline to share right now."
  },
  {
    question: 'How can I report a bug?',
    answer: (
      <>
        Email <a href="mailto:hello@jittika.com">hello@jittika.com</a> with the app name, version,
        your device model, iOS version, what happened, and how to reproduce it if possible.
      </>
    )
  },
  {
    question: 'Can I request a feature?',
    answer: (
      <>
        Yes. Send suggestions to <a href="mailto:hello@jittika.com">hello@jittika.com</a>. Feedback is reviewed carefully, even if every request cannot be shipped.
      </>
    )
  }
]

function FaqItem({ item, isOpen, onToggle, buttonId, answerId }) {
  return (
    <div className={`support-faq-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="support-faq-trigger"
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="support-faq-question">{item.question}</span>
        <span className="support-faq-chevron" aria-hidden="true">+</span>
      </button>
      {isOpen && (
        <div
          id={answerId}
          className="support-faq-answer"
          role="region"
          aria-labelledby={buttonId}
        >
          <div className="support-faq-answer-inner">{item.answer}</div>
        </div>
      )}
    </div>
  )
}

function FaqSection({ number, title, items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="support-section-block">
      <div className="support-section-heading">
        <span className="support-section-number mono">{number}</span>
        <h2 className="support-section-title">{title}</h2>
      </div>
      <div className="support-faq-list">
        {items.map((item, index) => {
          const buttonId = `faq-${number}-${index}-button`
          const answerId = `faq-${number}-${index}-answer`

          return (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              buttonId={buttonId}
              answerId={answerId}
            />
          )
        })}
      </div>
    </section>
  )
}

export default function Support() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    app: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    if (status !== 'idle' && status !== 'sending') {
      setStatus('idle')
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
        setForm({ name: '', email: '', app: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-canvas support-canvas">
      <div className="contact-clouds" aria-hidden="true">
        <PaintFilter />
        <Cloud className="sz-md" variant="c" filter="cloud-paint-soft" style={{ top: '-4%', left: '-8%' }} />
        <Cloud className="sz-sm" variant="a" filter="cloud-paint-wispy" style={{ top: '5%', left: '72%' }} />
        <Cloud className="sz-xs" variant="b" filter="cloud-paint-wispy" style={{ top: '30%', left: '-2%' }} />
        <Cloud className="sz-sm" variant="d" filter="cloud-paint-soft" style={{ top: '55%', left: '80%' }} />
        <Cloud className="sz-xs" variant="c" filter="cloud-paint-wispy" style={{ top: '70%', left: '10%' }} />
        <Cloud className="sz-xs" variant="a" filter="cloud-paint-wispy" style={{ top: '85%', left: '60%' }} />
        <Cloud className="sz-xs" variant="d" filter="cloud-paint" style={{ top: '-2%', left: '88%' }} />
      </div>

      <motion.div
        className="contact-inner support-inner"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div className="contact-header" variants={fade}>
          <p className="contact-eyebrow mono">App support</p>
          <h1 className="contact-title">Help for Shellist &amp;<br /><em>PolaMoment.</em></h1>
          <p className="contact-sub">
            This page is for product users: app questions, troubleshooting, bug reports, feature requests, and common support answers.
          </p>
        </motion.div>

        <motion.form className="contact-form support-form" onSubmit={handleSubmit} variants={fade}>
          <input
            type="hidden"
            name="form_type"
            value="App Support"
          />

          <div className="support-form-header">
            <h2 className="support-card-title">Report an issue</h2>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="support-name" className="form-label mono">Name</label>
              <input
                id="support-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="support-email" className="form-label mono">Email</label>
              <input
                id="support-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="support-app" className="form-label mono">App</label>
              <select
                id="support-app"
                name="app"
                className="form-input form-select"
                value={form.app}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              >
                <option value="" disabled>Select app</option>
                <option value="Shellist">Shellist</option>
                <option value="PolaMoment">PolaMoment</option>
                <option value="Other / Upcoming">Other / Upcoming</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="support-subject" className="form-label mono">Request type</label>
              <select
                id="support-subject"
                name="subject"
                className="form-input form-select"
                value={form.subject}
                onChange={handleChange}
                required
                disabled={status === 'sending'}
              >
                <option value="" disabled>Select type</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="General Support">General Support</option>
                <option value="Billing / Purchase">Billing / Purchase</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="support-message" className="form-label mono">Details</label>
            <textarea
              id="support-message"
              name="message"
              className="form-input form-textarea"
              placeholder="Describe the issue or request. Include app version, device model, and iOS version if relevant."
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
            />
          </div>

          {status === 'success' && (
            <motion.p
              className="form-feedback form-success"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Support request sent. A reply should arrive within 24-48 hours.
            </motion.p>
          )}

          {status === 'error' && (
            <motion.p
              className="form-feedback form-error"
              role="alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Something went wrong. Email <a href="mailto:hello@jittika.com">hello@jittika.com</a> instead.
            </motion.p>
          )}

          <button
            type="submit"
            className="form-submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent' : 'Send support request'}
          </button>
        </motion.form>

        <motion.div className="support-faq-shell" variants={fade}>
          <div className="support-faq-header">
            <h2 className="support-faq-title">FAQs</h2>
            <span className="support-faq-count mono">3 Categories</span>
          </div>

          <FaqSection number="01" title="Shellist" items={shellistFaqs} />
          <FaqSection number="02" title="PolaMoment" items={polaFaqs} />
          <FaqSection number="03" title="General" items={generalFaqs} />
        </motion.div>
      </motion.div>
    </div>
  )
}
