
import background from '../assets/images/background.jpg';
import summmary from '../assets/images/summary.png';
import meme from '../assets/meme.png';
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
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between h-full px-6 py-12">
        <div className="text-left md:w-1/2">
          <h1 className="text-4xl font-bold md:text-6xl xl:text-8xl">
            Welcome to{" "}
            <span className="text-green-500  font-extrabold">Githubstreak</span>
          </h1>
          <h4 className="text-4xl font-semibold md:text-5xl text-white mt-4">
              Level up your coding game, and set new records!
          </h4>
          <h5 className="text-2xl text-white mb-6 mt-6">
              Celebrate your achievements with our growing GithubStreak Community!
          </h5>
          <h6 className="text-2xl text-white mb-6">
              We welcome all developers of any level or background. Collaborate, learn, and grow together!
          </h6>
        </div>
        <div className="w-full md:w-auto h-auto md:max-w-xl lg:max-w-md xl:max-w-lg">
       <div onClick={()=>navigate('/meme')} className=' mt-12 cursor-pointer hover:scale-105 transition-all duration-500 flex items-center gap-2 sm:w-[45%]  p-1 bg-gradient-to-r from-violet-700  to-fuchsia-500 rounded-full'>
       <img src={meme} alt="asda" className=' w-12  '  />
      <span className=' font-bold text-yellow-200 '>Compare Github</span>
      <FaArrowRight color='yellow' />
       </div>
          <img
            src={summmary}
            alt="GitHub Streak Cards"
            className="w-full mt-4  md:w-auto h-auto xl:max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
