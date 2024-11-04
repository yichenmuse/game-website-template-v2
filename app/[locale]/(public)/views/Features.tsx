import { getTranslations } from 'next-intl/server';

export default async function Features() {
  const t = await getTranslations('Features');
  return (
    <section className="mb-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-300 font-leckerli">{t('keyFeaturesTitle')}</h2>
      <ul className="grid grid-cols-2 gap-4">
        {['feature1', 'feature2', 'feature3', 'feature4'].map((feature, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-400">{t(`${feature}Title`)}</h3>
            <p className="text-gray-400">{t(`${feature}Description`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
