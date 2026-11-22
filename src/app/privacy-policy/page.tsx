import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Cookie Disclosure | RPMEngine',
  description: 'Our privacy practices, third-party advertising disclosures, and Google AdSense cookie compliance.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">
        Privacy Policy & Advertising Disclosure
      </h1>
      <p className="text-xs text-slate-400 mb-8">Effective Date: November 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300">
        <p>
          RPMEngine (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy outlines our practices regarding information collection, advertising partnerships, and data protection.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
          1. Google AdSense & Third-Party Advertising
        </h2>
        <p>
          We partner with Google AdSense and third-party ad networks to display advertisements when you visit our website. These companies may use cookies, web beacons, and similar tracking technologies to collect non-personally identifiable information about your visits to this and other websites in order to serve ads tailored to your interests.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>DoubleClick DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads to users based on their visit to our sites and other sites on the Internet.
          </li>
          <li>
            <strong>Opting Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">Google Ads Settings</a> or through the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">Network Advertising Initiative</a>.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
          2. Log Files & Analytics
        </h2>
        <p>
          Like most web platforms, we automatically collect server log files, including IP addresses, browser types, Internet Service Providers (ISPs), referring/exit pages, date/time stamps, and click patterns. This data is used solely to analyze performance trends, administer the site, and improve user navigation.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6">
          3. Contact Information
        </h2>
        <p>
          If you have questions regarding this Privacy Policy or our advertising disclosures, you may contact our privacy coordinator via our <a href="/contact" className="text-emerald-600 underline">Contact Page</a>.
        </p>
      </div>
    </div>
  );
}
