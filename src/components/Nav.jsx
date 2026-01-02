import { track } from "@vercel/analytics";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  Badge,
  DropdownItem,
} from "@nextui-org/react";
import { FaAngleDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { Github } from "../components/icons/Github";
import useUserStats from "../hooks/useUserStats";
import "../index.css"; // Ensure this imports your custom styles

export default function App() {
  const { userStats, streakStatus } = useUserStats();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Streak fire color based on status
  const getFireColor = () => {
    switch (streakStatus) {
      case "today":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "broken":
        return "text-red-500";
      default:
        return "text-green-500";
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-40">
      <div className="flex justify-between md:justify-center px-3 py-4 border-b drop-shadow-2xl md:border-none bg-[#211f21] md:bg-white/0">
        <div className="w-full flex md:w-auto justify-between items-center md:border md:py-2.5 sm:px-7 rounded-xl lg:max-w-3xl md:bg-slate-800 md:backdrop:blur-xl gap-10 sm:gap-16">
          <div>
            <Link to="/">
              <img
                height={100}
                width={100}
                src="/logo.png"
                className="p-2"
                //  className="w-[130px] md:w-[130px] p-8 sm:w-[145px] lg:w-[130px]"
              />
            </Link>
          </div>
          <div className="hidden md:block text-white">
            <nav className="flex gap-8 text-sm">
              {/* <div className=" transition mt-2 flex  items-center">
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">Project</DropdownTrigger>
                    <DropdownMenu  aria-label="Static Actions">
                      <DropdownItem key="project-ideas">
                        <Link onClick={() => {track("Project Ideas");}} to={"/project-ideas"}>Project Ideas</Link>
                      </DropdownItem>
                      <DropdownItem key="project">
                        <Link to={'/project'}>Projects</Link>
                      </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <FaAngleDown className="cursor-pointer"/>
              </div> */}
              {/* <Badge classNames="" content="soon" color='success' className="h-4 text-green-900" shape='circle'>
                <Link className=" transition relative  mt-2" to={"/mentorship"}>Mentorship</Link>
              </Badge> */}
              <Link
                to={"https://nas.io/githubstreak"}
                className="transition mt-2"
              >
                Join Community
              </Link>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            {userStats && (
              <p
                className="flex items-center text-white gap-1"
                title={`${
                  streakStatus === "today"
                    ? "Committed today!"
                    : streakStatus === "pending"
                    ? "Commit today to keep streak!"
                    : "Start a new streak!"
                }`}
              >
                <span>
                  <FaFire size={22} className={getFireColor()} />
                </span>
                <span className="font-semibold">
                  {userStats.currentStreak?.count || 0}
                </span>
              </p>
            )}
            <Link
              to="https://github.com/Githubstreak"
              target="_blank"
              className=" bg-white p-1 rounded-full"
            >
              <Github />
            </Link>
            <SignedOut>
              <SignInButton className=" rounded-full p-2 bg-green-500 text-gray-900" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <span onClick={handleCloseMenu} className="md:hidden text-white">
              <IoMenu size={"28px"} />
            </span>
          </div>
          {menuOpen && (
            <div className="absolute left-0 w-full bg-gray-800   py-16 sm:hidden top-[73px] rounded-md backdrop-blur-md">
              <div className="flex flex-col   p-4">
                <ul className=" flex flex-col justify-center items-center space-y-4 text-white    ">
                  {/* <li className=''>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button>Project</Button>
                      </DropdownTrigger>
                    </Dropdown>
                  </li>
                  <li>
                    <Link to={'/'}>Mentorship</Link>
                  </li> */}
                  <li>
                    <Link to={"https://github.com/Githubstreak"}>
                      Join Community
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
