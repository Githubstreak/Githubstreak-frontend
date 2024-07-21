import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// @ts-ignore TODO: Fix this
const clerkPKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// @ts-ignore  https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43848
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
