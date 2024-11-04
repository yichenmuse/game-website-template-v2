import {notFound} from 'next/navigation';
 
export default async function StrategyPage({params}: {params: Promise<{locale: string}>}) {
  try {
    const {locale} = await params;
    const Content = (await import(`./${locale}.mdx`)).default;
    return <Content />;
  } catch (error) {
    notFound();
  }
}