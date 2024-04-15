import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import UniversityPage from "./pages/UniversityPage";
import SearchPage from "./pages/SearchPage";

import UniversityOverview from "./components/UniversityOverview";
import UniversityCourses from "./components/UniversityCourses";

import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

import AboutUs from "./components/AboutUs";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/universities/:universityName"
          element={<UniversityPage />}
        >
          <Route path="overview" element={<UniversityOverview />} />
          <Route path="courses" element={<UniversityCourses />} />
        </Route>
        <Route path="/universities" element={<SearchPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
