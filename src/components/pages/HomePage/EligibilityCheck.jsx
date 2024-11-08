import { useState } from "react";
import api from "../../../app/api";
import { useForm } from "react-hook-form";
import Specialties from "../../shared/Specialties.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EligibilityCheck = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSuccess(false);
    setError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await api.post(`/applications/advisor-application/create/`, {
        type: "ELIGIBILITY_CHECK",
        ...data,
      });
      setSuccess(true);
      handleCloseModal();
    } catch (err) {
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleOpenModal}
        className="px-8 py-4 bg-secondary text-white rounded-lg"
      >
        {t("Apply for Eligibility Check")}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 max-h-full overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Eligibility Check</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 mb-4">
                Application submitted successfully!
              </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("First Name")}
                  </label>
                  <input
                    {...register("first_name", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("Last Name")}
                  </label>
                  <input
                    {...register("last_name", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {t("Phone Number")}
                </label>
                <PhoneInput
                  country={"uz"}
                  value=""
                  onChange={(phone) => setValue("phone_number", phone)}
                  inputProps={{
                    name: "phone_number",
                    required: true,
                  }}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "0.375rem",
                    border: "1px solid rgb(238, 238, 238)",
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {t("Age")}
                </label>
                <input
                  {...register("age", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                  type="number"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("Current Education Level")}
                  </label>
                  <select
                    {...register("current_education_level", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="HIGH_SCHOOL">High School</option>
                    <option value="BACHELOR">Bachelor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("Needed Education Level")}
                  </label>
                  <select
                    {...register("needed_education_level", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="BACHELOR">Bachelor</option>
                    <option value="MASTER">Master</option>
                  </select>
                </div>
              </div>
              <Specialties register={register} />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">GPA</label>
                <input
                  {...register("gpa", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                  type="text"
                  required
                />
              </div>
              <div className="py-2">
                <p>
                  {t("By clicking the Submit button, you agree to our")}{" "}
                  <Link
                    to="/terms-and-conditions"
                    className="underline text-secondary"
                  >
                    {t("Terms & Conditions")}
                  </Link>{" "}
                  {t("and")}{" "}
                  <Link
                    to="/privacy-policy"
                    className="underline text-secondary"
                  >
                    {t("Privacy Policy")}
                  </Link>
                  {t(".")}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityCheck;
