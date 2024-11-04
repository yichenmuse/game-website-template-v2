import { siteConfig } from '@/lib/config/site';
import { alternatesLanguage } from '@/lib/i18n/locales';
import fs from 'fs/promises';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import path from 'path';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('GuidePage');
  return {
    title: `${t('title')} | ${siteConfig.name}`,
    description: t('description'),
    alternates: {
      languages: alternatesLanguage('guide'),
    },
  };
}

async function getMDXContent(locale: string) {
  try {
    const filePath = path.join(process.cwd(), 'app', '[locale]', '(public)', 'guide', `${locale}.mdx`);
    const source = await fs.readFile(filePath, 'utf-8');
    return source;
  } catch (error) {
    // 如果找不到对应语言的文件，返回英文版本
    if (locale !== 'en') {
      return getMDXContent('en');
    }
    return null;
  }
}

export default async function GuidePage({ params }: Props) {
  const {locale} = await params;
  const content = await getMDXContent(locale);
  
  if (!content) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </article>
    </div>
  );
} 