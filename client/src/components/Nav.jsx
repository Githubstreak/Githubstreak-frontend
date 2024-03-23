import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import axios from 'axios'; // Import Axios for making HTTP requests

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [user, setUser] = useState(null); // State to store user information

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Make a request to the backend to initiate GitHub OAuth flow
      const response = await axios.get('/auth/github');
      // If the request is successful, update login status
      if (response.status === 200) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Make a request to the backend to logout
      const response = await axios.get('/logout');
      // If the request is successful, update login status
      if (response.status === 200) {
        setLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-extrabold text-3xl text-inherit text-green-900 sm: text-xl ">Githubstreak</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {loggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="success"
                name={user.email} // Display user's email as their name
                size="sm"
                src={""} // Add user's profile picture if available
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Rank 2</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button color="success" onClick={handleLogin}>
            Log In
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}
