import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from './User.context';

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);

  async function addProductToCart(productId) {
    const toastId = toast.loading('Adding A Product...');
    try {
      const options = {
        url: `${BASE_URL}/api/v1/cart`,
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
        getCartProducts();
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // get products
  async function getCartProducts() {
    try {
      const options = {
        url: `${BASE_URL}/api/v1/cart`,
        method: 'GET',
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      setCartInfo(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeCartItem(productId) {
    const toastId = toast.loading('Removing Cart Item..');
    try {
      const options = {
        url: `${BASE_URL}/api/v1/cart/${productId}`,
        method: 'DELETE',
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === 'success') {
        setCartInfo(data);
        toast.success('Item Removed Successfully');
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function clearCart() {
    const toastId = toast.loading('Clearing Cart');
    try {
      const options = {
        url: `${BASE_URL}/api/v1/cart`,
        method: 'DELETE',
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);

      if (data.message === 'success') {
        toast.success('Your Cart Now Is Empty!');
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function updateCartItemCount({ productId, count }) {
    const toastId = toast.loading('Update Count Of One Product');
    try {
      const options = {
        url: `${BASE_URL}/api/v1/cart/${productId}`,
        method: 'PUT',
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === 'success')
        toast.success('The Count Of Product Now Is Updated');
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        cartInfo,
        removeCartItem,
        clearCart,
        updateCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
