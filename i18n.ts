import { defaultLocale, locales } from '@/lib/i18n/locales';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`无法加载 ${locale} 的翻译文件，将使用默认语言 ${defaultLocale}`);
    messages = (await import(`@/messages/${defaultLocale}.json`)).default;
  }

  return {
    onError(error: any) {
      console.error('加载国际化内容时出现异常：');
      console.error(error);
    },
    messages,
  };
});
