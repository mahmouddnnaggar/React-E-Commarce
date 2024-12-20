import axios from 'axios';
import { isString, useFormik } from 'formik';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { UserContext } from '../../context/User.context';
import Error from '../../components/Error/Error';

export default function Login() {
  const { setToken } = useContext(UserContext);
  const [
    incorrectEmailOrPasswordErrorMessage,
    setIncorrectEmailOrPasswordErrorMessage,
  ] = useState(null);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const validationSchema = object({
    email: string().required('Email is required').email('Enter a valid email'),
    password: string()
      .required('Password is required')
      .matches(
        passwordRegex,
        'Minimum eight characters, at least one upper case English letter, one lower case English letter'
      ),
  });

  async function sendDataToLogin(values) {
    const loadingToastId = toast.loading('Waiting...');
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/signin',
        method: 'POST',
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.message === 'success') {
        try {
          if (isString(data.token)) {
            setToken(data.token);
            localStorage.setItem('token', data.token);
          }
        } catch (err) {
          console.log(err);
          console.log(data.token);
          return <Error msg={'something went wrong, please try again...'} />;
        }
        toast.success('User Logged In Successfully');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (err) {
      const {
        response: {
          data: { message: errorMessage },
        },
      } = err;

      if (errorMessage) {
        toast.error(errorMessage);
        setIncorrectEmailOrPasswordErrorMessage(errorMessage);
      }
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,

    onSubmit: sendDataToLogin,
  });

  return (
    <section className="sign-up h-full relative overflow-hidden">
      <div className="absolute z-10 w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded shadow bg-primary-600 top-20 md:left-[200px] left-[100px]"></div>
      <div className="absolute z-10 w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded shadow bg-primary-700 bottom-24 md:right-[200px] right-[100px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-600 top-[270px] left-[400px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-700 top-[200px] left-[400px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-600 bottom-[200px] right-[400px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-700 bottom-[270px] right-[400px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-600 bottom-[20px] right-0 left-0"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-700 top-[10px] right-0 left-0"></div>
      <div className="container flex items-center h-[calc(100vh-100px)] relative z-20">
        <form
          className="p-6 rounded bg-white shadow-lg w-[68%] mx-auto -mt-[20px]"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-center font-bold text-4xl text-primary-800 mb-4 tracking-wider">
            Login Now
          </h2>
          <div className="input">
            <label
              htmlFor="useremail"
              className="capitalize block mb-1 text-primary-900"
            >
              Email:
            </label>
            <input
              autoComplete="off"
              type="email"
              className="form-control outline-none border-[1px] border-primary-300 text-primary-800 "
              id="useremail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="min-h-5 flex items-center justify-start text-sm lowercase text-pink-700">
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </p>
          </div>
          <div className="input">
            <label
              htmlFor="userPassword"
              className="capitalize block mb-1 text-primary-900"
            >
              Password:
            </label>
            <input
              autoComplete="off"
              type="password"
              className="form-control outline-none border-[1px] border-primary-300 text-primary-800 "
              id="userPassword"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <p className="min-h-5 flex items-center justify-start text-sm lowercase text-pink-700">
              {formik.errors.password &&
                formik.touched.password &&
                formik.errors.password}
              {incorrectEmailOrPasswordErrorMessage}
            </p>
          </div>
          <span
            onClick={() => navigate('/forget-password')}
            className="font-semibold text-sm bg-white p-2 shadow rounded cursor-pointer tracking-wide mt-1 w-fit block"
          >
            Forget Your Password?!{' '}
            <span className="text-primary-700">leeeh keda?</span>{' '}
          </span>
          <button
            type="submit"
            className="btn mx-auto block bg-primary-700 text-white uppercase tracking-wider mt-1"
          >
            Login Now
          </button>
        </form>
      </div>
    </section>
  );
}
