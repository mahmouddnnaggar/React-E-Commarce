import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

import sliderImage1 from '../../assets/images/slider-image-1.jpeg';
import sliderImage2 from '../../assets/images/slider-image-2.jpeg';
import sliderImage3 from '../../assets/images/slider-image-3.jpeg';

export default function HomeSlider() {
  return (
    <div className="grid grid-cols-12 overflow-hidden rounded shadow">
      <div className="col-span-8">
        <Swiper
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <img
              className="w-full h-[500px] object-cover"
              src={sliderImage3}
              alt="slider image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full h-[500px] object-cover"
              src={sliderImage1}
              alt="slider image"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="col-span-4">
        <img
          className="w-full h-[250px]  object-cover"
          src={sliderImage1}
          alt="slider image"
        />
        <img
          className="w-full h-[250px]  object-cover"
          src={sliderImage2}
          alt="slider image"
        />
      </div>
    </div>
  );
}
