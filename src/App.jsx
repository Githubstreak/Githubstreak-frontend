import { Analytics } from "@vercel/analytics/react"
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./sections/Footer";
import Faq from './Pages/Faq';
const App = () => {
  return (
    <>
      <Nav />
      <Outlet /> 
      <Faq/>

      <Footer />
      <Analytics/>
    </>
  );
};

export default App;
