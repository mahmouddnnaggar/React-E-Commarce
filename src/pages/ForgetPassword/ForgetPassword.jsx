import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async values => {
      const toastId = toast.loading('Sending reset link...');
      try {
        const option = {
          url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
          method: 'POST',
          data: { email: values.email },
        };
        const { data } = await axios.request(option);
        if (data.statusMsg === 'success') {
          toast.success('Reset link sent successfully!');
          navigate('/reset-code');
        }
        console.log(data);
      } catch (err) {
        console.log(err);
        toast.error('Failed to send reset link.');
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
              Forget Password
            </h2>
            <p className="text-gray-600">
              Enter your email address and we will send you a link to reset your
              password.
            </p>
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
            <button
              type="submit"
              className="btn mx-auto block bg-primary-700 text-white uppercase tracking-wider mt-1"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
