import { defaultLocale } from '@/lib/i18n/locales';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default async function Desc({ params: { locale = defaultLocale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('desc');

  return (
    <div className="bg-emerald-800 bg-opacity-35 text-gray-100 p-8 max-w-6xl mx-auto rounded-lg shadow-lg border-2 border-opacity-45 border-yellow-300">
      <h1 className="text-2xl md:text-5xl font-bold text-left mb-8 text-yellow-300 font-leckerli">{t('gameTitle')}</h1>

      <div className="flex flex-row mb-8 items-center">
        <section className="flex-grow pr-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-teal-300 font-leckerli">{t('whatIsTitle')}</h2>
          <p className="text-gray-200">{t('whatIsDescription')}</p>
        </section>
        <div className="flex-shrink-0 w-1/3">
          <img
            src="/game_screenshot.webp"
            alt="Game screenshot"
            width="100%"
            height="auto"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-300 font-leckerli">{t('howToPlayTitle')}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>{t('howToPlayStep1')}</li>
          <li>{t('howToPlayStep2')}</li>
          <li>{t('howToPlayStep3')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-300 font-leckerli">
          {t('keyFeaturesTitle')}
        </h2>
        <ul className="grid grid-cols-2 gap-4">
          {['feature1', 'feature2', 'feature3', 'feature4'].map((feature, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-400">{t(`${feature}Title`)}</h3>
              <p className="text-gray-400">{t(`${feature}Description`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-300 font-leckerli">{t('controlsTitle')}</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-purple-400">{t('movementControlsTitle')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t('movementControl1')}</li>
              <li>{t('movementControl2')}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-purple-400 font-leckerli">
              {t('interactionControlsTitle')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t('interactionControl1')}</li>
              <li>{t('interactionControl2')}</li>
              <li>{t('interactionControl3')}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-purple-400 font-leckerli">
              {t('combatControlsTitle')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t('combatControl1')}</li>
              <li>{t('combatControl2')}</li>
              <li>{t('combatControl3')}</li>
              <li>{t('combatControl4')}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-purple-400 font-leckerli">
              {t('miscControlsTitle')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t('miscControl1')}</li>
              <li>{t('miscControl2')}</li>
              <li>{t('miscControl3')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
