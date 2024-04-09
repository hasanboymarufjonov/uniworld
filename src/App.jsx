import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import UniversityPage from "./pages/UniversityPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/universities/:universityName"
          element={<UniversityPage />}
        />
        <Route path="/universities" element={<SearchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
