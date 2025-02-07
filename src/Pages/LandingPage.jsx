import Nav from "../components/Nav";
import Faq from "./Faq";
import Home from "./Home";
import Footer from "../sections/Footer";
import { Analytics } from "@vercel/analytics/react"
const LandingPage = () => {
  return (
    <div>
       
        <Home/>
        <Faq/>
        
    </div>
  )
}

export default LandingPage


