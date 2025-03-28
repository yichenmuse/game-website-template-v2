import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { defaultLocale } from '@/lib/i18n/locales';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: defaultLocale }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return {
    title: t('action.title'),
    description: t('action.description'),
  };
}

export default async function ActionPage({ params }: Props) {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{t('action.title')}</h1>
      <div className="prose max-w-none">
        {t('action.content')}
      </div>
    </div>
  );
} 