import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import UniversityPage from "./pages/UniversityPage";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
