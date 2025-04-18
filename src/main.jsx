import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";


//Pages



import { BrowserRouter } from "react-router-dom";



const clerkPKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPKey}>
    
 <BrowserRouter>
 <App/>
 </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
);



