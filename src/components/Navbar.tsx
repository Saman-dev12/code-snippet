"use client";
import React, { memo, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/userAtoms";
import dynamic from "../../node_modules/next/dynamic";
import { cn } from "@/utils/cn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userAtom);
  const [modal, setModal] = useState(false);
  const [snippetData, setSnippet] = useState<{
    snippetname: string;
    language: string;
  }>({ snippetname: "", language: "" });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  useEffect(() => {
    const userState = JSON.parse(
      localStorage.getItem("recoil-persist") || "{}"
    ).user;

    if (!userState) {
      router.push("/login");
    }
  }, [router]);
  const handleSnippetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors((prevErrors) => ({ ...prevErrors, snippetname: "" }));
    setSnippet({ ...snippetData, snippetname: e.target.value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors((prevErrors) => ({ ...prevErrors, language: "" }));
    setSnippet({ ...snippetData, language: e.target.value });
  };

  const token = localStorage.getItem("token");
  const userEmail = token ? JSON.parse(token).email : "";

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const logout = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
      });
      const res = await logout.json();
      if (res) {
        localStorage.removeItem("token");
        setIsLoggedIn(null);
        toast.success("Logout successful");
        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  return (
    <>
      <Navbar className="bg-black ">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold text-white">Code Snippet</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarBrand className="flex items-center gap-2">
            <Link href="/" className="font-bold text-white">
              Code Snippet
            </Link>
          </NavbarBrand>
          <NavbarItem>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </NavbarItem>
          {isLoggedIn && (
            <NavbarItem>
              <Link
                href="/dashboard"
                className="text-white hover:text-gray-300"
              >
                Dashboard
              </Link>
            </NavbarItem>
          )}
          <NavbarItem>
            <Link href="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {!isLoggedIn && (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color="primary" href="/signup" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}

          {isLoggedIn && (
            <>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://imgs.search.brave.com/bFF8_xQy_-cBA55VIKAy68h8rgyZDOyvB5FXxL1xR5g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY1LzEwLzQ3/LzM2MF9GXzY1MTA0/NzE4X3gxN2E3Nnd6/V0tJbTNCbGhBNnV5/WVZrRHM5OTgyYzZx/LmpwZw"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{userEmail}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="help_and_feedback"
                    as={Link}
                    href="/contact"
                  >
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    as={Button}
                    color="danger"
                    onClick={(
                      event: React.MouseEvent<HTMLLIElement, MouseEvent>
                    ) =>
                      handleLogout(
                        event as unknown as React.MouseEvent<
                          HTMLButtonElement,
                          MouseEvent
                        >
                      )
                    }
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem className="flex flex-col gap-2">
            <Link href="/" className="text-black hover:text-gray-300">
              Home
            </Link>
            <Link href="/howtouse" className="text-black hover:text-gray-300">
              How to use
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-300">
              Contact
            </Link>
            <Button color="primary" variant="flat">
              <Link href="/login" className="text-black hover:text-gray-300">
                Login
              </Link>
            </Button>
            <Button color="primary" variant="flat">
              <Link href="/signup" className="text-black hover:text-gray-300">
                Sign up
              </Link>
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });
// export default App
