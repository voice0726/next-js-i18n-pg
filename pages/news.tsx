import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import i18nConfig from 'i18n.json';

const { locales } = i18nConfig;

const News = () => {
  const { t, lang } = useTranslation('news');
  const theOtherLocale = locales.find((l) => l !== lang) || 'ja';

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>
        <Link href="/news" locale={theOtherLocale}>
          <a>Change Locale</a>
        </Link>
      </p>
    </div>
  );
};
export default News;
