import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations'
import Stamp from '../components/Stamp'
import GrainOverlay from '../components/GrainOverlay'
import './Contact.css'

const services = [
  'iOS App Design',
  'UI/UX Design',
  'Product Design',
  'Brand Identity',
]

export default function Contact() {
  return (
    <div className="contact-page">
      <GrainOverlay opacity={0.25} />

      <div className="contact-page__container">
        <header className="contact-page__header">
          <FadeIn>
            <span className="contact-page__eyebrow">Get in touch</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="contact-page__title">Let's connect</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="contact-page__intro">
              Have a project in mind or just want to say hello?
              I'd love to hear from you.
            </p>
          </FadeIn>
        </header>

        <div className="contact-page__content">
          <FadeIn delay={0.3} className="contact-page__card-wrap">
            <Stamp variant="featured" size="large" hoverLift={false}>
              <div className="contact-page__email-section">
                <span className="contact-page__email-label">Email</span>
                <a href="mailto:hello@jittika.com" className="contact-page__email">
                  hello@jittika.com
                </a>
              </div>
            </Stamp>
          </FadeIn>

          <FadeIn delay={0.4} className="contact-page__services">
            <h2 className="contact-page__services-title">Services</h2>
            <StaggerContainer staggerDelay={0.08} delayStart={0.5}>
              <ul className="contact-page__services-list">
                {services.map((service) => (
                  <StaggerItem key={service}>
                    <li>{service}</li>
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          </FadeIn>
        </div>

        <FadeIn delay={0.5} className="contact-page__location">
          <span className="contact-page__location-label">Based in</span>
          <span className="contact-page__location-value">Phuket, Thailand</span>
        </FadeIn>
      </div>
    </div>
  )
}
