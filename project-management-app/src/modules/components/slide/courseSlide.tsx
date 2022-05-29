import { useTranslation } from 'react-i18next';
import './index.scss';

export const CourseSlide = () => {
  const { t } = useTranslation();

  return (
    <div className="course-slide">
      <h2 className="course-slide__title">{t('courseReact')}</h2>
      <h3 className="course-slide__subtitle">{t('courseReactTitle')}</h3>
      <p className="course-slide__desc">{t('forWhomCourseReact')}</p>
    </div>
  );
};
