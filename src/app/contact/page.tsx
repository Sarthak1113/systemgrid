import type { Metadata } from 'next';
import { ContactForm } from '../../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Editorial & Advertising | SystemGrid',
  description: 'Reach our editorial desk, report corrections, or inquire about partnerships and sponsorships.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
        Contact Our Editorial Desk
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Have questions regarding our research, advertising partnerships, or content corrections? Fill out the inquiry form below or reach us directly.
      </p>

      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-slate-200">
            Email Desk
          </h4>
          <a
            href="mailto:contact@systemgrid.dev"
            className="mt-1 inline-block text-sm font-semibold text-[#047857] hover:underline dark:text-emerald-400"
          >
            contact@systemgrid.dev
          </a>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-slate-200">
            Mailing Address
          </h4>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Babebir, Nuapada, Odisha
          </p>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
