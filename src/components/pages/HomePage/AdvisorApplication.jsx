import { useState } from "react";
import api from "../../../app/api.js";
import { Link } from "react-router-dom";
import RegionSelector from "../../shared/RegionSelector.jsx";
import CountrySelector from "../../shared/CountrySelector.jsx";
import { useTranslation } from "react-i18next";

const AdvisorApplication = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegionSelect = (regionId) => {
    setFormData((prevData) => ({
      ...prevData,
      region: regionId,
    }));
  };

  const handleCountrySelect = (countryId) => {
    setFormData((prevData) => ({
      ...prevData,
      country: countryId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/applications/advisor-application/create/",
        formData
      );
      if (response.status === 200) {
        setIsOpen(false);
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-secondary py-3 px-10 rounded-lg text-white"
      >
        {t("Speak to Advisor")}
      </button>

      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-50"></div>}

      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto px-2">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg relative">
              <h2 className="text-2xl font-bold mb-4">
                {t("Speak to Advisor")}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-black hover:text-gray-900 text-2xl"
              >
                &#10005;
              </button>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:w-[600px] w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="first_name"
                      className="text-sm font-semibold"
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
                      className="border border-gray-300 rounded-md py-2 px-3 mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="last_name"
                      className="text-sm font-semibold"
                    >
                      {t("Last Name")}
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="border border-gray-300 rounded-md py-2 px-3 mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="country" className="text-sm font-semibold">
                      {t("Country")}
                    </label>
                    <CountrySelector onSelect={handleCountrySelect} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="region" className="text-sm font-semibold">
                      {t("Region")}
                    </label>
                    <RegionSelector onSelect={handleRegionSelect} />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="who_are_you"
                    className="text-sm font-semibold"
                  >
                    {t("Who Are You")}
                  </label>
                  <select
                    id="who_are_you"
                    name="who_are_you"
                    value={formData.who_are_you}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md py-2 px-3 mt-1"
                  >
                    <option value="">Select</option>
                    <option value="PARENT">Parent</option>
                    <option value="STUDENT">Student</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="phone_number"
                    className="text-sm font-semibold"
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
                    className="border border-gray-300 rounded-md py-2 px-3 mt-1"
                  />
                </div>
                <hr />
                <div className="py-2">
                  <p>
                    By clicking the Submit Application button, you agree to our{" "}
                    <Link
                      to="/terms-and-conditions"
                      className="underline text-secondary"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy-policy"
                      className="underline text-secondary"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-secondary py-3 px-6 rounded-lg text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisorApplication;
