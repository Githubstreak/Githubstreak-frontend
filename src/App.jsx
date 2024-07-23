import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <>
      <Nav />
      <Outlet /> 
      <Footer />
    </>
  );
};

export default App;
