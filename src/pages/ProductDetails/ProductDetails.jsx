import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/Cart.context';
import ReactImageGallery from 'react-image-gallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../../components/Card/Card';

export default function ProductDetails() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const { addProductToCart } = useContext(CartContext);

  async function getProductDetails() {
    const options = {
      url: `${BASE_URL}/api/v1/products/${id}`,
      method: 'GET',
    };
    const {
      data: { data },
    } = await axios.request(options);
    setProductDetails(data);
  }

  async function getRelatedProducts() {
    const options = {
      url: `${BASE_URL}/api/v1/products?category[in]=${productDetails.category._id}`,
      method: 'GET',
    };
    const {
      data: { data },
    } = await axios.request(options);
    setRelatedProducts(data);
    console.log(data);
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails !== null) getRelatedProducts();
  }, [productDetails]);

  return (
    <>
      {productDetails && relatedProducts ? (
        <section className="my-[50px]">
          <div className="container flex gap-10 p-5 bg-white rounded shadow">
            <div className="w-[300px] rounded shadow p-3">
              <ReactImageGallery
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={false}
                items={productDetails.images.map(image => {
                  return { original: image, thumbnail: image };
                })}
              />
            </div>
            <div className="details grow">
              <h3 className="title font-bold text-2xl">
                {productDetails.title}
              </h3>
              <div className="category text-xl text-primary-700">
                {productDetails.category.name}
              </div>
              <div className="description text-gray-600 text-lg my-3">
                {productDetails.description}
              </div>
              <div className="price-and-rate flex justify-between text-lg">
                <span>{productDetails.price}EG</span>
                <div className="rate flex gap-1 items-center justify-center ">
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  <span>{productDetails.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  addProductToCart(id);
                }}
                className="btn bg-primary-700 w-full mt-4 text-white text-xl"
              >
                Add To Cart
              </button>
            </div>
          </div>
          <div className="related-products container my-8">
            <Swiper slidesPerView={6} spaceBetween={15} loop={true}>
              {relatedProducts.map(product => {
                return (
                  <SwiperSlide className="bg-slate-500" key={product.id}>
                    <Card
                      key={product.id}
                      description={product.description}
                      title={product.title}
                      rating={product.ratingsAverage}
                      price={product.price}
                      image={product.imageCover}
                      category={product.category.name}
                      productId={product.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
