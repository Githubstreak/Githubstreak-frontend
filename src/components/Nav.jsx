import { 
  Navbar, 
  Badge,
  NavbarBrand, 
  NavbarContent, 
  Link, 
  Dropdown,
  DropdownTrigger,
  DropdownMenu, 
  DropdownItem,
  NavbarItem,
  Button } from "@nextui-org/react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaBars, FaFire } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default function App() {
  const { user } = useUser();
  const [userStats, setUserStats] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUserStats = async (user) => {
      if (!user) return;

      const res = await axios.get(`${API_URL}/v1/users/stat?id=${user.id}`);

      setUserStats(res.data);
    };

    getUserStats(user);
  }, [user]);
  return (
    <Navbar className="bg-gray-800">
      <NavbarBrand>
        <Link href="/">
          <img
            height={150}
            width={150}
            src="/logo.png"
            className="w-[135px] md:w-[150px] p-8 sm:w-[140px] lg:w-[150px]"
          />
        </Link>
      </NavbarBrand>
     
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <Dropdown>

          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 mt-2 bg-transparent data-[hover=true]:bg-transparent text-[#e0e0e0] text-medium"
              >
                Projects <FaChevronDown className="pt-1 ml-1" />
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          
          <DropdownMenu
            className="w-[120px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem>
              <Link href="/team-project" className="text-[#000000]">
                Project Ideas
              </Link>
            </DropdownItem>

            <DropdownItem>
              <Link href="/team-project" className="text-[#000000]">
                Team Project 
              </Link>
            </DropdownItem>

            <DropdownItem>
              <Link href="/solo-project" className="text-[#000000]">
                Solo Project
              </Link>
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown>

      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex">

      <Badge content="soon" shape="circle" color="success" className="h-5 text-green-900">

        <Link 
        href="/mentorship" 
        className="relative text-[#e0e0e0] mt-2"
        isIconOnly
        variant="light"
        
        >
          Mentorship
        </Link>
      
    </Badge>

        

      </NavbarContent>
      

      <NavbarContent as="div" justify="end" className="hidden sm:flex gap-4 text-[#e0e0e0]">

      <Link href="/blog" className="relative text-[#e0e0e0] mt-2">
         Blog
        </Link>
        <Link href="/faq" className="relative text-[#e0e0e0] mt-2">
          FAQ
        </Link>

        <SignedOut >
          <SignInButton className="mt-2"/>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {userStats && (
          <p className="flex items-center text-white">
            <span>
              <FaFire size={20} color="green" />
            </span>
            {userStats.currentStreak.count}
          </p>
        )}
      </NavbarContent>

      <Button
        className="p-2 sm:hidden bg-success"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaBars />
      </Button>

      {menuOpen && (
        <div className="absolute left-0 w-full bg-gray-800 sm:hidden top-16">
          <NavbarContent className="flex flex-col gap-4 p-4">
            <Dropdown>
              <DropdownTrigger>
                <Button className="p-0 mt-2 bg-transparent data-[hover=true]:bg-transparent text-[#e0e0e0] text-medium">
                  Projects <FaChevronDown className="pt-1 ml-1" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="w-[120px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem>
                  <Link href="/team-project" className="text-[#000000]">
                    Project Ideas
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href="/team-project" className="text-[#000000]">
                    Team Project
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href="/solo-project" className="text-[#000000]">
                    Solo Project
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Badge content="soon" shape="circle" color="success" className="h-5 text-green-900">

            <Link 
              href="/mentorship" 
              className="relative text-[#e0e0e0] mt-2"
              isIconOnly
              variant="light"
        
            >
              Mentorship
            </Link>
      
            </Badge>

            <hr className="my-1 border-green-900" />

            <Link href="/blog" className="relative text-[#e0e0e0] mt-2">
              Blog
            </Link>
            <Link href="/faq" className="relative text-[#e0e0e0] mt-2">
              FAQ
            </Link>

            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </NavbarContent>
        </div>
      )}
    </Navbar>
  );
}
