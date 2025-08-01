import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../app/api";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function ApplyModal({ isOpen, onClose, universityId, courseId }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    university: universityId,
    course: courseId,
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    email: "",
    gender: "",
    region: null,
  });

  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await api.get("/common/regions/", {
          params: { limit: 20 },
        });
        setRegions(response.data.results);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    if (isOpen) {
      fetchRegions();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedFormData = {
        ...formData,
        university: universityId,
        course: courseId,
      };
      await api.post("/applications/create/", updatedFormData);
      setFormData({
        university: "",
        course: "",
        first_name: "",
        last_name: "",
        age: "",
        phone_number: "",
        email: "",
        gender: "",
        region: null,
      });
      onClose();
      toast.success(t("apply_modal_success_message"));
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(t("apply_modal_error_message"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <Toaster position="top-center" />
      <div
        className="absolute w-full h-full bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white w-96 mx-auto p-4 rounded-lg shadow-lg z-50 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <svg
            className="w-6 h-6 text-gray-900 cursor-pointer"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">{t("apply_modal_title")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder={t("form_placeholder_first_name")}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder={t("form_placeholder_last_name")}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder={t("form_placeholder_age")}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder={t("form_placeholder_phone_number")}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("form_placeholder_email")}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">{t("form_select_gender")}</option>
              <option value="male">{t("form_option_male")}</option>
              <option value="female">{t("form_option_female")}</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">{t("form_select_region")}</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div className="py-2">
            <p className="text-xs">
              {t("form_terms_agreement_part1")}
              <Link
                to="/terms-and-conditions"
                className="underline text-secondary"
              >
                {t("form_terms_link")}
              </Link>
              {t("form_terms_agreement_part2")}
              <Link to="/privacy-policy" className="underline text-secondary">
                {t("form_privacy_link")}
              </Link>
              {t("form_terms_agreement_part3")}
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:bg-indigo-600"
            disabled={loading}
          >
            {loading
              ? t("form_button_submitting")
              : t("form_button_submit_application")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyModal;
