import {
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import logoImg from "../../assets/images/logos/logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 mx-auto border-t border-gray-900 bg-white">
      <div className="text-center">
        <div className="mb-3">
          <img src={logoImg} alt="uniworld logo" className="w-32 mx-auto" />
        </div>
        <div className="mb-3">
          <p className="text-gray-900">
            {t("One Click to Your Dream University")}
          </p>
        </div>
        <div className="mb-3 flex justify-center space-x-4">
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
            href="#"
          >
            <FaTelegram size={16} />
          </a>
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
            href="https://www.instagram.com/uniworld_study"
          >
            <FaInstagram size={16} />
          </a>
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
            href="#"
          >
            <FaYoutube size={16} />
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 text-gray-900">
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <Link to="/terms-and-conditions" className="hover:underline">
              {t("Terms & Conditions")}
            </Link>
            <Link to="/privacy-policy" className="hover:underline">
              {t("Privacy Policy")}
            </Link>
            <Link to="/about-us" className="hover:underline">
              {t("About us")}
            </Link>
          </div>
          <div>
            <p>© {t("2024 All rights reserved.")}</p>
          </div>
        </div>
        <div className="mt-6 text-gray-900">
          <div className="flex items-center space-x-6">
            <h3 className=" text-base ">{t("Contact us")}:</h3>
            <a
              href="mailto:info@uniworld.com"
              className="inline-flex items-center space-x-2 hover:underline"
            >
              <FaEnvelope />
              <span>info@uniworld.com</span>
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center space-x-2 hover:underline"
            >
              <FaPhone />
              <span>+1 (234) 567-890</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Let me know if you want me to tweak anything else! 🚀
