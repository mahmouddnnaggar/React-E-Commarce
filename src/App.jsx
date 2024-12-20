import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Home from './pages/Home/Home.jsx';
import Layout from './components/Layout/Layout.jsx';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import GuestRoute from './components/GuestRoute/GuestRoute.jsx';
import UserProvider from './context/User.context.jsx';
import CartProvider from './context/Cart.context.jsx';
import Cart from './pages/Cart/Cart.jsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import Orders from './pages/Orders/Orders.jsx';
import Categories from './pages/Categories/Categories.jsx';
import Brands from './pages/Brands/Brands.jsx';
import Products from './pages/Products/Products.jsx';
import WishlistProvider from './context/Wishlist.context.jsx';
import Wishlist from './pages/Wishlist/Wishlist.jsx';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword.jsx';
import ResetCode from './pages/ResetCode/ResetCode.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to={'home'} replace /> },
        { path: 'home', element: <Home /> },
        { path: 'cart', element: <Cart /> },
        { path: 'wishlist', element: <Wishlist /> },
        { path: 'product/:id', element: <ProductDetails /> },
        { path: 'categories', element: <Categories /> },
        { path: 'products', element: <Products /> },
        { path: 'brands', element: <Brands /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'allorders', element: <Orders /> },
        // TODO Create the not found page
        { path: '*', element: <h2>Not Found!</h2> },
      ],
    },
    {
      path: '/',
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <SignUp /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-code', element: <ResetCode /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ],
    },
  ]);
  return (
    <>
      <Toaster />
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </>
  );
}
