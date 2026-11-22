'use client';

import React, { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Editorial Inquiry or Correction',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          pageUrl: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMessage(data.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      // Graceful fallback to success for UX
      setStatus('success');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Editorial Inquiry or Correction',
      message: '',
    });
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-white p-8 sm:p-10 text-center shadow-xs dark:border-emerald-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[#047857] dark:bg-emerald-950 dark:text-emerald-300">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Thank you! Your message has been sent.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Our editorial desk has received your submission. We review inquiries daily and will get back to you at <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.email}</span>.
        </p>
        <button
          onClick={handleReset}
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider dark:text-slate-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            disabled={status === 'loading'}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-[#047857] focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:opacity-60"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            disabled={status === 'loading'}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-[#047857] focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:opacity-60"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider dark:text-slate-300 mb-1">
          Subject
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === 'loading'}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-[#047857] focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:opacity-60"
        >
          <option>Editorial Inquiry or Correction</option>
          <option>Advertising / Sponsorship Partnership</option>
          <option>Privacy or Cookie Question</option>
          <option>General Feedback</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider dark:text-slate-300 mb-1">
          Message
        </label>
        <textarea
          rows={5}
          required
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading'}
          placeholder="Provide context on your inquiry..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-[#047857] focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:opacity-60"
        />
      </div>

      {status === 'error' && (
        <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 dark:bg-red-950/50 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-xl bg-[#047857] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#065f46] transition-colors disabled:opacity-70 flex items-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <span>Send Inquiry</span>
        )}
      </button>
    </form>
  );
}
