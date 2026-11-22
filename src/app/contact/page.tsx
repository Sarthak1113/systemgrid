import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Editorial & Advertising | SystemGrid',
  description: 'Reach our editorial desk, report corrections, or inquire about direct sponsorships.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
        Contact Our Editorial Desk
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
        Have questions regarding our research, advertising partnerships, or content corrections? Fill out the inquiry form below.
      </p>

      <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider dark:text-slate-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="jane@company.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider dark:text-slate-300 mb-1">
            Subject
          </label>
          <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white">
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
            placeholder="Provide context on your inquiry..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <button
          type="button"
          className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
        >
          Send Inquiry
        </button>
      </form>
    </div>
  );
}
