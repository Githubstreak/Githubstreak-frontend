import { track } from '@vercel/analytics';
import { 
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  Button,
  Badge,
  DropdownItem
} from "@nextui-org/react";
import { FaAngleDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import fire from '../../public/flame.png'
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import {  FaFire } from "react-icons/fa";
import axios from "axios";
import { Github } from "../components/icons/Github";
import { API_URL } from "../utils/constants";
import '../index.css'; // Ensure this imports your custom styles

export default function App() {
  const { user } = useUser();
  const [userStats, setUserStats] = useState(0);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getUserStats = async (user) => {
      if (!user) return;

      const res = await axios.get(`${API_URL}/v1/users/stat?id=${user.id}`);

      setUserStats(res.data);
    };

    getUserStats(user);
  }, [user]);

  const handleCloseMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // useEffect(() => {
  //   handleCloseMenu();
  // }, [location]);

  return (
    // <Navbar className="bg-gray-800">
    //   <NavbarBrand>
    //     <Link to="/">
    //       <img
    //         height={150}
    //         width={150}
    //         src="/logo.png"
    //         className="w-[145px] md:w-[150px] p-8 sm:w-[145px] lg:w-[150px]"
    //       />
    //     </Link>
    //   </NavbarBrand>

    //   <NavbarContent className="hidden gap-4 sm:flex" justify="center">
    //     <Dropdown>
    //       <NavbarItem>
    //         <DropdownTrigger>
    //           <Button className="p-0 mt-2 bg-transparent data-[hover=true]:bg-transparent text-[#e0e0e0] text-medium">
    //             Projects <FaChevronDown className="pt-1 ml-1" />
    //           </Button>
    //         </DropdownTrigger>
    //       </NavbarItem>

    //       <DropdownMenu
    //         className="w-[120px]"
    //         itemClasses={{
    //           base: "gap-4",
    //         }}
    //       >
    //         <DropdownItem>
    //           <Link to="/project-idea" className="text-[#000000]"
    //              onClick={() => {
    //               track("Project Ideas");
    //             }}
    //           >
    //             Project Ideas
    //           </Link>
    //         </DropdownItem>

    //         <DropdownItem>
    //           <Link to="/team-project" className="text-[#000000]">
    //             Team Project
    //           </Link>
    //         </DropdownItem>

    //         <DropdownItem>
    //           <Link to="/solo-project" className="text-[#000000]">
    //             Solo Project
    //           </Link>
    //         </DropdownItem>
    //       </DropdownMenu>
    //     </Dropdown>
    //   </NavbarContent>

    //   <NavbarContent className="hidden gap-4 sm:flex">
    //     <Badge
    //       content="soon"
    //       shape="circle"
    //       color="success"
    //       className="h-5 text-green-900"
    //     >
    //       <Link 
    //         to="/mentorship" 
    //         className="relative text-[#e0e0e0] mt-2"
    //         variant="light"
    //         onClick={() => {
    //           track("Mentorship");
    //         }}
    //       >
    //         Mentorship
    //       </Link>
    //     </Badge>

    //     <a href="https://nas.io/githubstreak" className="relative text-[#e0e0e0] mt-2"

    //     >
    //       Join Community
    //     </a>

    //   </NavbarContent>

      
    //   <NavbarContent
    //     as="div"
    //     justify="end"
    //     className="hidden sm:flex gap-4 text-[#e0e0e0]"
    //   >
    //     <Link to="/blog" className="relative text-[#e0e0e0] mt-2"
    //       onClick={() => {
    //         track("Blog");
    //       }}
    //     >
    //       Blog
    //     </Link>
    //     <Link to="/faq" className="relative text-[#e0e0e0] mt-2">
    //       FAQ
    //     </Link>

    //     <Link
    //       to="https://github.com/Githubstreak"
    //       target="_blank"
    //       rel="noreferrer"
    //       className="light-mode-github"
    //     >
    //       <Github />
    //     </Link>

    //     <SignedOut>
    //       <SignInButton className= "light-mode-button" />
    //     </SignedOut>
    //     <SignedIn>
    //       <UserButton />
    //     </SignedIn>

    //     {userStats && (
    //       <p className="flex items-center text-white">
    //         <span>
    //           <FaFire size={20} color="green" />
    //         </span>
    //         {userStats.currentStreak.count}
    //       </p>
    //     )}
    //   </NavbarContent>

    //   <Button
    //     className="p-2 sm:hidden bg-success"
    //     onClick={() => setMenuOpen(!menuOpen)}
    //   >
    //     <FaBars />
    //   </Button>

    //   {menuOpen && (
    //     <div className="absolute left-0 w-full bg-gray-800 sm:hidden top-16">
    //       <NavbarContent className="flex flex-col gap-4 p-4">
    //         <Dropdown>
    //           <DropdownTrigger>
    //             <Button className="p-0 mt-2 bg-transparent data-[hover=true]:bg-transparent text-[#e0e0e0] text-medium">
    //               Projects <FaChevronDown className="pt-1 ml-1" />
    //             </Button>
    //           </DropdownTrigger>
    //           <DropdownMenu
    //             className="w-[120px]"
    //             itemClasses={{
    //               base: "gap-4",
    //             }}
    //           >
    //             <DropdownItem>
    //               <Link to="/project-idea" className="text-[#000000]"
    //                onClick={() => {
    //                 track("Project Ideas");
    //               }}
    //               >
    //                 Project Ideas
    //               </Link>
    //             </DropdownItem>
    //             <DropdownItem>
    //               <Link to="/team-project" className="text-[#000000]">
    //                 Team Project
    //               </Link>
    //             </DropdownItem>
    //             <DropdownItem>
    //               <Link to="/solo-project" className="text-[#000000]">
    //                 Solo Project
    //               </Link>
    //             </DropdownItem>
    //           </DropdownMenu>
    //         </Dropdown>

    //         <Badge
    //           content="soon"
    //           shape="circle"
    //           color="success"
    //           className="h-5 text-green-900"
    //         >
    //           <Link 
    //             to="/mentorship" 
    //             className="relative text-[#e0e0e0] mt-2"
    //             variant="light"
    //             onClick={() => {
    //               track("Mentorship");
    //             }}
    //           >
    //             Mentorship
    //           </Link>
    //         </Badge>
    //         <a href="https://nas.io/githubstreak" className="relative text-[#e0e0e0] mt-2"
    //         >
    //           Join Community
    //         </a>

    //         <hr className="my-1 border-green-900" />

    //         <Link to="/blog" className="relative text-[#e0e0e0] mt-2"
    //           onClick={() => {
    //             track("Blog");
    //           }}
    //         >
    //           Blog
    //         </Link>

    //         <Link to="/faq" className="relative text-[#e0e0e0] mt-2">
    //           FAQ
    //         </Link>

    //         <Link
    //           to="https://github.com/Githubstreak"
    //           target="_blank"
    //           rel="noreferrer"
    //           className="light-mode-github"
    //         >
    //           <Github />
    //         </Link>

    //         <SignedOut>
    //           <SignInButton className="mt-2 light-mode-button" />
    //         </SignedOut>
    //         <SignedIn>
    //           <UserButton />
    //         </SignedIn>
    //       </NavbarContent>
    //     </div>
    //   )}
    // </Navbar>
    <header className=" w-screen py-4 border-b md:border-none fixed top-0 left-0 right-0 bg-[#211f21] md:bg-white/0 z-40 ">
    <div className="container md:pl-36 px-3    ">
      <div className="   flex justify-between items-center md:border md:p-2.5  rounded-full max-w-2xl lg:max-w-3xl mx-auto  md:bg-slate-800 md:backdrop:blur-xl ">
        <div>
        <Link to="/">
           <img
             height={100}
             width={100}
             src="/logo.png"
            //  className="w-[130px] md:w-[130px] p-8 sm:w-[145px] lg:w-[130px]"
            className='p-2'
           />
        </Link>
        </div>
        <div className="hidden md:block text-white">
          <nav className="flex gap-8 text-sm  ">
            <div
              className=" transition mt-2 flex  items-center"
             
            >
              <Dropdown>
      <DropdownTrigger>
      Project 
      </DropdownTrigger>
      <DropdownMenu  aria-label="Static Actions">
        <DropdownItem key="project-idea">
          <Link onClick={() => {
                   track("Project Ideas");
                 }} to={'/project-idea'}>Project Ideas</Link>
        </DropdownItem>
        <DropdownItem key="team-project">
          <Link to={'/team-project'}>Team Project</Link>
        </DropdownItem>
        <DropdownItem key="solo-project">
          <Link to={'/solo-project'}>Solo Project</Link>
        </DropdownItem>
        
      </DropdownMenu>
    </Dropdown>
    <FaAngleDown />
            </div>
              

           <Badge classNames="" content="soon" color='success' className="h-4 text-green-900" shape='circle'>
           <Link
              className=" transition relative  mt-2 "
             to={"/"}
            >
              Mentorship
            </Link>
           </Badge>
            <Link  
            to={"https://nas.io/githubstreak"}
              className="transition mt-2"
              
            >
              Join Community
            </Link>
            <Link to={'/faq'}
              className="transition mt-2"
              
            >
              Faq
            </Link>
           
           
            
          </nav>
        </div>
        <div className="flex gap-4 items-center">
        {userStats && (
           <p className="flex items-center text-white">
             <span>
               <FaFire size={22} color="green" />
             </span>
             {userStats}
           </p>
         )}
        <Link  to="https://github.com/Githubstreak" target='_blank' className=' bg-white p-1 rounded-full'>
        <Github />
        </Link>

       
        <SignedOut >
               <SignInButton className=" rounded-full p-2 bg-green-500" />
             </SignedOut>
             <SignedIn  >
               <UserButton  />
             </SignedIn>
            
         
          <span onClick={handleCloseMenu} className="md:hidden text-white">
            <IoMenu size={"28px"} />
          </span>
        </div>

        {
          menuOpen && (
            <div className='absolute left-0 w-full bg-gray-800   py-16 sm:hidden top-[73px] rounded-md backdrop-blur-md'>
              <div className="flex flex-col   p-4">
                <ul className=' flex flex-col justify-center items-center space-y-4 text-white    '>
                  <li className=''>
                  <Dropdown>
      <DropdownTrigger>
        <Button 
          
        >
         Project
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">
          Project ideas
        </DropdownItem>
        <DropdownItem key="copy">Team Project</DropdownItem>
        <DropdownItem key="edit">solo Project</DropdownItem>
        
      </DropdownMenu>
    </Dropdown>
                  </li>
                  <li>
                    <Link to={'/'}>
                    Mentorship
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                    blog
                    </Link>
                  </li>
                  <li>
                  <Link to={'https://github.com/Githubstreak'}>
                   Join Community
                    </Link>
                  </li>
                 

                </ul>
              </div>
            </div>
          )
        }
      </div>
    </div>
  </header>
  );
}
