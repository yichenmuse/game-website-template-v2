import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {siteConfig} from '@/lib/config/site';
import { getHomeSettings } from '@/lib/utils/game-box-settings';
import Link from 'next/link';
import Image from 'next/image';
import {GameCategorySection} from '@/lib/components/game-category';

export const dynamic = 'force-static'
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
  const settings = await getHomeSettings(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="bg-black pt-5 pb-5">
      <div className="container mx-auto px-4">
        {/* 推荐游戏区域 */}
        {settings.recommended.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('Featured games')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {settings.recommended.map((game) => (
                <Link 
                  key={game.url} 
                  href={game.url}
                  className="block group relative aspect-video overflow-hidden rounded-lg"
                >
                  <Image
                    src={game.cover || '/placeholder-game.png'}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white font-bold">{game.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 游戏分类区域 */}
        <div className="space-y-8">
          {settings.categories.map((category) => (
            <GameCategorySection
              key={category.name}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}