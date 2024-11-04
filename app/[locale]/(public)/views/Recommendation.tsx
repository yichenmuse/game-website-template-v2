import { siteConfig } from '@/lib/config/site';
import { PropsWithLocale, RecommendationItem } from '@/lib/types';
import { Card, CardHeader, CardTitle } from '@/lib/ui/components/card';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

// 游戏推荐组件
export default async function Recommendation({ locale }: PropsWithLocale) {
  if (!siteConfig.isShowRecommendation) {
    return <></>;
  }

  const t = await getTranslations('HomeRecommendation');
  try {
    const games = (await import(`@/resources/recommendation/${locale}.json`)).default as RecommendationItem[];
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link href={game.url} key={game.title} target="_blank" rel="noopener noreferrer">
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="relative w-full h-48">
                    <Image src={game.cover} alt={game.title} fill className="object-cover rounded-t-lg" />
                  </div>
                  <CardTitle className="mt-4">{game.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (e) {}
}
