import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/User.context';
import { CartContext } from '../../context/Cart.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { token } = useContext(UserContext);
  const { cartInfo } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const navigate = useNavigate();

  async function handleCashOrder(values) {
    const toastId = toast.loading('Making An Order...');
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: 'POST',
        headers: {
          token,
        },
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.status === 'success') {
        toast.success('Your Order Has Bees Created');
        setTimeout(() => {
          navigate('/allorders');
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function handleOnlinePayment(values) {
    const toastId = toast.loading('Making An Order...');
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: 'POST',
        headers: {
          token,
        },
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.status === 'success') {
        console.log(data);

        toast.success('Redirecting You To Stripe');
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: '',
        phone: '',
        city: '',
      },
    },
    onSubmit: values => {
      if (paymentMethod === 'online') handleOnlinePayment();
      else handleCashOrder();
    },
  });
  return (
    <div className="container mt-[50px] pt-4 pb-6 px-4 shadow bg-white">
      <header>
        <h2 className="font-bold text-2xl tracking-wide">Shipping Address</h2>
      </header>
      <form className="my-4 space-y-4" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="enter your city"
          className="form-control"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
          name="shippingAddress.city"
        />
        <input
          type="tel"
          placeholder="enter your phone"
          className="form-control"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
          name="shippingAddress.phone"
        />
        <textarea
          placeholder="enter details"
          className="form-control max-h-[200px] min-h-[100px]"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          name="shippingAddress.details"
        ></textarea>
        <div className="flex gap-2">
          <button
            onClick={() => [setPaymentMethod('online')]}
            type="submit"
            className="btn bg-primary-600 text-xl text-white grow"
          >
            Online Payment
          </button>
          <button
            onClick={() => [setPaymentMethod('cash')]}
            type="submit"
            className="btn bg-pink-600 text-xl text-white grow"
          >
            Cash Order
          </button>
        </div>
      </form>
    </div>
  );
}
