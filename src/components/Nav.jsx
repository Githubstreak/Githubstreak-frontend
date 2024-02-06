import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  DropdownItem, 
  DropdownTrigger, 
  Dropdown, 
  DropdownMenu, 
  Avatar
} from "@nextui-org/react";



// import headLogo from "./src/assets/images/Logo.png";


export default function App() {
  return (
    <Navbar>
      <NavbarBrand>

        {/* <Img
          src={headLogo}
          alt="Logo"
          height={120}
          width={20}
        />
         */}
       
        <p className="font-extrabold text-3xl text-inherit text-green-900 sm: text-xl ">Githubstreak</p>
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4" justify="center " items="center">
        <NavbarItem>
          <Link color="foreground" href="#" >
           Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Community
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="success"
              name="EDMond Akwasi"
              size="sm"
              src={""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">edmondakwasi111@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">Rank 2</DropdownItem>
            {/* <DropdownItem key="team_settings"></DropdownItem> */}
            {/* <DropdownItem key="analytics"></DropdownItem> */}
            {/* <DropdownItem key="system"></DropdownItem> */}
            {/* <DropdownItem key="configurations">Settings (coming soon)</DropdownItem> */}
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
