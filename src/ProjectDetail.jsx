import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './Nav.jsx'
import { useScrollReveal } from './useScrollReveal.js'
import { PROJECTS } from './projects.js'
import './ProjectDetail.css'

export default function ProjectDetail() {
  useScrollReveal()
  const { slug } = useParams()
  const navigate = useNavigate()

  const project = PROJECTS.find(p => p.slug === slug)
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug)
  const prev = PROJECTS[currentIndex - 1] || null
  const next = PROJECTS[currentIndex + 1] || null

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) navigate('/portfolio')
  }, [slug])

  if (!project) return null

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="pd-hero">
        <div className="pd-hero__content">
          <Link to="/portfolio" className="pd-back">← All Projects</Link>
          <div className="pd-hero__tags">
            {project.tags.map(t => (
              <span key={t} className="pd-hero__tag">{t}</span>
            ))}
          </div>
          <h1 className="pd-hero__title">{project.title}</h1>
          <p className="pd-hero__subtitle">{project.subtitle}</p>
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noreferrer" className="btn btn--gold pd-hero__link">
              Visit Live Site ↗
            </a>
          )}
        </div>
        <div className="pd-hero__cover">
          <img src={project.coverImg} alt={project.title} />
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      {(project.problem || project.solution) && (
        <section className="pd-brief">
          {project.problem && (
            <div className="pd-brief__col reveal">
              <div className="pd-brief__label">Problem</div>
              <p className="pd-brief__text">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="pd-brief__col reveal reveal-delay-2">
              <div className="pd-brief__label">Solution</div>
              <p className="pd-brief__text">{project.solution}</p>
            </div>
          )}
        </section>
      )}

      {/* STATS */}
      {project.stats.length > 0 && (
        <section className="pd-stats">
          {project.stats.map((s, i) => (
            <div key={i} className={`pd-stat reveal reveal-delay-${i + 1}`}>
              <div className="pd-stat__value">{s.value}</div>
              <div className="pd-stat__label">{s.label}</div>
            </div>
          ))}
        </section>
      )}

      {/* IMAGES */}
      <section className="pd-images">
        {project.images.map((img, i) => (
          <div key={i} className={`pd-image reveal reveal-delay-${(i % 3) + 1}`}>
            <img src={img} alt={`${project.title} — ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </section>

      {/* PREV / NEXT */}
      <nav className="pd-nav">
        {prev ? (
          <Link to={`/portfolio/${prev.slug}`} className="pd-nav__item pd-nav__item--prev">
            <span className="pd-nav__dir">← Previous</span>
            <span className="pd-nav__name">{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/portfolio/${next.slug}`} className="pd-nav__item pd-nav__item--next">
            <span className="pd-nav__dir">Next →</span>
            <span className="pd-nav__name">{next.title}</span>
          </Link>
        ) : <div />}
      </nav>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__logo">XAN ORCHID</div>
        <div className="footer__links">
          <a href="/portfolio">Portfolio</a>
          <a href="/about">About</a>
          <a href="/#contact">Contact</a>
        </div>
        <div className="footer__socials">
          <a href="https://www.instagram.com/graphix.xan" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/xan-orchid/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.upwork.com/freelancers/~01b1742c39720ba911" target="_blank" rel="noreferrer">Upwork</a>
        </div>
        <div className="footer__copy">© 2026 Xan Orchid. All rights reserved.</div>
      </footer>
    </>
  )
}
