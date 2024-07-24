import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Pages
import Home from './Pages/Home.jsx';
import ProjectIdea from './Pages/ProjectIdea.jsx';
import TeamProject from './Pages/TeamProject.jsx';
import SoloProject from './Pages/SoloProject.jsx';
import MentorshipPage from './Pages/mentorship';
import Blog from './Pages/Blog';
import Faq from './Pages/Faq';
import AboutUs from './Pages/AboutUs';

// Import other pages/components as needed

const clerkPKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPKey}>
    {/* Defined Routes */}
    <Router>
      <Routes>
        <Route path="/" element={<App />}> 
          <Route index element={<Home />} />
          <Route path="project-idea" element={<ProjectIdea />} />
          <Route path="team-project" element={<TeamProject />} />
          <Route path="solo-project" element={<SoloProject />} />
          <Route path="mentorship" element={<MentorshipPage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="faq" element={<Faq />} />
          <Route path="About-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </Router>
    </ClerkProvider>
  </React.StrictMode>,
);
