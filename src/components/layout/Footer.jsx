import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";
import logoImg from "../../assets/images/logos/logo.png";

const socialLinks = [
  { href: "#", icon: <FaTelegram size={18} />, label: "Telegram" },
  {
    href: "https://www.instagram.com/uniworld_study",
    icon: <FaInstagram size={18} />,
    label: "Instagram",
  },
  { href: "#", icon: <FaYoutube size={18} />, label: "YouTube" },
];

const footerLinks = [
  { to: "/about-us", labelKey: "footer_link_about_us" },
  { to: "/universities", labelKey: "footer_link_universities" },
  { to: "/terms-and-conditions", labelKey: "footer_link_terms" },
  { to: "/privacy-policy", labelKey: "footer_link_privacy" },
];

const contactInfo = [
  {
    href: "mailto:info@uniworld.com",
    icon: <FaEnvelope />,
    text: "info@uniworld.com",
  },
  { href: "tel:+1234567890", icon: <FaPhone />, text: "+1 (234) 567-890" },
];

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(t("newsletter_subscribe_success"));
    e.target.reset();
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <img
                src={logoImg}
                alt={t("uniworld_logo_alt")}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-700 text-sm">
              {t("footer_dream_university_slogan")}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-all duration-300 ease-in-out hover:bg-secondary hover:text-white hover:scale-110"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              {t("footer_quick_links_title")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    to={link.to}
                    className="text-gray-800 hover:text-secondary transition-colors text-base"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              {t("footer_contact_us_title")}
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((contact) => (
                <li key={contact.text}>
                  <a
                    href={contact.href}
                    className="flex items-center gap-3 text-gray-800 hover:text-secondary transition-colors group"
                  >
                    <span className="flex-shrink-0 text-gray-500 group-hover:text-secondary transition-colors">
                      {contact.icon}
                    </span>
                    <span className="text-base">{contact.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              {t("footer_stay_updated_title")}
            </h3>
            <p className="text-gray-700 text-base mb-4">
              {t("footer_newsletter_desc")}
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <label htmlFor="email-address" className="sr-only">
                {t("email_address_label")}
              </label>
              <input
                type="email"
                id="email-address"
                name="email-address"
                autoComplete="email"
                required
                className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder={t("footer_newsletter_placeholder")}
              />
              <button
                type="submit"
                className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-secondary border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                aria-label={t("newsletter_subscribe_aria_label")}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-base text-gray-700">
            © {currentYear} Uniworld. {t("footer_all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
