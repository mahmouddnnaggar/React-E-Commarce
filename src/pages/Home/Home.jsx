import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import Error from '../../components/Error/Error';
import { WishlistContext } from '../../context/Wishlist.context';

export default function Home() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marginTopOfSliders, setMarginTopOfSliders] = useState('550px');
  const [marginTopOfCards, setMarginTopOfCards] = useState('650px');
  const { getWishlistProducts } = useContext(WishlistContext);

  async function getProducts() {
    const options = {
      url: `${BASE_URL}/api/v1/products`,
      method: 'GET',
    };

    try {
      const {
        data: { data },
      } = await axios.request(options);

      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setTimeout(() => {
        setMarginTopOfSliders('65px');
      }, 550);
    }
  }

  useEffect(() => {
    getProducts();
    getWishlistProducts();

    const handleScroll = () => {
      if (window.scrollY > 250) {
        setMarginTopOfCards('65px');
      } else {
        setMarginTopOfCards('650px');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error msg={error} />;
  }

  return (
    <section className="container">
      <div
        style={{
          marginTop: marginTopOfSliders,
          transition: 'margin 1000ms ease',
        }}
        className="sliders p-10 shadow rounded bg-white"
      >
        <HomeSlider />

        <CategorySlider />
      </div>

      <div
        style={{
          marginTop: marginTopOfCards,
          transition: 'margin 1200ms ease',
        }}
        className="cards grid gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-[50px]"
      >
        {products && products.length > 0 ? (
          products.map(product => (
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
          ))
        ) : (
          <div className="uppercase text-2xl tracking-wider">
            No products available
          </div>
        )}
      </div>
    </section>
  );
}
