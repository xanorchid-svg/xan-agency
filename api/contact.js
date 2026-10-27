// Vercel serverless function at /api/contact. Sends the booking form to Xan via
// Resend's REST API. Requires RESEND_API_KEY in Vercel environment variables.

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (s, max = 2000) => String(s ?? '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const b = req.body || {};
  // New form fields (older clients sent firstName/lastName/message only).
  const name = clean(b.name || [b.firstName, b.lastName].filter(Boolean).join(' '), 120);
  const email = clean(b.email, 200);
  const business = clean(b.business, 200);
  const website = clean(b.website, 300);
  const interests = (Array.isArray(b.interests) ? b.interests : []).map((x) => clean(x, 60)).filter(Boolean).slice(0, 10);
  const challenge = clean(b.challenge, 200);
  const message = clean(b.message, 5000);
  if (clean(b.company_url)) return res.status(200).json({ success: true }); // honeypot

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please add your name and a valid email.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const site = website && !/^https?:\/\//i.test(website) ? `https://${website}` : website;
  const rows = [
    ['Name', esc(name)],
    ['Email', `<a href="mailto:${esc(email)}" style="color:#4B1957">${esc(email)}</a>`],
    ['Business', esc(business) || '—'],
    ['Current website', site ? `<a href="${esc(site)}" style="color:#4B1957">${esc(website)}</a>` : 'None yet'],
    ['Interested in', interests.length ? interests.map((i) => `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 12px;border-radius:999px;background:#ECCBF4;color:#4B1957;font-size:13px">${esc(i)}</span>`).join('') : 'Not sure yet'],
    ...(challenge ? [['Biggest challenge', esc(challenge)]] : []),
  ];
  const html = `<!doctype html><html><body style="margin:0;background:#FBF6FC;font-family:Helvetica,Arial,sans-serif;color:#2B1230">
<div style="max-width:600px;margin:0 auto;padding:32px 20px">
<div style="background:#4B1957;color:#fff;border-radius:16px 16px 0 0;padding:24px 28px">
<div style="font-family:Georgia,serif;font-size:28px;color:#ECCBF4">XO</div>
<div style="margin-top:6px;font-size:18px">New free-call request</div></div>
<div style="background:#fff;border-radius:0 0 16px 16px;padding:8px 28px 28px;border:1px solid #ECCBF4;border-top:0">
<table style="width:100%;border-collapse:collapse;font-size:15px">${rows.map(([k, v]) => `<tr><td style="padding:14px 12px 14px 0;border-bottom:1px solid #F1E3F5;color:#6E4A78;font-size:12px;letter-spacing:.12em;text-transform:uppercase;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:14px 0;border-bottom:1px solid #F1E3F5;vertical-align:top">${v}</td></tr>`).join('')}</table>
<div style="margin-top:22px;color:#6E4A78;font-size:12px;letter-spacing:.12em;text-transform:uppercase">Anything else</div>
<div style="margin-top:8px;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(message) || '—'}</div>
<div style="margin-top:28px"><a href="mailto:${esc(email)}?subject=${encodeURIComponent('Your free call with Xan Orchid Studio')}" style="display:inline-block;background:#4B1957;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px">Reply to ${esc(name.split(' ')[0])}</a></div>
</div><div style="text-align:center;margin-top:16px;color:#8A4C9A;font-size:12px">Sent from the booking form on agency.dreamxanadu.com</div></div></body></html>`;

  const text = [
    `New free-call request`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${business || '—'}`,
    `Current website: ${website || 'None yet'}`,
    `Interested in: ${interests.length ? interests.join(', ') : 'Not sure yet'}`,
    ...(challenge ? [`Biggest challenge: ${challenge}`] : []),
    ``,
    `Anything else:`,
    message || '—',
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Xan Orchid Studio <hello@agency.dreamxanadu.com>',
        to: ['orchid.alexandra.jane@gmail.com'],
        reply_to: email,
        subject: `New inquiry: ${name}${business ? ` — ${business}` : ''}${interests.length ? ` (${interests.join(', ')})` : ''}`.slice(0, 180),
        html,
        text,
      }),
    });
    if (!response.ok) {
      console.error('Resend error:', await response.text());
      return res.status(502).json({ error: 'Failed to send email' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
