import IframeButton from '@/lib/components/iframe_button';
import { defaultLocale } from '@/lib/i18n/locales';
import { getPathnameWithLocale } from '@/lib/i18n/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default async function Home({ params: { locale = defaultLocale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('Home');
  const iframeUrl = getPathnameWithLocale('/playground', locale);
  return (
    <div className="bg-black text-white flex flex-col items-center justify-center p-4 pt-0">
      <div className=" text-gray-100 p-6 pt-2 max-w-6xl mx-auto rounded-lg shadow-lg w-full">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-4 text-yellow-300 font-leckerli">
            {t('title')}
          </h1>
          <p className="text-sm md:text-xl mb-4 text-gray-200 w-full max-w-3xl mx-auto text-center">
            {t('description')}
          </p>
        </div>
      </div>
      <div className="rounded w-full max-w-6xl 8">
        <iframe
          title={t('iframeTitle')}
          src={iframeUrl}
          allow="accelerometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups-to-escape-sandbox"
          className="w-full min-h-[600px]"
          allowFullScreen
        />
      </div>
      <IframeButton />
    </div>
  );
}
