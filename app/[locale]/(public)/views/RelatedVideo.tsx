import { siteConfig } from '@/lib/config/site';
import { Card, CardContent } from '@/lib/ui/components/card';
import { getTranslations } from 'next-intl/server';

export default async function RelatedVideo() {
  if (!siteConfig.isShowVideo) {
    return <></>;
  }
  const t = await getTranslations('HomeRelatedVideo');

  try {
    const videos = siteConfig.videos;
    return (
      <div className="w-full px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map(({ url, title }, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={url}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-t-lg"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <></>;
  }
}
