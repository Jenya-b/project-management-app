import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectFade } from 'swiper';
import './index.scss';
import { PrimaryBtn } from '../../components/button/index';
import { buttonDescription, backgroundImages } from '../../constants/constMain';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RootState } from '../../../store/store';
import { pathToPage } from '../../constants/constRoutes';
import { useTranslation } from 'react-i18next';

export const Welcome = () => {
  const { token } = useAppSelector((state: RootState) => state.loginReducer);
  const { homePath } = pathToPage;
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="title-container">
        <h1 className="title">
          Project <br />
          Management
          <br /> &emsp;&emsp;&emsp;&nbsp;&nbsp;App
        </h1>
      </div>
      <div className="btn-container">
        {token ? (
          <Link to={homePath}>
            <PrimaryBtn variant="contained" text={t('gotoMainPage')} />
          </Link>
        ) : (
          buttonDescription.map((btn) => {
            return (
              <Link key={btn.label} to={btn.link}>
                <PrimaryBtn variant="contained" text={btn.label} />
              </Link>
            );
          })
        )}
      </div>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
      >
        {backgroundImages.map((image) => (
          <SwiperSlide key={image}>
            <div
              className="slide"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
