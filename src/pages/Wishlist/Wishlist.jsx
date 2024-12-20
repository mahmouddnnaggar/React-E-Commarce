import { useContext, useEffect } from 'react';
import { WishlistContext } from '../../context/Wishlist.context';
import Loading from '../../components/Loading/Loading';
import WishlistItem from '../../components/WishlistItem/WishlistItem';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { getWishlistProducts, wishlist, clearWishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    getWishlistProducts();
  }, []);

  if (wishlist === null) return <Loading />;

  return (
    <section className="pt-[80px] mb-[50px]">
      <div className="container">
        <header className="flex items-center gap-6">
          <i className="fa-solid fa-heart fa-2xl"></i>
          <p className="font-bold text-xl tracking-wide relative after:absolute after:bg-black after:h-[20px] after:w-[3px] after:-left-[12px] after:top-[5px]">
            Your Wishlist
          </p>
        </header>
        <div className="py-8 px-4 rounded shadow mt-6 bg-white">
          {wishlist && wishlist.length > 0 && (
            <>
              <div className="space-y-5">
                {wishlist.map(product => {
                  return (
                    <WishlistItem key={product.id} productInfo={product} />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
