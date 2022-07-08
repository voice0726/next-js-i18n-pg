import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import i18nConfig from 'i18n.json';

const { locales } = i18nConfig;

const UserIndex = () => {
  const { t, lang } = useTranslation('user');
  const title = t('title');
  const theOtherLocale = locales.find((l) => l !== lang) || 'ja';

  return (
    <div>
      <h1>{title}</h1>
      <p>
        <Link href="/nextjs-internal/api/hello" passHref>
          <a>Api Link</a>
        </Link>
      </p>
      <p>
        <Link href="/user" locale={theOtherLocale}>
          <a>Change Locale</a>
        </Link>
      </p>
    </div>
  );
};
export default UserIndex;
