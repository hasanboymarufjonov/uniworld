import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../app/api";
import Specialties from "../../shared/Specialties.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

/**
 * A multi-step form for users to check their eligibility.
 * Navigates to a results page upon successful submission.
 * @param {object} props
 * @param {function} props.onClose
 */
const EligibilityCheck = ({ onClose }) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const totalSteps = 5;

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(
        `/applications/advisor-application/create/`,
        {
          type: "eligibility_check",
          ...data,
        }
      );

      if (response.data && response.data.matched_universities) {
        navigate("/eligibility-results", {
          state: { matchedUniversities: response.data.matched_universities },
        });
        reset();
        onClose();
      } else {
        throw new Error(t("eligibility_form_error_no_matches"));
      }
    } catch (err) {
      setError(t("eligibility_form_error_submission"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary";

  const StepOne = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("form_label_first_name")}
          </label>
          <input
            {...register("first_name", { required: true })}
            className={inputClasses}
            type="text"
            placeholder={t("form_placeholder_first_name")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("form_label_last_name")}
          </label>
          <input
            {...register("last_name", { required: true })}
            className={inputClasses}
            type="text"
            placeholder={t("form_placeholder_last_name")}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("form_label_phone_number")}
        </label>
        <PhoneInput
          country={"uz"}
          onlyCountries={["kz", "kg", "tj", "tm", "uz"]}
          onChange={(phone) => setValue("phone_number", phone)}
          inputClass={inputClasses}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("form_label_age")}
        </label>
        <input
          {...register("age", { required: true, valueAsNumber: true })}
          className={inputClasses}
          type="number"
          placeholder={t("form_placeholder_age")}
        />
      </div>
    </>
  );

  const StepTwo = () => (
    <>
      <label className="block text-sm font-medium mb-2">
        {t("form_label_needed_education")}
      </label>
      <div className="space-y-2">
        <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
          <input
            {...register("needed_education_level", { required: true })}
            type="radio"
            value="bachelor"
            className="h-5 w-5 text-secondary focus:ring-secondary"
          />
          <span>{t("form_option_bachelor")}</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
          <input
            {...register("needed_education_level", { required: true })}
            type="radio"
            value="master"
            className="h-5 w-5 text-secondary focus:ring-secondary"
          />
          <span>{t("form_option_master")}</span>
        </label>
      </div>
    </>
  );

  const StepThree = () => <Specialties register={register} />;

  const StepFour = () => (
    <div>
      <label className="block text-sm font-medium mb-1">
        {t("form_label_current_education")}
      </label>
      <select
        {...register("current_education_level", { required: true })}
        className={inputClasses}
      >
        <option value="high_school">{t("form_option_high_school")}</option>
        <option value="bachelor">{t("form_option_bachelor")}</option>
      </select>
    </div>
  );

  const StepFive = () => (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("form_label_gpa")}
        </label>
        <input
          {...register("gpa", { required: true })}
          className={inputClasses}
          type="text"
          placeholder={t("form_placeholder_gpa")}
        />
      </div>
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-500">
          {t("form_terms_agreement_part1")}
          <Link to="/terms-and-conditions" className="underline text-secondary">
            {t("form_terms_link")}
          </Link>
          {t("form_terms_agreement_part2")}
          <Link to="/privacy-policy" className="underline text-secondary">
            {t("form_privacy_link")}
          </Link>
          {t("form_terms_agreement_part3")}
        </p>
      </div>
    </>
  );

  const steps = [
    <StepOne />,
    <StepTwo />,
    <StepThree />,
    <StepFour />,
    <StepFive />,
  ];

  return (
    <div className="font-sans">
      <div className="flex items-center mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-1.5 rounded-full ${
              currentStep > index ? "bg-secondary" : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {steps[currentStep - 1]}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("form_button_previous")}
          </button>
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t("form_button_next")}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? t("form_button_submitting") : t("form_button_submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EligibilityCheck;
