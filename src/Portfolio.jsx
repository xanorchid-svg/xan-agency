import Nav from './Nav.jsx'
import { useScrollReveal } from './useScrollReveal.js'
import './Portfolio.css'

const WORK = [
  {
    id: 1,
    title: 'Brand Identity',
    client: 'Design Hub 95',
    category: 'Branding',
    desc: 'Full rebrand for a fragrance and design company — new identity system, social media presence, and visual direction.',
    url: 'https://www.dhub95.com/',
    img: 'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
  },
  {
    id: 2,
    title: 'Website Design & Build',
    client: 'Age Thoughtfully',
    category: 'Web Design',
    desc: 'Full website for a podcast and coaching business — designed from a vague brief into a polished, functional site.',
    url: 'https://www.agethoughtfully.com/',
    img: 'https://static.wixstatic.com/media/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg',
  },
  {
    id: 3,
    title: 'Social Media & Web',
    client: 'Diamond Vitality Center',
    category: 'Social Media · Web',
    desc: 'Ongoing support across social media marketing, newsletters, blogs, infographics, and website management.',
    url: 'http://www.diamondvitalitycenter.com',
    img: 'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
  },
  {
    id: 4,
    title: 'Pitch Decks & Paid Media',
    client: 'Strategic Business Consultant',
    category: 'Strategy · Design',
    desc: 'Marketing and business pitch decks, paid media ad creation, social content, and promotional materials.',
    url: null,
    img: 'https://static.wixstatic.com/media/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg',
  },
]

export default function Portfolio() {
  useScrollReveal()

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="port-hero">
        <div className="port-hero__content">
          <div className="port-hero__overline">Selected Work</div>
          <h1 className="port-hero__title">See results.<br />See reinventions.</h1>
          <p className="port-hero__sub">A curated selection of brand, web, and social projects.</p>
        </div>
      </section>

      {/* WORK GRID */}
      <section className="port-grid-section">
        <div className="port-grid">
          {WORK.map((item, i) => (
            <div key={item.id} className={`port-item reveal reveal-delay-${(i % 2) + 1}`}>
              <div className="port-item__image">
                <img src={item.img} alt={item.title} />
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer" className="port-item__visit">
                    Visit Site ↗
                  </a>
                )}
              </div>
              <div className="port-item__meta">
                <span className="port-item__category">{item.category}</span>
                <h2 className="port-item__title">{item.title}</h2>
                <p className="port-item__client">{item.client}</p>
                <p className="port-item__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="port-note reveal">
          <p>More case studies available on request — <a href="/#contact">get in touch</a>.</p>
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
