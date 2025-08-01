import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowLongRight } from "react-icons/hi2";
import api from "../../../app/api.js";
import HtmlContentRenderer from "../../shared/HtmlContentRenderer.jsx";

import Img1 from "../../../assets/images/photos/1.jpeg";
import Img2 from "../../../assets/images/photos/2.jpeg";
import Img3 from "../../../assets/images/photos/3.jpeg";
import Img4 from "../../../assets/images/photos/4.webp";
import Img5 from "../../../assets/images/photos/5.jpeg";

const AboutUs = () => {
  const [aboutUsContent, setAboutUsContent] = useState({
    findUniversity: "",
    ourServices: "",
    cardTitle: "",
    cardBody: "",
  });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        const response = await api.get("/common/about-us/");
        const data = response.data;
        setAboutUsContent({
          findUniversity: data.find_university,
          ourServices: data.our_services,
          cardTitle: data.card_title || "",
          cardBody: data.card_body || "",
        });
      } catch (error) {
        console.error("Error fetching about us content: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsContent();
  }, []);

  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto p-4">
        {loading ? (
          <p className="text-center py-10">{t("loading")}</p>
        ) : (
          <>
            <div className="md:flex items-center justify-between rounded-lg w-full p-8">
              <div className="mb-8 mr-8">
                <Link to="/universities">
                  <p className="bg-white w-fit text-xs md:text-sm rounded-xl border border-gray-700 text-gray-700 p-1">
                    {t("about_us_search_apply_banner")}
                  </p>
                </Link>
                <h2 className="text-4xl md:text-5xl font-semibold mb-2 mt-2">
                  {t("about_us_find_university_title")}
                </h2>
                <p className="text-base text-gray-700">
                  <HtmlContentRenderer
                    htmlContent={aboutUsContent.findUniversity}
                  />
                </p>
              </div>

              <div className="flex">
                <div className="mt-40 mr-5">
                  <img
                    src={Img1}
                    alt={t("about_us_image_alt_1")}
                    className="rounded-lg w-[150px] h-[150px] object-cover"
                  />
                </div>
                <div className="mt-20">
                  <div className="mb-4">
                    <img
                      src={Img2}
                      alt={t("about_us_image_alt_2")}
                      className="rounded-lg w-[150px] h-[150px] object-cover"
                    />
                  </div>
                  <div className="mb-4">
                    <img
                      src={Img3}
                      alt={t("about_us_image_alt_3")}
                      className="rounded-lg w-[150px] h-[150px] object-cover"
                    />
                  </div>
                </div>
                <div className="ml-5">
                  <div className="mb-4">
                    <img
                      src={Img4}
                      alt={t("about_us_image_alt_4")}
                      className="rounded-lg w-[150px] h-[150px] object-cover"
                    />
                  </div>
                  <div className="mb-4">
                    <img
                      src={Img5}
                      alt={t("about_us_image_alt_5")}
                      className="rounded-lg w-[150px] h-[150px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 p-8">
              <h2 className="text-4xl font-semibold ">
                {t("about_us_our_services_title")}
              </h2>
              <div className="flex-none md:flex">
                <div className="md:w-2/3 md:pr-10">
                  <p className="mt-8">
                    <HtmlContentRenderer
                      htmlContent={aboutUsContent.ourServices}
                    />
                  </p>
                </div>
                <div className="md:w-1/3 md:pl-20 mt-6">
                  <p className="text-5xl font-bold">2024</p>
                  <p className="py-4">{t("about_us_stats_launched")}</p>
                  <p className="text-5xl font-bold">20.000</p>
                  <p className="py-4">{t("about_us_stats_students_served")}</p>
                  <p className="text-5xl font-bold">100+</p>
                  <p className="pt-4">{t("about_us_stats_universities")}</p>
                </div>
              </div>
            </div>
            {aboutUsContent.cardTitle && aboutUsContent.cardBody && (
              <div className="rounded-lg md:p-20 p-10 bg-[#111827] text-white">
                <h2 className="text-xl md:text-3xl font-semibold mb-2 text-center">
                  {aboutUsContent.cardTitle}
                </h2>
                <p className="text-[#D1D5DB] md:px-28 text-center pt-5 text-base font-light md:text-xl">
                  <HtmlContentRenderer htmlContent={aboutUsContent.cardBody} />
                </p>
                <div className="flex justify-center mt-6">
                  <button className="bg-white text-[#111827] p-1 md:p-2 rounded text-base font-semibold mr-2">
                    {t("about_us_contact_button")}
                  </button>
                  <Link to="/universities">
                    <button className="md:p-2 p-1 rounded text-base font-semibold ml-2 flex items-center">
                      {t("about_us_check_universities_button")}
                      <HiArrowLongRight className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
