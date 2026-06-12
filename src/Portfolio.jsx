import { useState } from 'react'
import Nav from './Nav.jsx'
import { useScrollReveal } from './useScrollReveal.js'
import './Portfolio.css'

const WORK = [
  {
    id: 1,
    title: 'Diamond Vitality Center',
    category: 'Social Media',
    tags: ['Social Media', 'Web Design', 'Content Creation'],
    desc: 'Full-service social media management, newsletter creation, blog writing, infographic design, and website build and maintenance for a health and vitality wellness center. Delivered a consistent brand voice across every touchpoint — from email campaigns to Instagram — with a clean aesthetic and well-organised layout.',
    url: 'http://www.diamondvitalitycenter.com',
    img: 'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
  },
  {
    id: 2,
    title: 'Dandelion Wild School',
    category: 'Web Design',
    tags: ['Web Design', 'Brand Identity'],
    desc: 'Full website design and development for a nature-based alternative school in Nosara, Costa Rica, serving worldschooling and traveling families. Built a warm, intentional digital home that reflects their five-pedagogy approach — Waldorf, Forest School, Reggio Emilia, Summerhill, and Montessori — and clearly communicates their flexible enrollment programs to a global audience.',
    url: 'https://elianebeeson.wixsite.com/wildchild',
    img: 'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
  },
  {
    id: 3,
    title: 'Simple',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Graphic Design'],
    desc: 'Brand identity design for Simple — a project where the name itself set the creative brief. Clean typography, a restrained colour palette, and a visual system built around clarity and confidence. Every design decision was interrogated: if it wasn\'t necessary, it was removed. The result is a brand that communicates through what it leaves out as much as what it includes.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
  },
  {
    id: 4,
    title: 'Seekr',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Strategy'],
    desc: 'Brand identity and strategic positioning for Seekr. Designed a visual language rooted in exploration, curiosity, and discovery — with a wordmark and identity system that feels dynamic without sacrificing legibility. The brand needed to speak to an audience actively looking for something more, and every visual choice was made to mirror that restless, forward-moving energy.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
  },
  {
    id: 5,
    title: 'Abrago',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Product Design'],
    desc: 'Founded and designed Abrago — an all-in-one platform for organising the study abroad experience. Conceived, pitched, and won the New Venture Creation competition with this idea during study abroad in Barcelona. Developed the full brand identity, product concept, and go-to-market strategy. Abrago was built around the insight that the study abroad experience is fragmented and overwhelming — and deserves a smarter, more connected home.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
  },
  {
    id: 6,
    title: 'One Local',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Marketing', 'Social Media'],
    desc: 'Brand identity and marketing design for One Local — a project rooted in community connection and the power of shopping, eating, and living locally. Developed a visual identity that feels grounded and approachable without being generic, paired with marketing collateral designed to activate a grassroots audience and drive real-world engagement at the neighbourhood level.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
  },
  {
    id: 7,
    title: 'Goddess Activations',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Social Media', 'Content Creation'],
    desc: 'Brand identity and social media design for Goddess Activations — a spiritual wellness brand offering activations, ceremonies, and transformational experiences. The visual identity had to balance the mystical with the modern: rich, evocative imagery, a colour palette drawn from ritual and nature, and typography that feels both sacred and accessible. Social content was designed to stop the scroll and invite deeper curiosity.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
  },
  {
    id: 8,
    title: 'Flyers & Print',
    category: 'Graphic Design',
    tags: ['Graphic Design', 'Print'],
    desc: 'Event flyers and print collateral for a range of clients and occasions. Every piece was designed to work in the wild — on a telephone pole, a coffee shop noticeboard, or an Instagram story. Bold hierarchy, intentional use of colour, and layouts that communicate the essential information at a glance without sacrificing visual personality.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
  },
  {
    id: 9,
    title: 'Art Portfolio',
    category: 'Illustration',
    tags: ['Illustration', 'Fine Art'],
    desc: 'A collection of original illustrations and fine art — the creative foundation that informs every design decision brought to client work. Drawing across mediums and styles, this body of work reflects a genuine curiosity about image-making and visual storytelling. The art practice keeps the eye sharp and the instincts honest.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
  },
  {
    id: 10,
    title: 'Hypnositea',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Packaging', 'Graphic Design'],
    desc: 'Brand identity and packaging direction for Hypnositea — a tea brand built around ritual, altered states, and the meditative quality of a slow brew. The visual system draws from botanical illustration, dreamy colour gradients, and typography that slows the reader down. The brand needed to feel hypnotic without being inaccessible — otherworldly but warm.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
  },
  {
    id: 11,
    title: 'Astro Trips',
    category: 'Startup',
    tags: ['Startup', 'Illustration', 'Brand Identity'],
    desc: 'Founded and art-directed Astro Trips — an NFT project merging original illustration with digital collectibles and community world-building. Developed the full visual universe: character design, colour systems, narrative lore, and the brand identity that held it all together. Astro Trips was an early experiment in building a brand-first digital community — before the project, the world.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
  },
  {
    id: 12,
    title: 'GoGal',
    category: 'Startup',
    tags: ['Startup', 'Brand Identity', 'Product Design'],
    desc: 'Founded and designed GoGal — an invite-only platform for women to connect and travel safely together. Built the full brand identity, product design, and community framework for a trust-first travel app. GoGal was conceived from a real gap: women who want to explore the world but want to do it with people they can actually trust. The brand had to feel safe, fun, and aspirational all at once.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
  },
]

const FILTERS = ['All', 'Brand Identity', 'Web Design', 'Social Media', 'Startup', 'Graphic Design', 'Illustration']

export default function Portfolio() {
  useScrollReveal()
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = filter === 'All'
    ? WORK
    : WORK.filter(w => w.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())))

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="port-hero">
        <div className="port-hero__content">
          <div className="port-hero__overline">Selected Work</div>
          <h1 className="port-hero__title">See results.<br />See reinventions.</h1>
          <p className="port-hero__sub">Brand, web, social, and startup design — every project built with intention.</p>
        </div>
      </section>

      {/* FILTER */}
      <div className="port-filter">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`port-filter__btn ${filter === f ? 'port-filter__btn--active' : ''}`}
            onClick={() => { setFilter(f); setExpanded(null) }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* PROJECT LIST */}
      <section className="port-list-section">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className={`port-row reveal ${expanded === item.id ? 'port-row--open' : ''}`}
            style={{ animationDelay: `${(i % 4) * 0.08}s` }}
          >
            {/* COLLAPSED ROW */}
            <div
              className="port-row__header"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <div className="port-row__num">{String(i + 1).padStart(2, '0')}</div>
              <div className="port-row__thumb">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <div className="port-row__info">
                <h2 className="port-row__title">{item.title}</h2>
                <div className="port-row__tags">
                  {item.tags.map(t => <span key={t} className="port-row__tag">{t}</span>)}
                </div>
              </div>
              <div className="port-row__toggle">
                <span>{expanded === item.id ? '−' : '+'}</span>
              </div>
            </div>

            {/* EXPANDED PANEL */}
            <div className="port-row__body">
              <div className="port-row__image">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <div className="port-row__detail">
                <div className="port-row__category">{item.category}</div>
                <h3 className="port-row__name">{item.title}</h3>
                <p className="port-row__desc">{item.desc}</p>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer" className="btn btn--gold port-row__link">
                    Visit Site ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

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
