import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
import toast from 'react-hot-toast';

export default function UserPopUp() {
  const { token, setToken, name } = useContext(UserContext);
  const navigate = useNavigate();

  function logOut() {
    setToken(null);
    localStorage.removeItem('token');
    toast.success('Logged Out!');
    navigate('/login');
  }

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    const closePopUp = e => {
      if (!e.target.closest('.user-popup')) {
        setIsPopUpOpen(false);
      }
    };
    window.addEventListener('click', closePopUp);
    return () => {
      window.removeEventListener('click', closePopUp);
    };
  }, []);

  return (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
      className="user cursor-pointer relative user-popup"
    >
      <i
        onClick={e => {
          e.stopPropagation();
          setIsPopUpOpen(!isPopUpOpen);
        }}
        className="fa-solid fa-circle-user text-4xl"
      ></i>

      {isPopUpOpen && (
        <div className="absolute z-50 rounded overflow-hidden -bottom-2 left-0 -translate-x-full translate-y-full w-[380px] bg-white shadow-lg text-gray-900">
          <span className="text-2xl font-bold p-4 block w-full text-center border-b-2 border-primary-800">
            {token ? `Welcome, ${name}!` : 'Welcome Guest!'}
          </span>
          <ul className="links uppercase tracking-widest font-medium p-4 space-y-4">
            {!token ? (
              <>
                <li className="transition-[padding] hover:ps-4 duration-200 delay-75 border-b-[1px] border-primary-400 pb-2">
                  <Link
                    onClick={() => {
                      setIsPopUpOpen(!isPopUpOpen);
                    }}
                    to={'/signup'}
                  >
                    SignUp
                  </Link>
                </li>
                <li className="transition-[padding] hover:ps-4 duration-200 delay-75 border-b-[1px] border-primary-400 pb-2">
                  <Link
                    onClick={() => {
                      setIsPopUpOpen(!isPopUpOpen);
                    }}
                    to={'/login'}
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="transition-[padding] hover:ps-4 duration-200 delay-75 border-b-[1px] border-primary-400 pb-2">
                  <Link
                    className="space-x-2"
                    onClick={() => {
                      setIsPopUpOpen(!isPopUpOpen);
                    }}
                    to={'/cart'}
                  >
                    <span>Go To My Cart</span>
                    <i className="fa-solid fa-cart-shopping text-primary-800"></i>
                  </Link>
                </li>
                <li className="transition-[padding] hover:ps-4 duration-200 delay-75 border-b-[1px] border-primary-400 pb-2">
                  <Link
                    className="space-x-2"
                    onClick={() => {
                      setIsPopUpOpen(!isPopUpOpen);
                    }}
                    to={'/wishlist'}
                  >
                    <span>Go To My Wishlist</span>
                    <i className="fa-solid fa-cart-shopping text-primary-800"></i>
                  </Link>
                </li>
                <li className="transition-[padding] hover:ps-4 duration-200 delay-75 border-b-[1px] border-primary-400 pb-2">
                  <Link
                    className="space-x-2"
                    onClick={() => {
                      setIsPopUpOpen(!isPopUpOpen);
                      logOut();
                    }}
                  >
                    <span>LogOut</span>
                    <i className="fa-solid fa-right-from-bracket text-pink-700"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
