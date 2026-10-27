import { useState, type FormEvent } from 'react';
import { Page } from './Layout';
import { Hero, QuizHead, Middle, BookLeft } from '../pages/HomeParts';

const OPTS = [
  { label: 'Our website looks outdated', title: 'Brand + Website', why: 'Your website is your first impression. I would refresh your brand and build a modern site that shows customers exactly why you are worth it.', items: ['A brand that looks like you today', 'A fast, custom website that works on phones', 'A contact form that reaches your inbox'] },
  { label: 'Our social media is quiet or inconsistent', title: 'The Content Engine', why: 'Consistency beats perfection. I would plan your month, create the reels and posts, write the captions, and keep your feed alive while you run the business.', items: ['A monthly content calendar', 'Reels, carousels and posts made for you', 'You approve everything before it goes out'] },
  { label: 'People see us but don’t book', title: 'Growth: ads + email', why: 'Attention without a next step is wasted. I would set up focused Meta ads and email campaigns that point people straight to booking or buying.', items: ['Targeted Facebook and Instagram ads', 'Email campaigns to the list you already have', 'Clear, simple monthly results'] },
  { label: 'I’m doing everything myself', title: 'AI Systems', why: 'You should not be the bottleneck. I would build custom Claude workflows around how you already work, so the repetitive parts get drafted for you.', items: ['Content and caption workflows', 'Outreach and follow-up drafts', 'Training so you and your team own it'] },
  { label: 'Honestly? All of the above', title: 'The full studio', why: 'Then we do it in order: brand and website first, then a content engine to keep it alive, with growth layered on once the foundation is strong.', items: ['Brand + Website to start', 'Monthly content to keep it alive', 'Ads and email when you are ready to grow'] },
];
const NEEDS = ['Branding', 'Website', 'Social content', 'Reels & video', 'Ads + email', 'AI Systems', 'Not sure yet'];
// Quiz answer -> interests pre-selected in the booking form
const QUIZ_NEEDS = [['Branding', 'Website'], ['Social content', 'Reels & video'], ['Ads + email'], ['AI Systems'], ['Branding', 'Website', 'Social content', 'Ads + email']];
const eyebrow = { fontSize: 11, color: '#ECCBF4' } as const;

export default function Home() {
  const [pick, setPick] = useState(-1);
  const [needs, setNeeds] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const toggleNeed = (l: string) => setNeeds((cur) => {
    if (l === 'Not sure yet') return cur.includes(l) ? [] : [l];
    const base = cur.filter((x) => x !== 'Not sure yet');
    return base.includes(l) ? base.filter((x) => x !== l) : [...base, l];
  });
  const pickQuiz = (i: number) => { setPick(i); setNeeds(QUIZ_NEEDS[i]); };
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const ans = pick >= 0 ? OPTS[pick] : null;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const get = (k: string) => String(f.get(k) || '').trim();
    setStatus('sending');
    setErrMsg('');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: get('name'), email: get('email'), business: get('business'), website: get('website'),
          interests: NEEDS.filter((n) => needs.includes(n)), challenge: pick >= 0 ? OPTS[pick].label : '',
          message: get('message'), company_url: get('company_url'),
        }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || 'send failed');
      }
      setStatus('sent');
      form.reset();
      setNeeds([]);
    } catch (err) {
      setErrMsg(err instanceof Error && err.message !== 'send failed' ? err.message : '');
      setStatus('error');
    }
  }

  return (
    <Page title="Xan Orchid Studio — Brand, Web & Content" cta={false}>
      <div id="top" />
      <Hero />
      <section id="quiz" style={{ background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(88px, 11vw, 150px) clamp(20px, 5vw, 56px)' }}>
          <QuizHead />
          <div className="quizgrid stg" role="group" aria-label="Choose your biggest challenge" style={{ margin: '56px auto 0', maxWidth: 1240 }}>
            {OPTS.map((o, i) => {
              const on = pick === i;
              return (
                <button key={o.label} type="button" className="opt" onClick={() => pickQuiz(i)} aria-pressed={on} style={{ textAlign: 'left', minHeight: 120, padding: 24, borderRadius: 18, border: `1.5px solid ${on ? '#4B1957' : 'rgba(75,25,87,0.16)'}`, background: on ? '#4B1957' : '#FBF6FC', color: on ? '#FFFFFF' : '#2B1230', cursor: 'pointer', fontFamily: "'Jost', sans-serif", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
                  <span className="sans" style={{ flexShrink: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', opacity: 0.7 }}>0{i + 1}</span>
                  <span style={{ fontSize: 19, lineHeight: 1.35, fontWeight: 400 }}>{o.label}</span>
                </button>
              );
            })}
          </div>
          {ans && (
            <div key={pick} className="answer iri-ring" role="status" style={{ margin: '28px auto 0', maxWidth: 1080, borderRadius: 24, background: '#4B1957', color: '#FFFFFF', padding: 'clamp(32px, 4vw, 56px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 340px', minWidth: 0 }}>
                <p className="eyebrow" style={{ margin: 0, color: '#ECCBF4' }}>Here's what I'd do</p>
                <p className="disp iri-l" style={{ margin: '18px 0 0', fontSize: 'clamp(32px, 3.6vw, 50px)', lineHeight: 1.1 }}>{ans.title}</p>
                <p style={{ margin: '18px 0 0', fontSize: 18, lineHeight: 1.65, color: 'rgba(255,255,255,0.86)' }}>{ans.why}</p>
              </div>
              <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  {ans.items.map((t) => <li key={t} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.2)', fontSize: 16 }}><span aria-hidden="true" style={{ color: '#ECCBF4' }}>✓</span><span>{t}</span></li>)}
                </ul>
                <a href="#book" className="btn sans" style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '0 26px', borderRadius: 999, background: '#ECCBF4', color: '#4B1957', fontWeight: 600, fontSize: 14, letterSpacing: '0.03em' }}>Talk about this on a free call <span aria-hidden="true">→</span></a>
              </div>
            </div>
          )}
        </div>
      </section>
      <Middle />
      <section id="book" style={{ background: '#4B1957', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <span className="disp iri-l" aria-hidden="true" style={{ position: 'absolute', right: -40, bottom: -120, fontSize: 420, lineHeight: 1, color: '#FFFFFF', opacity: 0.14, pointerEvents: 'none' }}>XO</span>
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(96px, 12vw, 170px) clamp(20px, 5vw, 56px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(48px, 6vw, 96px)' }}>
          <BookLeft />
          <form className="rv" onSubmit={submit} style={{ flex: '1 1 440px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <label style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 4 }}><span className="eyebrow" style={eyebrow}>Name</span><input className="field" type="text" name="name" autoComplete="name" required /></label>
              <label style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 4 }}><span className="eyebrow" style={eyebrow}>Email</span><input className="field" type="email" name="email" autoComplete="email" required /></label>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <label style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 4 }}><span className="eyebrow" style={eyebrow}>Business name</span><input className="field" type="text" name="business" autoComplete="organization" /></label>
              <label style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 4 }}><span className="eyebrow" style={eyebrow}>Current website <span style={{ opacity: 0.8, letterSpacing: '0.1em' }}>(if any)</span></span><input className="field" type="text" name="website" inputMode="url" placeholder="yourbusiness.com" /></label>
            </div>
            <input type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />
            <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
              <legend className="eyebrow" style={{ ...eyebrow, marginBottom: 14 }}>I'm interested in <span style={{ opacity: 0.8, letterSpacing: '0.1em' }}>(pick all that apply)</span></legend>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {NEEDS.map((l) => {
                  const on = needs.includes(l);
                  return <button key={l} type="button" className="btn" onClick={() => toggleNeed(l)} aria-pressed={on} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '0 18px', borderRadius: 999, border: `1px solid ${on ? '#ECCBF4' : 'rgba(255,255,255,0.4)'}`, background: on ? '#ECCBF4' : 'transparent', color: on ? '#4B1957' : '#FFFFFF', font: "400 15px 'Jost', sans-serif", cursor: 'pointer' }}>{on && <span aria-hidden="true">✓</span>}{l}</button>;
                })}
              </div>
            </fieldset>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span className="eyebrow" style={eyebrow}>Anything else?</span><textarea className="field" name="message" rows={3} style={{ resize: 'vertical' }} /></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <button type="submit" disabled={status === 'sending'} className="btn sans" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '0 32px', borderRadius: 999, border: 0, background: '#ECCBF4', color: '#4B1957', fontWeight: 700, fontSize: 14, letterSpacing: '0.04em', cursor: 'pointer' }}>{status === 'sending' ? 'Sending…' : 'Book my free call'} <span aria-hidden="true">→</span></button>
              <span role="status" style={{ fontSize: 15, color: '#ECCBF4' }}>
                {status === 'sent' && 'Thank you — it’s in my inbox. I’ll reply within two business days.'}
                {status === 'error' && (errMsg || 'Something went wrong. Email me at orchid.alexandra.jane@gmail.com.')}
              </span>
            </div>
          </form>
        </div>
      </section>
    </Page>
  );
}
