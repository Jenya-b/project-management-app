import { useTranslation } from 'react-i18next';
import './index.scss';

export const ProjectSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="project-slide">
      <h1 className="project-slide__title">{t('projectManagementApp')}</h1>
      <p className="project-slide__desc">{t('aboutTheProject')}</p>
    </div>
  );
};
