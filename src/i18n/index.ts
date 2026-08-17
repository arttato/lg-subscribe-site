import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import th from '../locales/th.json';
import en from '../locales/en.json';

export const SUPPORTED_LANGS = ['th', 'en'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: th },
      en: { translation: en },
    },
    fallbackLng: 'th',
    defaultNS: 'translation',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lg-sub-lang',
    },
  });

// อัปเดต <html lang> + title ทุกครั้งที่เปลี่ยนภาษา
i18n.on('languageChanged', (lng: string) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = 'ltr';
  document.title = i18n.t('meta.title', { lng });
});

export default i18n;
