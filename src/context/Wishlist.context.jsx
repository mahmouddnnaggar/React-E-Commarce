import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from './User.context';

export const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { token } = useContext(UserContext);
  const [wishlist, setWishlist] = useState(null);

  async function addProductToWishlist(productId) {
    const toastId = toast.loading('Adding A Product...');
    try {
      const options = {
        url: `${BASE_URL}/api/v1/wishlist`,
        method: 'POST',
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === 'success') {
        toast.success(data.message);
        getWishlistProducts();
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getWishlistProducts() {
    try {
      const options = {
        url: `${BASE_URL}/api/v1/wishlist`,
        method: 'GET',
        headers: {
          token,
        },
      };
      const {
        data: { data },
      } = await axios.request(options);
      setWishlist(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeWishlistItem(productId) {
    const toastId = toast.loading('Removing Wishlist Item...');
    try {
      const options = {
        url: `${BASE_URL}/api/v1/wishlist/${productId}`,
        method: 'DELETE',
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);

      if (data.status === 'success') {
        getWishlistProducts();

        toast.success('Item Removed Successfully');
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistProducts,
        wishlist,
        removeWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
