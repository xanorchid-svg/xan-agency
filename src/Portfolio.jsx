import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'
import { useScrollReveal } from './useScrollReveal.js'
import { PROJECTS } from './projects.js'
import './Portfolio.css'

const FILTERS = ['All', 'Brand Identity', 'Web Design', 'Social Media', 'Startup', 'Graphic Design', 'Illustration']

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  useScrollReveal(filter)

  const filtered = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.some(t => t === filter))

  return (
    <>
      <Nav />

      <section className="port-hero">
        <div className="port-hero__content">
          <div className="port-hero__overline">Selected Work</div>
          <h1 className="port-hero__title">See results.<br />See reinventions.</h1>
          <p className="port-hero__sub">Brand, web, social, and startup design — every project built with intention.</p>
        </div>
      </section>

      <div className="port-filter">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`port-filter__btn ${filter === f ? 'port-filter__btn--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <section className="port-grid-section">
        <div className="port-masonry">
          {filtered.map((project, i) => (
            <Link
              key={project.slug}
              to={`/portfolio/${project.slug}`}
              className="port-tile"
            >
              <div className="port-tile__image">
                <img src={project.coverImg} alt={project.title} loading="lazy" />
                <div className="port-tile__overlay">
                  <span className="port-tile__overlay-label">View Project →</span>
                </div>
              </div>
              <div className="port-tile__meta">
                <span className="port-tile__cat-label">{project.category}</span>
                <h3 className="port-tile__name">{project.title}</h3>
                <p className="port-tile__sub">{project.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="port-note">
          <p>Additional case studies and process decks available on request — <a href="/#contact">get in touch</a>.</p>
        </div>
      </section>

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
