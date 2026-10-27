import { useEffect, useState } from 'react';

const T = [
  { quote: 'Working with Xan has been an incredible experience. She supported the marketing efforts for Perfeqtion Imaging & Real Health MD with creativity, professionalism, and exceptional attention to detail. From editing engaging reels for Dr. Jenn with B-roll, to designing beautiful carousel posts and promotional flyers for our email campaigns, every project was delivered on time and exceeded our expectations. Xan is hardworking, reliable, and truly talented.', name: 'Aubry Merkle', company: 'Perfeqtion Imaging & Real Health MD' },
  { quote: 'I can’t say enough about Xan. She has helped us in many different roles — social media marketing, newsletters, blogs, infographics, and even building and maintaining our website. She is great at taking feedback and implements changes quickly and accurately.', name: 'David Diamond', company: 'Diamond Vitality Center' },
  { quote: 'I hired her to build a website for my podcast and coaching business. I had a vague idea of what I wanted, and she took the ball and ran with it. Her work is beautiful, creative and pragmatic. Who could ask for more?', name: 'Marissa K.', company: 'Age Thoughtfully' },
  { quote: 'I’ve worked with Alexandra on several projects including pitch decks, paid media ads, social media posts, and promotional materials. She has a strong design eye, delivers efficiently and on time, and absorbs feedback quickly.', name: 'Leo R.', company: 'Creative Strategic Business Consultant' },
  { quote: 'Our company worked with Xan to rebrand our fragrance website. She was so helpful and knowledgeable throughout. She gave us options and helped us choose the best one. We would highly recommend her to anyone looking to rebrand.', name: 'Leen B.', company: 'Design Hub 95' },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % T.length), 7000);
    return () => clearInterval(t);
  }, [paused]);
  const go = (d: number) => setI((p) => (p + d + T.length) % T.length);
  return (
    <figure className="rv tcar" aria-roledescription="carousel" aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      style={{ margin: 'clamp(72px, 8vw, 110px) auto 0', maxWidth: 980 }}>
      <div style={{ display: 'grid' }} aria-live={paused ? 'polite' : 'off'}>
        {T.map((t, k) => (
          <div key={t.name} aria-hidden={k !== i} className={'tslide' + (k === i ? ' on' : '')} style={{ gridArea: '1 / 1' }}>
            <blockquote className="disp" style={{ margin: 0, fontSize: t.quote.length > 300 ? 'clamp(21px, 2.2vw, 30px)' : 'clamp(24px, 2.7vw, 38px)', lineHeight: 1.35, color: '#2B1230' }}>
              <span className="iri-d">“</span>{t.quote}<span className="iri-d">”</span>
            </blockquote>
            <figcaption style={{ marginTop: 24, fontSize: 15, color: '#4A2A52' }}><span className="sans" style={{ fontWeight: 700, color: '#4B1957' }}>{t.name}</span> — {t.company}</figcaption>
          </div>
        ))}
      </div>
      <div className="tnav" style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 36 }}>
        <button type="button" className="tarrow" onClick={() => go(-1)} aria-label="Previous testimonial">←</button>
        <div style={{ display: 'flex', gap: 10 }}>
          {T.map((t, k) => (
            <button key={t.name} type="button" onClick={() => setI(k)} aria-label={`Testimonial from ${t.name}`} aria-current={k === i}
              className={'tdot' + (k === i ? ' on iri-line' : '')} />
          ))}
        </div>
        <button type="button" className="tarrow" onClick={() => go(1)} aria-label="Next testimonial">→</button>
      </div>
    </figure>
  );
}
