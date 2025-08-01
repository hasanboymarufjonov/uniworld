import { useState } from "react";
import api from "../../../app/api.js";
import { Link } from "react-router-dom";
import RegionSelector from "../../shared/RegionSelector.jsx";
import CountrySelector from "../../shared/CountrySelector.jsx";
import { useTranslation } from "react-i18next";

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
        alert("Application submitted successfully!"); // Or use a more sophisticated notification
        onClose(); // Close the modal on success
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } catch (err) {
      setError(
        "An error occurred. Please check your connection and try again."
      );
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
            {t("First Name")}
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium mb-1">
            {t("Last Name")}
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            className={inputClasses}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">
            {t("Country")}
          </label>
          <CountrySelector onSelect={handleCountrySelect} />
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-medium mb-1">
            {t("Region")}
          </label>
          <RegionSelector onSelect={handleRegionSelect} />
        </div>
      </div>
      <div>
        <label htmlFor="who_are_you" className="block text-sm font-medium mb-1">
          {t("Who Are You")}
        </label>
        <select
          id="who_are_you"
          name="who_are_you"
          value={formData.who_are_you}
          onChange={handleChange}
          className={inputClasses}
          required
        >
          <option value="">Select an option</option>
          <option value="PARENT">Parent</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium mb-1"
        >
          {t("Phone Number")}
        </label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className={inputClasses}
          required
        />
      </div>
      <div className="pt-2">
        <p className="text-xs text-gray-500">
          By clicking Submit, you agree to our{" "}
          <Link
            to="/terms-and-conditions"
            className="underline text-secondary hover:text-indigo-700"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            className="underline text-secondary hover:text-indigo-700"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary py-3 px-6 rounded-lg text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? t("Submitting...") : t("Submit Application")}
      </button>
    </form>
  );
};

export default AdvisorApplication;
