import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PrimaryBtn } from '../../components/button';
import { pathToPage } from '../../constants/constRoutes';
import './index.scss';

export const NotFound = () => {
  const { homePath } = pathToPage;
  const { t } = useTranslation();

  return (
    <main className="main not-found-page">
      <h2 className="not-found-page__title">{t('notFoundTitle')}</h2>
      <p className="not-found-page__desc">{t('notFoundDesc')}</p>
      <Link to={homePath}>
        <PrimaryBtn variant="contained" text={'notFoundButton'} />
      </Link>
    </main>
  );
};
