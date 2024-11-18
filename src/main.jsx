import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Pages
import Home from './Pages/Home.jsx';
import ProjectIdea from './Pages/ProjectIdea.jsx';
// import Project from './Pages/Project.jsx';
// import ProjectDetail from './Pages/ProjectDetail.jsx';
import MentorshipPage from './Pages/mentorship';
import Blog from './Pages/Blog';

import AboutUs from './Pages/AboutUs';
import Meme from "./Pages/Meme.jsx";
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
          {/* <Route path="project" element={<Project />} /> */}
          {/* <Route path="project-detail/:projectId" element={<ProjectDetail />} /> */}
          <Route path="mentorship" element={<MentorshipPage />} />
          <Route path="blog" element={<Blog />} />
        
          <Route path="About-us" element={<AboutUs />} />
          <Route path="meme" element={<Meme />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
    </ClerkProvider>
  </React.StrictMode>,
);
