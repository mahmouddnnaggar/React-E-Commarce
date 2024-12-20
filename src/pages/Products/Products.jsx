import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import { CartContext } from '../../context/Cart.context';
import Card from '../../components/Card/Card';

export default function Products() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [products, setProducts] = useState(null);
  const { addProductToCart } = useContext(CartContext);

  async function getProducts() {
    try {
      const options = {
        url: `${BASE_URL}/api/v1/products`,
        method: 'GET',
      };
      const {
        data: { data },
      } = await axios(options);
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (!products) return <Loading />;
  return (
    <>
      <section className="products container col-span-12 mb-10">
        <h2 className="text-3xl font-semibold text-center mt-10 mb-8">
          Products
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
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
    </>
  );
}
