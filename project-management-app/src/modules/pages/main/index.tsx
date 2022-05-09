import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectFade } from 'swiper';
import './index.scss';
import { PrimaryBtn } from '../../components/button/index';
import { images } from '../../constants/constMain';

export const Main = () => {
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
        <PrimaryBtn text="log in"></PrimaryBtn>
        <PrimaryBtn text="sign up"></PrimaryBtn>
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
        className="mySwiper"
      >
        {images.map((image) => (
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
