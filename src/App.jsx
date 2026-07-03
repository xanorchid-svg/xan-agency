import { useEffect, useRef, useState } from 'react'
import Nav from './Nav.jsx'
import { useScrollReveal } from './useScrollReveal.js'
import './App.css'

const PHOTO_1 = 'https://static.wixstatic.com/media/b80b05_4b81f695dc32416e98f8148f01b06014~mv2.jpg/v1/fill/w_600,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_2061_JPG.jpg'
const PHOTO_2 = 'https://static.wixstatic.com/media/b80b05_9ce31db91e124350895756cffa3ad5f3~mv2.jpg/v1/crop/x_200,y_0,w_1503,h_1815/fill/w_600,h_725,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4I5A1372_JPG.jpg'

const SERVICES = [
  {
    num: '01',
    title: 'Social Media Management',
    desc: 'Full-service presence across Meta, LinkedIn, and TikTok. Strategy, scheduling, community management, and growth.',
  },
  {
    num: '02',
    title: 'Content Creation',
    desc: 'Reels, static posts, carousels, and email campaigns — crafted to stop the scroll and convert.',
  },
  {
    num: '03',
    title: 'Brand Strategy & Identity',
    desc: 'Visual identity, positioning, and the full system: logo, palette, voice, and how it all shows up in the world.',
  },
  {
    num: '04',
    title: 'Paid Social Advertising',
    desc: 'Google, Meta, and LinkedIn ad campaigns — built, tested, and optimised for real return.',
  },
  {
    num: '05',
    title: 'Web Design & Development',
    desc: 'Beautiful, functional websites in Figma, Webflow, and React. Built for conversion, not just admiration.',
  },
  {
    num: '06',
    title: 'Community & CRM',
    desc: 'Systems for client acquisition, retention, and community growth. The infrastructure behind lasting brand loyalty.',
  },
]

const TESTIMONIALS = [
  {
    quote: "I can't say enough about Alexandra Orchid's work. I hired her to build a website for my podcast and coaching business. I had a vague idea of what I wanted, and she took the ball and ran with it. Her work is beautiful, creative and pragmatic. I would hire Ms. Orchid again in a minute.",
    name: 'Marissa K.',
    company: 'Age Thoughtfully',
    url: 'https://www.agethoughtfully.com/',
  },
  {
    quote: "Xan has helped us in many different roles — social media marketing, newsletters, blogs, infographics, and building our website. She is great at taking feedback and implements changes quickly and accurately. I highly recommend Xan to anyone needing any of these services.",
    name: 'David Diamond',
    company: 'Diamond Vitality Center',
    url: 'http://www.diamondvitalitycenter.com',
  },
  {
    quote: "I've worked with Alexandra on pitch decks, paid media ads, social media posts, and promotional materials. She has a strong design eye, delivers efficiently and on time, and absorbs feedback quickly. Alexandra's a joy to work with.",
    name: 'Leo R.',
    company: 'Creative Strategic Business Consultant',
    url: null,
  },
  {
    quote: "Xan was so helpful and knowledgeable throughout the entire rebranding process. She gave us options and helped us choose the best one for our business. We had a great experience and would highly recommend her to anyone looking to rebrand.",
    name: 'Leen B.',
    company: 'Design Hub 95',
    url: 'https://www.dhub95.com/',
  },
]

function TestimonialSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const t = TESTIMONIALS[active]

  return (
    <div className="testimonials">
      <div className="testimonials__overline reveal">What Clients Say</div>
      <div className="testimonials__body">
        <div className="testimonials__quote reveal reveal-delay-1" key={active}>
          <span className="testimonials__mark">"</span>
          {t.quote}
          <span className="testimonials__mark">"</span>
        </div>
        <div className="testimonials__attr reveal reveal-delay-2">
          <span className="testimonials__name">{t.name}</span>
          {t.url
            ? <a href={t.url} target="_blank" rel="noreferrer" className="testimonials__company">{t.company}</a>
            : <span className="testimonials__company">{t.company}</span>
          }
        </div>
        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  useScrollReveal()

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sent')
  }

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content">
          <div className="hero__overline">Creative Direction & Strategy</div>
          <h1 className="hero__name">XAN ORCHID</h1>
          <p className="hero__tagline">Here to make your dreams a reality.</p>
          <div className="hero__cta-row">
            <a href="/#contact" className="btn btn--gold">Let's Make Waves</a>
            <a href="/portfolio" className="btn btn--outline">View Work</a>
          </div>
        </div>
        <div className="hero__photos">
          <div className="hero__photo hero__photo--1">
            <img src={PHOTO_1} alt="Xan Orchid" />
          </div>
          <div className="hero__photo hero__photo--2">
            <img src={PHOTO_2} alt="Xan Orchid" />
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee__track">
          {['Web Design', 'Brand Strategy', 'Social Media', 'Content Creation', 'Paid Ads', 'Community', 'Web Design', 'Brand Strategy', 'Social Media', 'Content Creation', 'Paid Ads', 'Community'].map((s, i) => (
            <span key={i} className="marquee__item">
              {s} <span className="marquee__dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="services__header">
          <div className="services__overline reveal">What I Do</div>
          <h2 className="services__title reveal reveal-delay-1">Not just social butterflies.</h2>
          <p className="services__sub reveal reveal-delay-2">Full-spectrum creative and strategic services — from your first impression to your lasting reputation.</p>
        </div>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <div key={s.num} className={`service-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="service-card__num">{s.num}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="portfolio-preview" id="portfolio">
        <div className="portfolio-preview__header">
          <div className="portfolio-preview__overline reveal">Selected Work</div>
          <h2 className="portfolio-preview__title reveal reveal-delay-1">See results.<br />See reinventions.</h2>
        </div>
        <div className="portfolio-preview__grid">
          <a href="/portfolio" className="portfolio-card portfolio-card--wide reveal">
            <img
              src="https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png"
              alt="Portfolio work"
            />
            <div className="portfolio-card__overlay">
              <span>Brand Identity</span>
            </div>
          </a>
          <a href="/portfolio" className="portfolio-card reveal reveal-delay-2">
            <img
              src="https://static.wixstatic.com/media/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg"
              alt="Portfolio work"
            />
            <div className="portfolio-card__overlay">
              <span>Web Design</span>
            </div>
          </a>
          <div className="portfolio-card portfolio-card--cta reveal reveal-delay-3">
            <a href="/portfolio" className="btn btn--gold">Full Portfolio →</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section" id="testimonials">
        <TestimonialSlider />
      </section>

      {/* ABOUT STRIP */}
      <section className="about-strip">
        <div className="about-strip__text">
          <div className="about-strip__overline reveal">About Xan</div>
          <h2 className="about-strip__title reveal reveal-delay-1">Creative entrepreneur.<br />Strategic thinker.</h2>
          <p className="about-strip__body reveal reveal-delay-2">
            CU Boulder Leeds School of Business graduate. Hockaday alum. Barcelona startup competition winner. Women's Empowerment Initiative alumna. Xan brings the precision of business strategy and the instinct of a designer to every project she takes on.
          </p>
          <a href="/about" className="btn btn--outline reveal reveal-delay-3">Read More →</a>
        </div>
        <div className="about-strip__image reveal reveal-delay-2">
          <img src={PHOTO_2} alt="Xan Orchid" />
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact__inner">
          <div className="contact__header">
            <div className="contact__overline reveal">Get In Touch</div>
            <h2 className="contact__title reveal reveal-delay-1">Ready to collaborate?</h2>
            <p className="contact__sub reveal reveal-delay-2">Let's create something epic together.</p>
          </div>
          <form className="contact__form reveal reveal-delay-2" onSubmit={handleSubmit}>
            <div className="contact__row">
              <div className="contact__field">
                <label>First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                  placeholder="Alexandra"
                />
              </div>
              <div className="contact__field">
                <label>Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Orchid"
                />
              </div>
            </div>
            <div className="contact__field">
              <label>Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="hello@yourbrand.com"
              />
            </div>
            <div className="contact__field">
              <label>Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                placeholder="Tell me about your project..."
              />
            </div>
            {formStatus === 'sent'
              ? <div className="contact__success">Message sent. I'll be in touch soon.</div>
              : <button type="submit" className="btn btn--gold">Send Message</button>
            }
          </form>
          <div className="contact__direct reveal">
            <a href="mailto:orchid.alexandra.jane@gmail.com">orchid.alexandra.jane@gmail.com</a>
            <span>·</span>
            <a href="tel:4693603197">(469) 360-3197</a>
          </div>
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
