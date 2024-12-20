import americanExpressLogo from '../../assets/images/American-Express-Color.png';
import masterCardLogo from '../../assets/images/mastercard.webp';
import payPalLogo from '../../assets/images/paypal.png';
import appStoreLogo from '../../assets/images/get-apple-store.png';
import googlePlayLogo from '../../assets/images/get-google-play.png';

export default function Footer() {
  return (
    <footer className="bg-white shadow">
      <div className="container py-5">
        <div className="text">
          <p className="text-2xl font-light tracking-wide capitalize">
            get the FreshCart app
          </p>
          <span className="block text-xl text-gray-500 font-light mt-1 mb-5">
            We will send you a link, open it on your phone to download the app.
          </span>
        </div>
        <div className="input border-b border-gray-300 pb-[35px]">
          <form className="flex gap-3">
            <input
              className="form-control focus:border-primary-800 outline-none"
              type="text"
              placeholder="Email..."
            />
            <button
              type="submit"
              onClick={e => {
                e.preventDefault();
              }}
              className="btn shrink-0 bg-primary-700 border-primary-800 text-white font-medium uppercase"
            >
              share app link
            </button>
          </form>
        </div>
        <div className="payment-and-app flex items-center justify-between mt-5">
          <div className="payment-partners flex items-center gap-4">
            <span className="text-xl capitalize">payment partners</span>
            <ul className="partners-logo flex items-center gap-2">
              <li>
                <img
                  className="h-[35px]"
                  src={masterCardLogo}
                  alt="masterCardLogo"
                />
              </li>
              <li>
                <img
                  className="h-[35px]"
                  src={americanExpressLogo}
                  alt="americanExpressLogo"
                />
              </li>
              <li>
                <img className="h-[35px]" src={payPalLogo} alt="payPalLogo" />
              </li>
            </ul>
          </div>
          <div className="get-app flex items-center gap-4">
            <span className="text-xl capitalize">
              Get deliveries with FreshCart
            </span>
            <ul className="partners-logo flex items-center gap-2">
              <li>
                <img
                  className="h-[35px]"
                  src={appStoreLogo}
                  alt="appStoreLogo"
                />
              </li>
              <li>
                <img
                  className="h-[35px]"
                  src={googlePlayLogo}
                  alt="googlePlayLogo"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
