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
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
        Have questions regarding our research, advertising partnerships, or content corrections? Fill out the inquiry form below.
      </p>

      <ContactForm />
    </div>
  );
}
