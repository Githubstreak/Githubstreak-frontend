import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import Footer from "./sections/Footer";
import Project from "./Pages/Project";
import Meme from "./Pages/Meme";
import LandingPage from "./Pages/LandingPage";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="meme" element={<Meme />} />
        <Route path="project" element={<Project />} />
        <Route path="profile" element={<Profile />} />
      </Routes>

      <Footer />
      <Analytics />
    </>
  );
};

export default App;
