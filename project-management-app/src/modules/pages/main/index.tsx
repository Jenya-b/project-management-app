import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, Pagination, EffectFade } from 'swiper';
import './index.scss';
import { Btn } from '../../components/button/index';

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
        <Btn text="log in"></Btn>
        <Btn text="sign up"></Btn>
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
        <SwiperSlide>
          <div
            className="slide"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2")',
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="slide"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1518655048521-f130df041f66")',
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="slide"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1448932155749-638e51b56f03")',
            }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="slide"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1448932284983-0c7b152eba33")',
            }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
