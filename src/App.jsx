import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";

import HomePage from "./pages/HomePage";
import UniversityPage from "./pages/UniversityPage";
import SearchPage from "./pages/SearchPage";

import UniversityOverview from "./components/UniversityPage/UniversityOverview.jsx";
import UniversityCourses from "./components/UniversityPage/UniversityCourses.jsx";

import TermsAndConditions from "./components/common/TermsAndConditions.jsx";
import PrivacyPolicy from "./components/common/PrivacyPolicy.jsx";

import AboutUs from "./components/layout/AboutUs.jsx";

import PathwayAdvice from "./components/PathwayPage/PathwayAdvice.jsx";

function App() {
  return (
    <div className="bg-primary">
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
        <Route
          path="/pathway-advice/:pathway/detail"
          element={<PathwayAdvice />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
