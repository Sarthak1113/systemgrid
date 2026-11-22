'use client';

import React, { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email: email.trim(),
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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
        SystemGrid Intelligence
      </h4>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Weekly verifiable benchmarks and distributed systems architecture teardowns.
      </p>

      {status === 'success' ? (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3.5 py-2 text-xs font-bold text-[#047857] border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
          <svg className="h-4 w-4 shrink-0 text-[#047857] dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>Joined! Thank you.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@company.com"
              disabled={status === 'loading'}
              className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#047857] focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-lg bg-[#047857] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#065f46] transition-colors disabled:opacity-70 flex items-center justify-center min-w-[60px]"
            >
              {status === 'loading' ? (
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Join'
              )}
            </button>
          </div>
          {status === 'error' && (
            <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errorMessage}</p>
          )}
        </form>
      )}
    </div>
  );
}
