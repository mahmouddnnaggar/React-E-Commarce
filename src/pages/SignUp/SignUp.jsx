import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';

export default function SignUp() {
  const navigate = useNavigate();
  const [accountExistErrorMessage, setAccountExistErrorMessage] =
    useState(null);

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  const validationSchema = object({
    name: string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 letters')
      .max(25, "Name can't be more than 25 letters"),
    email: string().required('Email is required').email('Enter a valid email'),
    password: string()
      .required('Password is required')
      .matches(
        passwordRegex,
        'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
      ),
    rePassword: string()
      .required('Re-Password is required')
      .oneOf(
        [ref('password')],
        'Re-Password is not matching with the password'
      ),
    phone: string()
      .required('Phone is required')
      .matches(phoneRegex, 'We dealing wit egyptian numbers only'),
  });

  async function sendDataToSignUp(values) {
    const loadingToastId = toast.loading('Waiting...');
    try {
      const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/auth/signup',
        method: 'POST',
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.message === 'success') {
        toast.success('User Created Successfully');
        setAccountExistErrorMessage(null);
        setTimeout(() => {
          navigate('/login');
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
        setAccountExistErrorMessage(errorMessage);
      }
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },

    validationSchema,

    onSubmit: sendDataToSignUp,
  });

  return (
    <section className="sign-up h-full relative overflow-hidden mt-8">
      <div className="absolute z-10 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded shadow bg-primary-600 top-0 md:left-[100px] left-[40px]"></div>
      <div className="absolute z-10 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded shadow bg-primary-700 bottom-4 md:right-[100px] right-[40px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-600 top-20 left-[400px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-700 top-36 left-[400px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-600 bottom-20 right-[400px]"></div>
      <div className="absolute z-10 w-full h-8 shadow bg-primary-700 bottom-36 right-[400px]"></div>
      <div className="container flex items-center h-[calc(100vh-100px)] relative z-20">
        <form
          className="p-6 rounded bg-white shadow-lg w-[68%] mx-auto -mt-[20px]"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-center font-bold text-4xl text-primary-800 mb-4 tracking-wider">
            Register Now
          </h2>
          <div className="input">
            <label
              htmlFor="username"
              className="capitalize block mb-1 text-primary-900"
            >
              full name:
            </label>
            <input
              autoComplete="off"
              type="text"
              className="form-control outline-none border-[1px] border-primary-300 text-primary-800 "
              id="username"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="min-h-5 flex items-center justify-start text-sm lowercase text-pink-700">
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </p>
          </div>
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
              {accountExistErrorMessage}
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
            </p>
          </div>
          <div className="input">
            <label
              htmlFor="userRePassword"
              className="capitalize block mb-1 text-primary-900"
            >
              Re-Password:
            </label>
            <input
              autoComplete="off"
              type="password"
              className="form-control  outline-none border-[1px] border-primary-300 text-primary-800 "
              id="userRePassword"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="min-h-5 flex items-center justify-start text-sm lowercase text-pink-700">
              {formik.errors.rePassword &&
                formik.touched.rePassword &&
                formik.errors.rePassword}
            </p>
          </div>
          <div className="input">
            <label
              htmlFor="userPhone"
              className="capitalize block mb-1 text-primary-900"
            >
              Phone:
            </label>
            <input
              autoComplete="off"
              type="tel"
              className="form-control  outline-none border-[1px] border-primary-300 text-primary-800 "
              id="userPhone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="min-h-5 flex items-center justify-start text-sm lowercase text-pink-700">
              {formik.errors.phone &&
                formik.touched.phone &&
                formik.errors.phone}
            </p>
          </div>
          <button
            type="submit"
            className="btn mx-auto block bg-primary-700 text-white uppercase tracking-wider mt-1"
          >
            Register Now
          </button>
        </form>
      </div>
    </section>
  );
}
