
import background from '../assets/images/background.jpg';
import summmary from '../assets/images/summary.png';
// import meme from '../assets/meme.png';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="hero min-h-[100vh] xl:min-h-screen mb-5"
      style={{
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        }}>
      <div className="container flex justify-between items-center h-full py-12">
          <div>
            <h1 className="text-7xl mt-10 font-extrabold md:text-7xl xl:text-7xl">
              Welcome to{" "}
              <span className="text-green-500">Githubstreak</span>
            </h1>
            <h4 className=" text-5xl font-bold md:text-5xl text-white mt-10">
              Improve your coding skills by solving real-world problems.
            </h4>
            <h5 className=" text-xl text-white mb-10 mt-10">
              Join a community of developers who stay accountable to each other to stay consistent in their coding journey.
            </h5>
          </div>
          <img src={summmary} alt="Deskhub image" className="mr-0"/>
         
          {/* <div className="w-full md:w-auto h-auto md:max-w-xl lg:max-w-md xl:max-w-lg"> */}
            {/* <div onClick={()=>navigate('/meme')} className=' mt-12 cursor-pointer hover:scale-105 transition-all duration-500 flex items-center gap-2 sm:w-[45%]  p-1 bg-gradient-to-r from-violet-700  to-fuchsia-500 rounded-full'> */}
            {/* <img src={meme} alt="asda" className=' w-12  '  />
            <span className=' font-bold text-yellow-200 '>Compare Github</span>
            <FaArrowRight color='yellow' /> */}
          {/* </div> */}
        </div>
      </div>
  );
};

export default Hero;
