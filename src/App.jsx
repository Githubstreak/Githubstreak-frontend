import { Analytics } from "@vercel/analytics/react"
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <>
      <Nav />
      <Outlet /> 
      <Footer />
      <Analytics/>
    </>
  );
};

export default App;
