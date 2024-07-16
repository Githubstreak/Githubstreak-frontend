import { Navbar, NavbarBrand, NavbarContent, Link } from "@nextui-org/react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default function App() {
  const { user } = useUser();
  const [userStats, setUserStats] = useState();

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
            className="w-[100px] md:w-[150px]"
          />
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end" className="text-[#e0e0e0]">
        <SignedOut>
          <SignInButton />
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
    </Navbar>
  );
}
