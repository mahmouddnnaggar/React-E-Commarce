import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async values => {
      const toastId = toast.loading('Waiting...');
      try {
        const option = {
          url: 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
          method: 'PUT',
          data: {
            email: values.email,
            newPassword: values.password,
          },
        };
        const { data } = await axios.request(option);
        console.log(data);

        if (data.token) {
          toast.success('Password Reset Successfully, welcome back!');
          setToken(data.token);
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      } finally {
        toast.dismiss(toastId);
      }
    },
  });

  return (
    <section className="py-16">
      <div className="container">
        <div className="w-full md:w-1/2 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-700">
              Reset Password
            </h2>
            <p className="text-gray-600">Enter your new password.</p>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-8">
            <div className="input">
              <label
                htmlFor="email"
                className="capitalize block mb-1 text-primary-900"
              >
                Email:
              </label>
              <input
                autoComplete="off"
                type="email"
                className="form-control outline-none border-[1px] border-primary-300 text-primary-800"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="input">
              <label
                htmlFor="password"
                className="capitalize block mb-1 text-primary-900"
              >
                Password:
              </label>
              <input
                autoComplete="off"
                type="password"
                className="form-control outline-none border-[1px] border-primary-300 text-primary-800"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn mx-auto block bg-primary-700 text-white uppercase tracking-wider mt-1"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
