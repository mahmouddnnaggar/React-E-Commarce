import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/favicon.png';
import { useContext, useEffect, useState } from 'react';
import UserPopUp from '../UserPopUp/UserPopUp';
import { UserContext } from '../../context/User.context';
import { CartContext } from '../../context/Cart.context';
import style from './style.module.css';

export default function Navbar() {
  const [navbarHeight, setNavbarHeight] = useState('90px');
  const { token } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 880) {
        setNavbarHeight('75px');
      } else {
        setNavbarHeight('90px');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // ^ to get CartInfo for show count ot products that in cart
    getCartProducts();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="bg-primary-800 text-gray-200 shadow fixed top-0 left-0 right-0 z-40">
      <div
        style={{ height: navbarHeight }}
        className={`container flex items-center justify-between transition-all duration-500`}
      >
        <Link to={'/home'} className="logo flex items-center gap-1 ">
          <img className="w-[40px]" src={logo} alt="our logo" />
          <span className="font-bold text-3xl text-gray-50 tracking-wider">
            FreshCart
          </span>
        </Link>
        {token && (
          <ul
            style={
              token
                ? { marginInlineStart: '230px' }
                : { marginInlineStart: '200px' }
            }
            className={`pages-links capitalize flex items-center gap-10`}
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors hover:text-white duration-150 delay-75  ${
                    isActive && 'text-white font-black tracking-wider text-2xl'
                  }`
                }
                to={'/home'}
              >
                home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors hover:text-white duration-150 delay-75  ${
                    isActive && 'text-white font-black tracking-wider text-2xl'
                  }`
                }
                to={'/cart'}
              >
                cart
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors hover:text-white duration-150 delay-75  ${
                    isActive && 'text-white font-black tracking-wider text-2xl'
                  }`
                }
                to={'/allorders'}
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors hover:text-white duration-150 delay-75  ${
                    isActive && 'text-white font-black tracking-wider text-2xl'
                  }`
                }
                to={'/products'}
              >
                products
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors hover:text-white duration-150 delay-75  ${
                    isActive && 'text-white font-black tracking-wider text-2xl'
                  }`
                }
                to={'/categories'}
              >
                categories
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors hover:text-white duration-150 delay-75  ${
                    isActive && 'text-white font-black tracking-wider text-2xl'
                  }`
                }
                to={'/brands'}
              >
                brands
              </NavLink>
            </li>
          </ul>
        )}
        {!token && (
          <ul className="sign-and-log-in capitalize flex items-center gap-10 ms-auto me-10 ">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors hover:text-white duration-150 delay-75  ${
                    isActive && 'text-white font-black tracking-wider text-2xl'
                  }`
                }
                to={'/login'}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `text-xl font-medium transition-colors hover:text-white duration-150 delay-75  ${
                    isActive && 'text-white font-black tracking-wider text-2xl'
                  }`
                }
                to={'/signup'}
              >
                Signup
              </NavLink>
            </li>
          </ul>
        )}
        {token && (
          <>
            <Link to={'/wishlist'} className="ms-auto relative">
              <i
                className={`fa-2xl fa-solid fa-heart text-pink-600 ${style.heartbeat}`}
              ></i>
            </Link>
            <Link to={'/cart'} className="ms-auto me-5 relative">
              <div className="cart-counter absolute size-[18px] rounded-full bg-primary-950 -top-2 -left-1 flex items-center justify-center text-[12px] font-semibold shadow">
                <span className="text-white">
                  {cartInfo?.numOfCartItems || (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  )}
                </span>
              </div>
              <i className="fa-2xl fa-solid fa-cart-shopping"></i>
            </Link>
            <UserPopUp />
          </>
        )}
      </div>
    </nav>
  );
}
