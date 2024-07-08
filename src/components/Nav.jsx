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

      const res = await axios.get(`http://localhost:3001?id=${user.id}`);

      setUserStats(res.data);
    };

    getUserStats(user);
  }, [user]);
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-extrabold text-3xl text-inherit text-green-900">
          Githubstreak
        </p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {userStats && <p>{userStats.currentStreak.count}</p>}
      </NavbarContent>
    </Navbar>
  );
}
