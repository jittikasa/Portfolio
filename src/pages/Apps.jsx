import { FadeIn, StaggerContainer, StaggerItem } from '../components/animations'
import Stamp from '../components/Stamp'
import GrainOverlay from '../components/GrainOverlay'
import './Apps.css'

const apps = [
  {
    name: 'Shellist',
    tagline: 'A minimal habit tracker that helps you build better routines.',
    meta: 'iOS · Productivity',
    rotation: -1.5,
  },
  {
    name: 'PolaMoment',
    tagline: 'Vintage-style instant camera for capturing life\'s moments.',
    meta: 'iOS · Photography',
    rotation: 2,
  },
]

export default function Apps() {
  return (
    <div className="apps-page">
      <GrainOverlay opacity={0.25} />

      <div className="apps-page__container">
        <header className="apps-page__header">
          <FadeIn>
            <span className="apps-page__eyebrow">Portfolio</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="apps-page__title">Apps</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="apps-page__intro">
              iOS apps I've designed and built with care.
            </p>
          </FadeIn>
        </header>

        <StaggerContainer className="apps-page__grid" staggerDelay={0.15}>
          {apps.map((app) => (
            <StaggerItem key={app.name}>
              <Stamp
                rotation={app.rotation}
                variant="featured"
                size="large"
                className="apps-page__stamp"
              >
                <Stamp.Title>{app.name}</Stamp.Title>
                <Stamp.Subtitle>{app.tagline}</Stamp.Subtitle>
                <Stamp.Meta>{app.meta}</Stamp.Meta>
              </Stamp>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="apps-page__cta-section">
          <p className="apps-page__cta-text">
            More apps coming soon. Stay tuned.
          </p>
        </FadeIn>
      </div>
    </div>
  )
}
