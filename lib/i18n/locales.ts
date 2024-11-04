import type { LocalePrefix, Pathnames } from 'next-intl/routing';

export const EN = 'en';
export const ZH_CN = 'zh-CN';
export const ZH_TW = 'zh-TW';
export const FR = 'fr';
export const DE = 'de';
export const JA = 'ja';
export const CS = 'cs';
export const ES = 'es';
export const IT = 'it';
export const KO = 'ko';
export const NL = 'nl';
export const PT_BR = 'pt-BR';
export const RU = 'ru';
export const UK = 'uk';
export const VI = 'vi';
export const PT = 'pt';
export const DA = 'da';
export const EL = 'el';
export const NO = 'no';
export const FI = 'fi';
export const SV = 'sv';
export const TH = 'th';
export const ID = 'id';
export const HI = 'hi';
export const BN = 'bn';
export const MS = 'ms';
export const TR = 'tr';
export const AR = 'ar';
export const BG = 'bg';
export const ET = 'et';
export const HE = 'he';
export const HR = 'hr';
export const HU = 'hu';
export const LT = 'lt';
export const LV = 'lv';
export const PL = 'pl';
export const RO = 'ro';
export const SK = 'sk';
export const SL = 'sl';

export const localeNames = {
  [EN]: 'English', // 英语
  [ZH_CN]: '简体中文',
  [ES]: 'Español', // 西班牙语
  [HI]: 'हिन्दी (Hindi)', // 印地语
  [AR]: 'العربية (Arabic)', // 阿拉伯语
  [FR]: 'Français', // 法语
  [BN]: 'বাংলা (Bangla)', // 孟加拉语
  [RU]: 'Русский', // 俄语
  [PT]: 'Português', // 葡萄牙语
  [PT_BR]: 'Português do Brasil', // 巴西葡萄牙语
  [ID]: 'Bahasa Indonesia', // 印度尼西亚语
  [DE]: 'Deutsch', // 德语
  [JA]: '日本語', // 日语
  [TR]: 'Türkçe', // 土耳其语
  [VI]: 'Tiếng Việt', // 越南语
  [TH]: 'ไทย (Thai)', // 泰语
  [KO]: '한국어', // 韩语
  [IT]: 'Italiano', // 意大利语
  [PL]: 'Polski', // 波兰语
  [UK]: 'Українська', // 乌克兰语
  [NL]: 'Nederlands', // 荷兰语
  [MS]: 'Bahasa Melayu', // 马来语
  [ZH_TW]: '繁体中文', // 繁体中文
  [RO]: 'Română', // 罗马尼亚语
  [EL]: 'Ελληνικά (Elliniká)', // 希腊语
  [CS]: 'Čeština', // 捷克语
  [SV]: 'Svenska', // 瑞典语
  [HU]: 'Magyar', // 匈牙利语
  [BG]: 'Български', // 保加利亚语
  [HE]: 'עברית (Hebrew)', // 希伯来语
  [DA]: 'Dansk', // 丹麦语
  [FI]: 'Suomi', // 芬兰语
  [SK]: 'Slovenčina', // 斯洛伐克语
  [NO]: 'Norsk', // 挪威语,
  [HR]: 'Hrvatski', // 克罗地亚语
  [LT]: 'Lietuvių', // 立陶宛语
  [SL]: 'Slovenščina', // 斯洛文尼亚语
  [LV]: 'Latviešu', // 拉脱维亚语
  [ET]: 'Eesti', // 爱沙尼亚语
  // "fa": 'فارسی (Farsi)', // 波斯语 （从右往左）
} as Record<string, string>;

export const defaultLocale = 'en' as const;

// 所有语言列表的标识代码，不含具体语言名称
export const locales: readonly string[] = Object.keys(localeNames);
// console.log("当前语言列表",locales)
// 完全依赖url的locale detection禁用cookie detection。避免用户在输入url时，因为cookie导致切换到cookie记录的语言
export const localeDetection = false as const;
export const pathnames: Pathnames<typeof locales> = {};
// as-needed means that the locale prefix is only added to the pathname if it is not already present.
export const localePrefix: LocalePrefix<typeof locales> = 'as-needed' as LocalePrefix;

export type I18nLocales = { key: string; name: string }[];

export const getCurrentLocaleName = (locale: string) => {
  return localeNames[locale];
};

// 生成多语言的alternates
export function alternatesLanguage(subPath: string) {
  const path = process.env.UE_WEB_URL;
  const languages: Record<string, string> = {};
  locales.forEach((lang) => {
    languages[lang] = lang === defaultLocale ? `${path}${subPath}` : `${path}/${lang}${subPath}`;
  });
  return languages;
}

export function alternatesCanonical(locale: string, subPath: string, page?: string) {
  const path = process.env.UE_WEB_URL;
  const withPages = page ? `/${page}` : '';
  return `${path}${defaultLocale === locale ? '' : `/${locale}`}${subPath}${withPages}`;
}

export const port = process.env.PORT || 8000;
export const host = process.env.UE_WEB_URL ? `https://${process.env.UE_WEB_URL}` : `http://localhost:${port}`;
