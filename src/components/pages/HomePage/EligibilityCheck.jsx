import { useState } from "react";
import api from "../../../app/api";
import { useForm } from "react-hook-form";
import Specialties from "../../shared/Specialties.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EligibilityCheck = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
    setError(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await api.post(`/applications/advisor-application/create/`, {
        type: "ELIGIBILITY_CHECK",
        ...data,
      });
      reset(); // Clear all form fields
      setIsModalOpen(false);
    } catch (err) {
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setLoading(false);
      reset();
    }
  };

  const StepOne = () => (
    <>
      <h2 className="text-lg font-semibold mb-4">
        {t("Personal Information")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("First Name")}
          </label>
          <input
            {...register("first_name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            type="text"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("Last Name")}
          </label>
          <input
            {...register("last_name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            type="text"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
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
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            padding: "0.5rem 1rem",
          }}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">{t("Age")}</label>
        <input
          {...register("age", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          type="number"
          required
        />
      </div>
    </>
  );

  const StepTwo = () => (
    <>
      <h2 className="text-lg font-semibold mb-4">{t("Education Goals")}</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {t("Needed Education Level")}
        </label>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              {...register("needed_education_level", { required: true })}
              type="radio"
              value="BACHELOR"
              className="h-5 w-5 text-secondary focus:ring-secondary"
              required
            />
            <span className="text-sm">Bachelor</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              {...register("needed_education_level", { required: true })}
              type="radio"
              value="MASTER"
              className="h-5 w-5 text-secondary focus:ring-secondary"
              required
            />
            <span className="text-sm">Master</span>
          </label>
        </div>
      </div>
    </>
  );

  const StepThree = () => (
    <>
      <h2 className="text-lg font-semibold mb-4">{t("Specialties")}</h2>
      <Specialties register={register} />
    </>
  );

  const StepFour = () => (
    <>
      <h2 className="text-lg font-semibold mb-4">{t("Current Education")}</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {t("Current Education Level")}
        </label>
        <select
          {...register("current_education_level", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        >
          <option value="HIGH_SCHOOL">High School</option>
          <option value="BACHELOR">Bachelor</option>
        </select>
      </div>
    </>
  );

  const StepFive = () => (
    <>
      <h2 className="text-lg font-semibold mb-4">
        {t("Academic Performance")}
      </h2>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">GPA</label>
        <input
          {...register("gpa", { required: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          type="text"
          required
        />
      </div>
      <div className="py-4">
        <p className="text-sm text-gray-600">
          {t("By clicking the Submit button, you agree to our")}{" "}
          <Link to="/terms-and-conditions" className="underline text-secondary">
            {t("Terms & Conditions")}
          </Link>{" "}
          {t("and")}{" "}
          <Link to="/privacy-policy" className="underline text-secondary">
            {t("Privacy Policy")}
          </Link>
          {t(".")}
        </p>
      </div>
    </>
  );

  const steps = [
    { label: "Step 1: Personal Information", active: currentStep === 1 },
    { label: "Step 2: Education Level", active: currentStep === 2 },
    { label: "Step 3: Specialties", active: currentStep === 3 },
    { label: "Step 4: Current Education Level", active: currentStep === 4 },
    { label: "Step 5: GPA & Terms", active: currentStep === 5 },
  ];

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
          <div className="fixed inset-0 bg-white p-20 overflow-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-4xl font-bold mb-4">
              Fill out the form below to is if you are eligible
            </h2>
            <h2 className="text-xl mb-4 text-[#409C35] font-light">
              Finds best matches
            </h2>

            <div className="mb-8 flex items-center justify-between w-full">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index !== steps.length - 1 ? "w-full" : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
                      currentStep >= index + 1 ? "bg-[#409C35]" : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-grow h-1 ${
                        currentStep > index + 1 ? "bg-[#409C35]" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 1 && <StepOne />}
              {currentStep === 2 && <StepTwo />}
              {currentStep === 3 && <StepThree />}
              {currentStep === 4 && <StepFour />}
              {currentStep === 5 && <StepFive />}

              <div className="fixed bottom-0 left-0 right-0 py-10 px-40 bg-gray-200 border-t border-gray-600 flex justify-between">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                    disabled={currentStep === 1}
                  >
                    {t("Previous")}
                  </button>
                )}
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-[#EC7A08] text-white rounded-lg"
                  >
                    {t("Next")}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#EC7A08] text-white rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : t("Submit")}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityCheck;
