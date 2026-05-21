const { loadEnv } = require('../../integrations/core/load-env');

loadEnv();

async function sendEmail({ subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REMINDER_EMAIL_TO;
  const from = process.env.REMINDER_EMAIL_FROM;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY manquant dans .env');
  }
  if (!to) {
    throw new Error('REMINDER_EMAIL_TO manquant dans .env');
  }
  if (!from) {
    throw new Error('REMINDER_EMAIL_FROM manquant dans .env');
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
    }),
  });

  const body = await res.text();
  let json;
  try {
    json = JSON.parse(body);
  } catch {
    json = { raw: body };
  }

  if (!res.ok) {
    const err = new Error(`Resend HTTP ${res.status}: ${body}`);
    err.response = json;
    throw err;
  }

  return json;
}

module.exports = { sendEmail };
