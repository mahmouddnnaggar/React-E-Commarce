import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/Cart.context';
import Loading from '../../components/Loading/Loading';
import CartItem from '../../components/CartItem/CartItem';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getCartProducts, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, [cartInfo]);

  if (cartInfo === null) return <Loading />;

  return (
    <section className="pt-[80px]">
      <div className="container">
        <header className="flex items-center gap-6">
          <i className="fa-brands fa-opencart fa-2xl"></i>
          <p className="font-bold text-xl tracking-wide relative after:absolute after:bg-black after:h-[20px] after:w-[3px] after:-left-[12px] after:top-[5px]">
            Your Shopping Cart
          </p>
        </header>
        <div className="py-8 px-4 rounded shadow mt-6 mb-8 bg-white">
          {cartInfo.data.products && cartInfo.data.products.length > 0 && (
            <>
              <div className="space-y-5 mb-8">
                {cartInfo.data.products.map(product => {
                  return <CartItem key={product._id} productInfo={product} />;
                })}
              </div>
              <div className="flex justify-between items-center">
                <p className="bg-gray-200 py-2 px-5 w-fit text-xl rounded shadow">
                  Your Total Cart Price is{' '}
                  <span className="text-primary-700 font-semibold">
                    {cartInfo.data.totalCartPrice}EG
                  </span>
                </p>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    clearCart();
                  }}
                  className="btn bg-pink-700 px-10 text-white font-semibold shadow"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
        <Link
          to={'/checkout'}
          className="btn bg-primary-700 text-white text-2xl mb-8 w-full py-3 block text-center"
        >
          Go To Payment
        </Link>
      </div>
    </section>
  );
}
