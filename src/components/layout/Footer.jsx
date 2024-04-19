import { FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer class="w-full py-4 px-4 sm:px-6 lg:px-8 mx-auto border-t border-gray-900 bottom-0">
        <div class="text-center">
          <div class="mt-3">
            <p class="text-gray-900">
              {/* ©{" "} */}
              <span className="font-bold text-lg">
                <span className="text-secondary">uni</span>world
              </span>
              {/* . 2024 All rights reserved. */}
            </p>
          </div>
          <div className="mt-3">
            <p>One Click to Your Dream University</p>
          </div>

          <div class="mt-3 space-x-2">
            <a
              class="inline-flex justify-center items-center size-10 text-center text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition  "
              href="#"
            >
              <FaTelegram />
            </a>
            <a
              class="inline-flex justify-center items-center size-10 text-center text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition  "
              href="#"
            >
              <FaInstagram />
            </a>
            <a
              class="inline-flex justify-center items-center size-10 text-center text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition  "
              href="#"
            >
              <FaYoutube />
            </a>
          </div>

          <div className="mt-3  md:flex justify-between">
            <div className=" gap-8 underline flex">
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <p>Contact us</p>
              <Link to="/about-us">About us</Link>
            </div>
            <div className="mt-4 md:mt-0"> © 2024 All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
