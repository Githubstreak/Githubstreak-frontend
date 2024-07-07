import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

export default function App() {
  const { user } = useUser();

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
      </NavbarContent>
    </Navbar>
  );
}
