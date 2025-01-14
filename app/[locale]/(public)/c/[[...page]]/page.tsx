import { alternatesLanguage, defaultLocale, locales } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/config/site';
import { getHomeSettings } from '@/lib/utils/game-box-settings';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from 'next/link';

export const dynamic = 'force-static'

type Props = {
  params: {
    locale: string;
    page: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = defaultLocale, page } = params;
  setRequestLocale(locale);
  const settings = await getHomeSettings(locale);
  const categoryName = page[0];
  const currentPage = page.length > 1 ? parseInt(page[1]) || 1 : 1;
  const category = settings.categories.find(c => c.path === `/c/${categoryName}`);
  
  if (!category) {
    return {};
  }

  const t = await getTranslations({ locale });
  let url = `/c/${categoryName}`;
  if (currentPage > 1) {
    url = `/c/${categoryName}/${currentPage}`;
  }

  return {
    title: `${category.name} ${currentPage > 1 ? `- ${t('Page')} ${currentPage}` : ''} | ${siteConfig.name}`,
    description: category.description || t('description'),
    alternates: {
      languages: alternatesLanguage(url),
    },
    icons: {
      icon: siteConfig.icon,
      apple: siteConfig.appleIcon,
    },
  };
}

export async function generateStaticParams() {
  const allParams = [];
  for (const locale of locales) {
    const settings = await getHomeSettings(locale);
    
    for (const category of settings.categories) {
      const categoryName = category.path.split('/').pop();
      const totalGames = category.games?.length || 0;
      const totalPages = Math.ceil(totalGames / category.pageSize);
      
      // 生成分类的首页
      allParams.push({ locale, page: [categoryName!] });
      
      // 生成分页页面
      for (let page = 2; page <= totalPages; page++) {
        allParams.push({ locale, page: [categoryName!, page.toString()] });
      }
    }
  }
  return allParams;
}

export default async function Page({ params }: Props) {
  const { locale = defaultLocale, page } = params;
  setRequestLocale(locale);
  
  const settings = await getHomeSettings(locale);
  const t = await getTranslations({ locale });
  const categoryName = page[0];
  const currentPage = page.length > 1 ? parseInt(page[1]) || 1 : 1;
  
  const category = settings.categories.find(c => c.path === `/c/${categoryName}`);
  
  if (!category) {
    notFound();
  }
  
  const games = category.games || [];
  const totalPages = Math.ceil(games.length / category.pageSize);
  const startIndex = (currentPage - 1) * category.pageSize;
  const endIndex = startIndex + category.pageSize;
  const currentGames = games.slice(startIndex, endIndex);

  // 生成分页链接
  const paginationLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push({
      page: i,
      url: i === 1 ? `/c/${categoryName}` : `/c/${categoryName}/${i}`,
      isCurrent: i === currentPage
    });
  }

  return (
    <div className="bg-black min-h-screen pt-5 pb-5">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          {category.icon && (
            <Image
              src={category.icon}
              alt={category.name}
              className="w-8 h-8"
            />
          )}
          <h1 className="text-2xl font-bold">{category.name}</h1>
        </div>
        
        {category.description && (
          <p className="text-default-500 mb-6">{category.description}</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          {currentGames.map((game) => (
            <Card
              key={game.url}
              as={Link}
              href={game.url}
              className="w-full cursor-pointer"
              isPressable
            >
              <CardBody className="p-0">
                <Image
                  src={game.cover || '/placeholder-game.png'}
                  alt={game.title}
                  className="aspect-square object-cover w-full"
                />
              </CardBody>
              <CardFooter className="justify-between">
                <b className="text-sm truncate">{game.title}</b>
              </CardFooter>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="flex justify-center gap-2" aria-label="Pagination">
            {currentPage > 1 && (
              <Link
                href={currentPage === 2 ? `/c/${categoryName}` : `/c/${categoryName}/${currentPage - 1}`}
                className="px-4 py-2 border rounded-lg hover:bg-gray-800"
              >
                {t('Previous')}
              </Link>
            )}
            
            {paginationLinks.map(({ page, url, isCurrent }) => (
              <Link
                key={page}
                href={url}
                className={`px-4 py-2 border rounded-lg ${
                  isCurrent 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-800'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {page}
              </Link>
            ))}
            
            {currentPage < totalPages && (
              <Link
                href={`/c/${categoryName}/${currentPage + 1}`}
                className="px-4 py-2 border rounded-lg hover:bg-gray-800"
              >
                {t('Next')}
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
