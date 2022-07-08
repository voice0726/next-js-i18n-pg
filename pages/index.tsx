import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

const Home: NextPage = () => {
  const { t } = useTranslation('home');
  const title = t('title');
  console.log(title);

  return (
    <div>
      <div>{title}</div>
      <Link href="/api/hello" passHref>
        <a>api link</a>
      </Link>
    </div>
  );
};

export default Home;
