import { useContext } from 'react';
import { CartContext } from '../../context/Cart.context';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../../context/Wishlist.context';

export default function Card({
  description,
  title,
  rating,
  price,
  image,
  category,
  productId,
}) {
  const navigate = useNavigate();
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, wishlist } = useContext(WishlistContext);

  const isInWishlist = wishlist?.some(item => item.id === productId);

  return (
    <div
      onClick={e => {
        e.stopPropagation();
        navigate(`/product/${productId}`);
      }}
      className="card shadow-lg ring-1 ring-gray-200 overflow-hidden bg-white rounded relative cursor-pointer group"
    >
      <div className="image relative overflow-hidden">
        <i
          onClick={e => {
            e.stopPropagation();
            addProductToWishlist(productId);
          }}
          className={`${
            isInWishlist ? 'fa-solid' : 'fa-regular'
          } fa-heart z-10 absolute right-3 top-3 text-xl text-primary-700 bg-gray-50 pt-[6px] pb-[5px] px-3 rounded shadow-cstmlg transition-transform delay-75 duration-200 hover:scale-110`}
        ></i>

        <i
          onClick={e => {
            e.stopPropagation();
            addProductToCart(productId);
          }}
          className="fa-solid fa-cart-shopping absolute z-10 right-3 bottom-3 text-xl text-primary-700 bg-gray-50 py-[6px] px-3 rounded shadow-cstmlg transition-[background-color,transform,color,scale] delay-75 duration-500 hover:scale-110 hover:text-gray-50 hover:bg-primary-600"
        ></i>

        <span className="z-10 uppercase absolute left-1/2 top-1/2 -translate-x-1/2 text-gray-50 bg-primary-600 py-2 px-4 rounded opacity-70 scale-0 transition-transform delay-75 duration-500 group-hover:scale-150 group-hover:rotate-[360deg] text-nowrap tracking-wide">
          Click to details
        </span>
        <img
          className="w-full h-[350px] object-cover object-center transition-transform delay-75 duration-300 group-hover:rotate-6 group-hover:scale-[1.15]"
          src={image}
          alt="light blue shirt"
        />
      </div>
      <div className="date p-4">
        <div className="text min-h-[110px]">
          <span className="category text-primary-700 capitalize line-clamp-1">
            {category}
          </span>
          <span className="text-lg capitalize line-clamp-1">{title}</span>
          <p className="text-gray-600 line-clamp-2">{description}</p>
        </div>
        <div className="rate-price flex justify-between items-center">
          <span className="bg-primary-600 text-gray-50 text-[14px] font-semibold p-1 rounded">
            {price} EGP
          </span>
          <span>
            <i className="fa-solid fa-star text-[#ffbf00] me-1"></i>
            <span>{rating}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
