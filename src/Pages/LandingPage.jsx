import Faq from "./Faq";
import Home from "./Home";
import Features from "../sections/Features";

const LandingPage = () => {
  return (
    <div className="bg-slate-950">
      <Home />
      <Features />
      <Faq />
    </div>
  );
};

export default LandingPage;
