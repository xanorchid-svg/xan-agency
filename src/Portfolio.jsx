import Nav from './Nav.jsx'
import { useScrollReveal } from './useScrollReveal.js'
import './Portfolio.css'

const WORK = [
  {
    id: 1,
    title: 'Diamond Vitality Center',
    category: 'Social Media · Web · Content',
    desc: 'Ongoing support across social media marketing, newsletters, blogs, infographics, and website management for a wellness and vitality center.',
    url: 'http://www.diamondvitalitycenter.com',
    img: 'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
  },
  {
    id: 2,
    title: 'Dandelion Wild School',
    category: 'Web Design',
    desc: 'Website design and build for a nature-based alternative school, creating a warm and inviting digital presence that reflects their outdoor education philosophy.',
    url: 'https://elianebeeson.wixsite.com/wildchild',
    img: 'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
  },
  {
    id: 3,
    title: 'Simple',
    category: 'Brand Identity · Design',
    desc: 'Brand identity and design work for Simple — clean, considered visual direction that reflects the brand name itself.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
  },
  {
    id: 4,
    title: 'Seekr',
    category: 'Brand Identity · Strategy',
    desc: 'Brand identity and strategic positioning for Seekr — visual identity system designed to communicate exploration and discovery.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
  },
  {
    id: 5,
    title: 'Abrago',
    category: 'Startup · Brand · Product Design',
    desc: 'Founded and designed Abrago — an all-in-one platform for organising the study abroad experience. Winner of the New Venture Creation competition in Barcelona.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
  },
  {
    id: 6,
    title: 'One Local',
    category: 'Brand Identity · Marketing',
    desc: 'Brand identity and marketing design for One Local — visual storytelling rooted in community and local connection.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
  },
  {
    id: 7,
    title: 'Goddess Activations',
    category: 'Brand · Social Media',
    desc: 'Brand and social media design for Goddess Activations — a spiritual wellness brand. Visual identity that balances mysticism with modern design sensibility.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
  },
  {
    id: 8,
    title: 'Flyers & Print',
    category: 'Graphic Design · Print',
    desc: 'Event flyers and print collateral for various clients — bold, eye-catching design that translates from screen to street.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
  },
  {
    id: 9,
    title: 'Art Portfolio',
    category: 'Illustration · Fine Art',
    desc: 'A collection of original illustrations and fine art — the creative foundation that informs every design decision Xan brings to client work.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
  },
  {
    id: 10,
    title: 'Hypnositea',
    category: 'Brand Identity · Packaging',
    desc: 'Brand identity and design for Hypnositea — a tea brand with an otherworldly, meditative aesthetic. Full visual system from logo to packaging direction.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
  },
  {
    id: 11,
    title: 'Astro Trips',
    category: 'NFT · Brand · Digital Art',
    desc: 'Founded and art-directed Astro Trips — an NFT project blending original illustration with digital collectibles. Full brand system and visual world-building.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
  },
  {
    id: 12,
    title: 'GoGal',
    category: 'Startup · Brand · Product Design',
    desc: 'Founded and designed GoGal — an invite-only platform for women to connect and travel safely. Full brand identity and product design for a community-first travel app.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
  },
]

const CATEGORIES = ['All', 'Brand Identity', 'Web Design', 'Social Media', 'Startup', 'Graphic Design']

import { useState } from 'react'

export default function Portfolio() {
  useScrollReveal()
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? WORK
    : WORK.filter(w => w.category.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="port-hero">
        <div className="port-hero__content">
          <div className="port-hero__overline">Selected Work</div>
          <h1 className="port-hero__title">See results.<br />See reinventions.</h1>
          <p className="port-hero__sub">Brand, web, social, and startup design — a curated look at what we've built together.</p>
        </div>
      </section>

      {/* FILTER */}
      <div className="port-filter">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`port-filter__btn ${filter === cat ? 'port-filter__btn--active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <section className="port-grid-section">
        <div className="port-masonry">
          {filtered.map((item, i) => (
            <div key={item.id} className={`port-tile reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="port-tile__image">
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="port-tile__overlay">
                  <span className="port-tile__category">{item.category}</span>
                  <h3 className="port-tile__title">{item.title}</h3>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noreferrer" className="port-tile__link">
                      Visit Site ↗
                    </a>
                  )}
                </div>
              </div>
              <div className="port-tile__meta">
                <span className="port-tile__cat-label">{item.category}</span>
                <h3 className="port-tile__name">{item.title}</h3>
                <p className="port-tile__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="port-note reveal">
          <p>Additional case studies and process decks available on request — <a href="/#contact">get in touch</a>.</p>
        </div>
      </section>

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
