import { track } from '@vercel/analytics';
import { XLogo, YoutubeLogo, Discord } from "../components/icons";


import logo from '/logo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (

<footer className="footer bg-neutral text-neutral-content items-center p-4">
 <div className=' w-full flex justify-between'>
 <aside className="grid-flow-col items-center">
    <img src={logo} alt="logo" className="  sm:w-24 "/>
    
  </aside>
  <div className=' ml-4'>
  <p>Copyright © {new Date().getFullYear()} - All right reserved #githubstreak '24</p>
  </div>
  <nav className=" flex gap-4 md:place-self-center md:justify-self-end">
    <Link to={'https://x.com/githubstreak'} target="_blank" onClick={()=>{
      track(<XLogo/>)
    }}>
      <XLogo/>
    </Link>
    <Link to={'https://youtube.com/@githubstreak01?si=tUr9EsmpuhAzgGad'} target="_blank" onClick={()=>{
      track(<YoutubeLogo/>)
    }}>
     <YoutubeLogo/>
    
     
    </Link>
    <Link to={'https://discord.gg/BqrYjZZ9'} target="_blank" onClick={()=>{
      track(<Discord/>)
    }}>
     <Discord/>
    </Link>
  </nav>
 </div>
</footer>
  )
}

export default Footer;

