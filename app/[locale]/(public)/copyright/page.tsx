import {notFound} from 'next/navigation';
import MdxArticle from '@/lib/components/mdx-article';
import matter from 'gray-matter'
const components: any = {
  img: ({src, alt}: { src: string, alt: string }) => {
      return <img src={src} alt={alt} className="object-cover"/>
  }
}
export default async function StrategyPage({params}: {params: Promise<{locale: string}>}) {
  try {
    const {locale} = await params;
    // 直接导入 MDX 文件的原始内容
    const Content = (await import(`!!raw-loader!./${locale}.mdx`)).default;
    const { data: frontMatter, content } = matter(Content);
    console.log("###Content", frontMatter);
    return <MdxArticle components={components} source={content} className="max-w-full"/>;
  } catch (error) {
    console.log("###error", error);
    notFound();
  }
}