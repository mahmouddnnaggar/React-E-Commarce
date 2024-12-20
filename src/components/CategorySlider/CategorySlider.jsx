import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import Error from '../Error/Error';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getCategories() {
    const options = {
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/categories`,
      method: 'GET',
    };

    try {
      const {
        data: { data },
      } = await axios.request(options);
      // console.log(data);

      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <Loading cstmSmall={true} />;
  }

  if (error) {
    return <Error msg={error} cstmSmall={true} />;
  }

  return (
    <div className="mt-[50px]">
      <Swiper
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        spaceBetween={50}
      >
        {categories &&
          categories.length > 0 &&
          categories.map(category => (
            <SwiperSlide key={category._id} className="rounded cursor-pointer">
              <div className="category relative size-[222px] me-2 rounded-lg bg-white shadow border-2 overflow-hidden">
                <div className="image overflow-hidden ">
                  <img
                    className="w-full h-full object-cover"
                    src={category.image}
                    alt={category.name}
                  />
                  <h3 className="absolute left-1/2 -translate-x-1/2 text-nowrap bottom-[5px] bg-primary-800 text-white text-sm font-semibold tracking-wider py-1 px-2 rounded z-20">
                    {category.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
