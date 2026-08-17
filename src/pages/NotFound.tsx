import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buttonClass } from '../components/ui/Button';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="container-page flex flex-col items-center py-28 text-center">
      <p className="text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t('notFound.title')}</h1>
      <p className="mt-2 text-muted-foreground">{t('notFound.desc')}</p>
      <Link to="/" className={buttonClass('primary', 'lg', 'mt-8')}>
        {t('notFound.cta')}
      </Link>
    </div>
  );
}
