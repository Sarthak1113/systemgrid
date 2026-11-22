import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | RPMEngine',
  description: 'Terms governing the access and use of RPMEngine publishing resources.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
        Terms of Service
      </h1>
      <p className="text-xs text-slate-400 mb-8">Last Updated: November 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and browsing RPMEngine, you agree to comply with and be bound by these Terms of Service and all applicable laws and regulations.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          2. Intellectual Property
        </h2>
        <p>
          Original editorial articles, research tables, code examples, and layout designs published on RPMEngine remain the exclusive property of the publication. Re-publishing full articles without written attribution is prohibited.
        </p>
      </div>
    </div>
  );
}
