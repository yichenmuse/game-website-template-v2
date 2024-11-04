import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Desc from './desc';
import Home from './home';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  return {
    title: `${t('title')} | ${t('slogan')}`,
    description: t('description'),
    alternates: {
      languages: alternatesLanguage(''),
    },
    icons: {
      icon: siteConfig.icon,
      apple: siteConfig.appleIcon,
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale = defaultLocale } = await params;
  setRequestLocale(locale);
  return (
    <div className="bg-black pt-5 pb-5 ">
      <Home params={{ locale }} />
      <Desc params={{ locale }} />
    </div>
  );
}
