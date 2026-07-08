// Vercel serverless function \u2014 lives at /api/contact, works alongside your
// Vite site automatically (Vercel deploys anything in /api/ as a function,
// regardless of frontend framework). No extra dependency needed \u2014 talks to
// Resend's REST API directly with fetch.
//
// Requires one environment variable, set in Vercel:
//   Project Settings \u2192 Environment Variables \u2192 RESEND_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, message } = req.body || {};

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Domain verified in Resend is agency.dreamxanadu.com (a subdomain),
        // so the mailbox name goes before that, not "agency@" itself.
        from: 'Xan Orchid <hello@agency.dreamxanadu.com>',
        to: ['orchid.alexandra.jane@gmail.com'],
        reply_to: email,
        subject: `New inquiry from ${firstName} ${lastName || ''}`.trim(),
        text: `Name: ${firstName} ${lastName || ''}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resend error:', errText);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
