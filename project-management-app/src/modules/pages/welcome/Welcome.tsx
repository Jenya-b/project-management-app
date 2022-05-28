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
import { slideWrapper } from '../../components/slide/slide';
import { v4 } from 'uuid';

export const Welcome = () => {
  const { token } = useAppSelector((state: RootState) => state.loginReducer);
  const { homePath } = pathToPage;
  const { t } = useTranslation();

  return (
    <div className="container">
      <Swiper
        className="swiper-info"
        direction="vertical"
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={3500}
        modules={[Autoplay, EffectFade]}
      >
        {slideWrapper.map((slide) => (
          <SwiperSlide className="swiper-slide-desc" key={v4()}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
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
        className="swiper-image"
        spaceBetween={30}
        effect={'fade'}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
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
