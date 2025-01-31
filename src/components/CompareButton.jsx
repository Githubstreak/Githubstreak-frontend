import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import meme from '../assets/meme.png';

const CompareButton = () => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate('/meme')} className='cursor-pointer hover:scale-105 transition-all duration-500 flex items-center gap-2 p-1 px-5 bg-gradient-to-r from-violet-700  to-fuchsia-500 rounded-full'>
      <img src={meme} alt="asda" className=' w-12' />
      <span className='font-bold text-yellow-200 '>Compare Github</span>
      <FaArrowRight color='yellow' />
    </div>
  )
}

export default CompareButton;