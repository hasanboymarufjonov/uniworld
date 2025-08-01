import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../app/api.js";
import RegionSelector from "../../shared/RegionSelector.jsx";
import CountrySelector from "../../shared/CountrySelector.jsx";

/**
 * A form for users to apply to speak with an advisor.
 * This component is designed to be placed inside a modal.
 * @param {object} props
 * @param {function} props.onClose - Function to call to close the parent modal.
 */
const AdvisorApplication = ({ onClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    type: "SPEAK_WITH_ADVISOR",
    first_name: "",
    last_name: "",
    who_are_you: "",
    phone_number: "",
    country: "",
    region: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegionSelect = (regionId) =>
    setFormData((prev) => ({ ...prev, region: regionId }));
  const handleCountrySelect = (countryId) =>
    setFormData((prev) => ({ ...prev, country: countryId }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        "/applications/advisor-application/create/",
        formData
      );
      if (response.status === 201 || response.status === 200) {
        alert(t("advisor_form_success_message"));
        onClose();
      } else {
        setError(t("advisor_form_error_failed_submission"));
      }
    } catch (err) {
      setError(t("advisor_form_error_connection"));
      console.error("Error submitting data:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium mb-1"
          >
            {t("form_label_first_name")}
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder={t("form_placeholder_first_name")}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium mb-1">
            {t("form_label_last_name")}
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder={t("form_placeholder_last_name")}
            className={inputClasses}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">
            {t("form_label_country")}
          </label>
          <CountrySelector onSelect={handleCountrySelect} />
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-medium mb-1">
            {t("form_label_region")}
          </label>
          <RegionSelector onSelect={handleRegionSelect} />
        </div>
      </div>
      <div>
        <label htmlFor="who_are_you" className="block text-sm font-medium mb-1">
          {t("form_label_who_are_you")}
        </label>
        <select
          id="who_are_you"
          name="who_are_you"
          value={formData.who_are_you}
          onChange={handleChange}
          className={inputClasses}
          required
        >
          <option value="">{t("form_select_option")}</option>
          <option value="PARENT">{t("form_option_parent")}</option>
          <option value="STUDENT">{t("form_option_student")}</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium mb-1"
        >
          {t("form_label_phone_number")}
        </label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder={t("form_placeholder_phone_number")}
          className={inputClasses}
          required
        />
      </div>
      <div className="pt-2">
        <p className="text-xs text-gray-500">
          {t("form_terms_agreement_part1")}
          <Link
            to="/terms-and-conditions"
            className="underline text-secondary hover:text-indigo-700"
          >
            {t("form_terms_link")}
          </Link>
          {t("form_terms_agreement_part2")}
          <Link
            to="/privacy-policy"
            className="underline text-secondary hover:text-indigo-700"
          >
            {t("form_privacy_link")}
          </Link>
          {t("form_terms_agreement_part3")}
        </p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary py-3 px-6 rounded-lg text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? t("form_button_submitting") : t("form_button_submit")}
      </button>
    </form>
  );
};

export default AdvisorApplication;
