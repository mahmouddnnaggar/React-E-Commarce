import { useContext } from 'react';
import { WishlistContext } from '../../context/Wishlist.context';
import { useNavigate } from 'react-router-dom';

export default function WishlistItem({
  productInfo: {
    price,
    category: { name: categoryName },
    title,
    imageCover,
    id,
  },
}) {
  const navigate = useNavigate();
  const { removeWishlistItem } = useContext(WishlistContext);

  return (
    <div
      onClick={e => {
        e.stopPropagation();
        navigate(`/product/${id}`);
      }}
      className="wishlistItem flex w-full gap-2 cursor-pointer"
    >
      <div className="grid grid-cols-12 bg-gray-200 rounded shadow p-4 items-center text-xl grow">
        <div className="image col-span-1">
          <div className="overflow-hidden rounded-lg w-fit border-white border-2">
            <img
              className="w-[100px] h-[100px] object-cover object-top scale-110 shadow"
              src={imageCover}
              alt={title}
            />
          </div>
        </div>
        <div className="title col-span-5 ms-14">
          <div className="text w-fit relative">
            <span className="absolute left-1/2 -translate-x-1/2 text-[60px] font-black tracking-widest opacity-10">
              Title
            </span>
            <h4 className="font-black tracking-wide text-2xl">
              {title.split('').slice(0, 12).join('').trim()}
              {title.split('').length > 12 && '..'}
            </h4>
          </div>
        </div>
        <div className="category col-span-2 -ms-8">
          <div className="text w-fit relative">
            <span className="absolute left-1/2 -translate-x-1/2 text-[60px] -top-[5px] font-black tracking-widest opacity-10">
              category
            </span>
            <h4 className="font-black tracking-wide text-2xl">
              {categoryName}
            </h4>
          </div>
        </div>
        <div className="price col-span-2 ms-auto">
          <div className="text w-fit relative">
            <span className="absolute left-1/2 -translate-x-1/2 text-[60px] -top-[5px] font-black tracking-widest opacity-10">
              price
            </span>
            <h4 className="font-black tracking-wide text-2xl">{price}EG</h4>
          </div>
        </div>
      </div>
      <div
        onClick={e => {
          e.stopPropagation();
          removeWishlistItem(id);
        }}
        className="delete bg-gray-200 rounded shadow p-3 flex items-center cursor-pointer"
      >
        <i className="fa-solid fa-trash-can fa-xl text-pink-700"></i>
      </div>
    </div>
  );
}
