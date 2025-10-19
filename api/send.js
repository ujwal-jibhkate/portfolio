import { Resend } from 'resend';

export const config = {
  runtime: 'edge'
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { status: 405, headers: { 'Content-Type': 'application/json' }}
    );
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing Resend API Key');
    }

    const body = await req.json();
    const { from, to, subject, html, text } = body;

    if (!to) {
      throw new Error('Recipient email is required');
    }

    if (!from) {
      throw new Error('Sender email is required');
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      reply_to: from,
      to,
      subject: subject || 'New Contact Form Submission',
      html: html || text,
      text: text || html?.replace(/<[^>]*>/g, '')
    });

    return new Response(
      JSON.stringify({ success: true, data }), 
      { status: 200, headers: { 'Content-Type': 'application/json' }}
    );

  } catch (error) {
    console.error('Resend API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' }}
    );
  }
}