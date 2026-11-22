import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertising & Affiliate Disclaimer | RPMEngine',
  description: 'Official advertising disclosure and earnings disclaimer.',
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
        Advertising & Earnings Disclaimer
      </h1>
      <p className="text-xs text-slate-400 mb-8">Last Updated: November 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Advertising Disclosure
        </h2>
        <p>
          This website contains contextual display advertising, paid sponsorships, and affiliate partnerships. All advertisements served through Google AdSense are labeled with &quot;Advertisement&quot; or &quot;Sponsored&quot; in compliance with Federal Trade Commission (FTC) guidelines and Google Publisher Policies.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          No Financial or Legal Advice
        </h2>
        <p>
          The content on this publication is provided for informational and educational purposes only. Technical implementations, benchmarks, and RPM figures reflect observed industry data and do not guarantee specific income outcomes.
        </p>
      </div>
    </div>
  );
}
