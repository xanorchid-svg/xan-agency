import Nav from './Nav.jsx'
import { useScrollReveal } from './useScrollReveal.js'
import './About.css'

const PHOTO_1 = 'https://static.wixstatic.com/media/b80b05_4b81f695dc32416e98f8148f01b06014~mv2.jpg/v1/fill/w_600,h_900,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_2061_JPG.jpg'
const PHOTO_2 = 'https://static.wixstatic.com/media/b80b05_9ce31db91e124350895756cffa3ad5f3~mv2.jpg/v1/crop/x_200,y_0,w_1503,h_1815/fill/w_600,h_725,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4I5A1372_JPG.jpg'

const VALUES = [
  { word: 'Passion', desc: 'Obsessed with creating exceptional social media experiences.' },
  { word: 'Innovation', desc: 'Embracing new trends and technologies to stay ahead of the curve.' },
  { word: 'Collaboration', desc: 'Believing in the power of teamwork and genuine partnership.' },
  { word: 'Results', desc: "Client success is the ultimate measure of everything I do." },
  { word: 'Authenticity', desc: 'Valuing genuine connections and honest communication, always.' },
  { word: 'Empathy', desc: 'Understanding your world before designing for it.' },
]

export default function About() {
  useScrollReveal()

  return (
    <>
      <Nav />

      {/* ABOUT HERO */}
      <section className="about-hero">
        <div className="about-hero__content">
          <div className="about-hero__overline">About</div>
          <h1 className="about-hero__name">XAN ORCHID</h1>
          <p className="about-hero__role">Creative Entrepreneur & Brand Strategist</p>
        </div>
        <div className="about-hero__photos">
          <div className="about-hero__photo about-hero__photo--1">
            <img src={PHOTO_1} alt="Xan Orchid" />
          </div>
          <div className="about-hero__photo about-hero__photo--2">
            <img src={PHOTO_2} alt="Xan Orchid" />
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="about-bio">
        <div className="about-bio__inner">
          <div className="about-bio__col about-bio__col--left">
            <div className="about-bio__overline reveal">The Story</div>
            <h2 className="about-bio__title reveal reveal-delay-1">Graphic Design<br />&amp; Strategy</h2>
            <div className="about-bio__accent reveal reveal-delay-2">
              Leeds School of Business<br />
              <span>B.S. Business Administration, 2025</span>
            </div>
          </div>
          <div className="about-bio__col about-bio__col--right">
            <p className="about-bio__p reveal">
              Xan is a Hockaday School alum and a recent graduate of the University of Colorado Boulder's Leeds School of Business, where she earned a Bachelor of Science in Business Administration in May 2025. She focused her studies on Entrepreneurship and Management, with a minor in Creative Technology and Media Design, and holds a certificate in Ethical, Responsible, and Sustainable Business.
            </p>
            <p className="about-bio__p reveal reveal-delay-1">
              While at CU Boulder, Xan was accepted into the Women's Empowerment Initiative — a selective program for 40 women in the business school, learning from successful female leaders who have founded companies or achieved C-Suite positions.
            </p>
            <p className="about-bio__p reveal reveal-delay-2">
              During her study abroad in Barcelona, Xan won the New Venture Creation competition with her startup idea, Abrago — an all-in-one platform for organising the study abroad experience. She has since developed several of her own ventures, including GoGal, an invite-only platform for women to connect and travel safely, and an NFT project called Astro Trips.
            </p>
            <p className="about-bio__p reveal reveal-delay-3">
              Xan brought her art into the world of technology in 2020, attending a UX/UI certification course through UC Berkeley. Since then she has built brands, websites, social strategies, and creative campaigns for clients across industries — always leading with design precision and a genuine curiosity for the people she's working with.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="about-values__header">
          <div className="about-values__overline reveal">My Values</div>
          <h2 className="about-values__title reveal reveal-delay-1">What I stand for.</h2>
        </div>
        <div className="about-values__grid">
          {VALUES.map((v, i) => (
            <div key={v.word} className={`value-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="value-card__word">{v.word}</div>
              <p className="value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="about-cta">
        <div className="about-cta__inner">
          <h2 className="about-cta__title reveal">Ready to work together?</h2>
          <a href="/#contact" className="btn btn--gold reveal reveal-delay-1">Get In Touch</a>
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
