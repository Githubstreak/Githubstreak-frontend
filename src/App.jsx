import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import Footer from "./sections/Footer";
import Project from "./Pages/Project";
import Meme from "./Pages/Meme";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <>
      {/* Skip link for keyboard navigation accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Nav />

      <div id="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="meme" element={<Meme />} />
          <Route path="project" element={<Project />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>

      <Footer />
      <Analytics />
    </>
  );
};

export default App;
