import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const { user } = useUser();
  const [userStats, setUserStats] = useState();

  useEffect(() => {
    const getUserStats = async (user) => {
      if (!user) return;

      const res = await axios.get(
        `http://localhost:3001/v1/users/stat?id=${user.id}`,
      );

      setUserStats(res.data);
    };

    getUserStats(user);
  }, [user]);
  return (
    <Navbar className="bg-gray-800">
      <NavbarBrand>
        <img height={150} width={150} src="/logo.png" />
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {userStats && (
          <p className="text-white">{userStats.currentStreak.count}</p>
        )}
      </NavbarContent>
    </Navbar>
  );
}
