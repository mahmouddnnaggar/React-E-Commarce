import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User.context';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

export default function Orders() {
  const { token } = useContext(UserContext);
  let id = null;
  if (token) {
    id = jwtDecode(token).id;
  }
  const [orders, setOrders] = useState(null);

  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: 'GET',
      };
      const { data } = await axios(options);
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (!orders) return <Loading />;

  return (
    <>
      <div className="section mt-[40px] mb-[25px] space-y-6 container">
        {orders.map(order => {
          return (
            <div key={order.id} className="p-4 shadow bg-white rounded">
              <header className="flex justify-between items-center px-5 border-b-2 border-b-primary-700 pb-4">
                <div className="order-id">
                  <span className="block text-gray-500">Order Id</span>
                  <span className="text-xl font-semibold">#{order.id}</span>
                </div>
                <div className="status flex items-center gap-2">
                  {order.isDelivered ? (
                    <span className="py-1 px-3 text-lg text-white font-semibold tracking-wider rounded-full bg-green-500">
                      Delivered
                    </span>
                  ) : (
                    <span className="py-1 px-3 text-lg text-white font-semibold tracking-wider rounded-full bg-primary-600">
                      Delivering
                    </span>
                  )}
                  {order.isPaid ? (
                    <span className="py-1 px-3 text-lg text-white font-semibold tracking-wider rounded-full bg-green-500">
                      Paid
                    </span>
                  ) : (
                    <span className="py-1 px-3 text-lg text-white font-semibold tracking-wider rounded-full bg-pink-600">
                      Unpaid
                    </span>
                  )}
                </div>
              </header>
              <div className="products">
                {order.cartItems.map(item => {
                  return (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-5 border-b-2"
                    >
                      <div className="product-img w-20 h-20 bg-gray-200 rounded-md">
                        <img
                          className="w-full h-full object-cover"
                          src={item.product.imageCover}
                          alt={item.product.title}
                        />
                      </div>
                      <div className="product-info w-full">
                        <h3 className="text-lg font-semibold">
                          {item.product.title}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">
                            Quantity: {item.count}
                          </span>
                          <span className="text-gray-500 text-lg">
                            {item.price}EG
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <span className="total-price block mt-4 text-lg font-semibold text-center bg-primary-700 text-white py-2 rounded-md">
                Your Total Price Is {order.totalOrderPrice}EG
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
