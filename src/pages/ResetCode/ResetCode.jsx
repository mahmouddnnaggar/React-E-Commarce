import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
  const navigate = useNavigate();
  const resetCode = useRef(null);
  async function sendDataToResetCode() {
    const option = {
      url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      method: 'POST',
      data: { resetCode: resetCode.current.value.trim() },
    };
    const { data } = await axios.request(option);
    if (data.status === 'Success') navigate('/reset-password');
  }
  return (
    <section className="py-16">
      <div className="container">
        <div className="w-full md:w-1/2 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-700">Reset Code</h2>
            <p className="text-gray-600">
              Enter the code you received in your email.
            </p>
          </div>
          <div className="mt-8">
            <div className="input">
              <label
                htmlFor="userCode"
                className="capitalize block mb-1 text-primary-900"
              >
                Code:
              </label>
              <input
                autoComplete="off"
                type="text"
                className="form-control  outline-none border-[1px] border-primary-300 text-primary-800 "
                id="userCode"
                name="code"
                ref={resetCode}
              />
            </div>
            <button
              onClick={sendDataToResetCode}
              type="submit"
              className="btn mx-auto block bg-primary-700 text-white uppercase tracking-wider mt-1"
            >
              Verify Code
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
