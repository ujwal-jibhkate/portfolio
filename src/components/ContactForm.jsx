import React, { useState } from 'react';

const initialValues = { name: '', email: '', subject: '', message: '' };

const ContactForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState({ ok: null, message: '' });

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email.';
    }
    if (!values.subject.trim()) next.subject = 'Please enter a subject.';
    if (!values.message.trim()) next.message = 'Please enter your message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult({ ok: null, message: '' });

    if (!validate()) return;

    if (!accessKey) {
      setResult({ ok: false, message: 'Web3Forms not configured. Please set VITE_WEB3FORMS_ACCESS_KEY.' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        access_key: accessKey,
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setResult({ ok: true, message: 'Thanks! Your message has been sent.' });
        setValues(initialValues);
        setErrors({});
      } else {
        setResult({ ok: false, message: data.message || 'Sorry, there was an error sending your message.' });
      }
    } catch (err) {
      setResult({ ok: false, message: 'Network error. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={onChange}
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 focus:border-neutral-500 focus:ring-0 text-white px-3 py-2"
            placeholder="Your name"
            required
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 focus:border-neutral-500 focus:ring-0 text-white px-3 py-2"
            placeholder="you@example.com"
            required
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm text-gray-300 mb-1">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={onChange}
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 focus:border-neutral-500 focus:ring-0 text-white px-3 py-2"
          placeholder="How can I help?"
          required
          aria-invalid={!!errors.subject}
        />
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={onChange}
          className="w-full min-h-[140px] rounded-md bg-neutral-900 border border-neutral-700 focus:border-neutral-500 focus:ring-0 text-white px-3 py-2"
          placeholder="Write your message here..."
          required
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 text-white px-4 py-2 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Send Message'}
        </button>
        {result.message && (
          <span className={result.ok ? 'text-green-400 text-sm' : 'text-red-400 text-sm'}>
            {result.message}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500">Your information is only used to reply to your message.</p>
    </form>
  );
};

export default ContactForm;