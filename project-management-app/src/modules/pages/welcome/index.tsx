import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectFade } from 'swiper';
import './index.scss';
import { PrimaryBtn } from '../../components/button/index';
import { buttonDescription, backgroundImages } from '../../constants/constMain';

export const Welcome = () => {
  const handleClick = () => {};

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
        {buttonDescription.map((btnText) => (
          <PrimaryBtn key={btnText} variant="contained" text={btnText} onClick={handleClick} />
        ))}
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
