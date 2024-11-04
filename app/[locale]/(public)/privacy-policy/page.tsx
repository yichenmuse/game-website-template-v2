import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('PrivacyPolicyPage');
  return {
    title: `${t('title')} | ${siteConfig.name}`,
    description: t('description'),
    alternates: {
      languages: alternatesLanguage('privacy-policy'),
    },
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('PrivacyPolicyPage');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('introduction.title')}</h2>
          <p>{t('introduction.content')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('dataCollection.title')}</h2>
          <ul className="list-disc pl-6">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="mb-2">
                {t(`dataCollection.point${i}`)}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('dataSecurity.title')}</h2>
          <p>{t('dataSecurity.content')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('cookies.title')}</h2>
          <p>{t('cookies.content')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
          <p>{t('contact.content')}</p>
        </section>
      </div>
    </div>
  );
} 