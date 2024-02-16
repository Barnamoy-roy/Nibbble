"use client";
import React from "react";
import Image from "next/image";

// icons
import { IoSearch } from "react-icons/io5";
import { Menu } from "lucide-react";

// next/font
import localFont from "next/font/local";
const telma = localFont({ src: "../app/public/fonts/Telma/Telma-Bold.woff2" });

// clerk
import { UserButton } from "@clerk/nextjs";

// zustand
import { useUserSearchStore } from "@/store/userSearchStore";

// shadcn navbar
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/Components/ui/navigation-menu";

// shadcn input
import { Input } from "@/Components/ui/input";

// shadcn button
import { Button } from "@/Components/ui/button";
import Link from "next/link";

// props
interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const { userSearch, setUserSearch } = useUserSearchStore();

  return (
    <div className="flex">
      <div className="px-10 py-4 lg:flex hidden justify-between items-center w-full">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem className="text-md text-slate-700 font-semibold">
              Find talent
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-md text-slate-700 font-semibold">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-1]">
                  <li
                    title="Introduction"
                    className="hover:bg-slate-100 py-3 px-3 rounded-md"
                  >
                    <h1 className="text-md text-slate-600 font-semibold">
                      UI/UX
                    </h1>
                    <p className="text-sm text-slate-400">
                      Explore Ui desgins from top creators that cater to your
                      taste. Find web designs, app designs.
                    </p>
                  </li>
                  <li
                    title="Installation"
                    className="hover:bg-slate-100 py-3 px-3 rounded-md"
                  >
                    <h1 className="text-md text-slate-600 font-semibold">
                      Graphic Design
                    </h1>
                    <p className="text-sm text-slate-400">
                      We work with the top graphic designers that create
                      stunning and visually appealing designs.
                    </p>
                  </li>
                  <li
                    title="Typography"
                    className="hover:bg-slate-100 py-3 px-3 rounded-md"
                  >
                    <h1 className="text-md text-slate-600 font-semibold">
                      Photography
                    </h1>
                    <p className="text-sm text-slate-400">
                      Need assets? we have got you covered. Explore mindblowing
                      photos and videos on your platform.
                    </p>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="text-md text-slate-700 font-semibold">
              Jobs
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex justify-center items-center gap-4">
          <IoSearch className="text-muted-foreground relative left-11 top-2 transform -translate-y-1/2" />
          <Input
            className="w-[240px] h-[40px] rounded-3xl active:border-transparent px-8"
            placeholder="Search..."
            onChange={(e) => {
              setUserSearch(e.target.value);
            }}
          />
          {isAuthenticated ? (
            <>
              <Button
                asChild
                className="rounded-3xl font-sans text-sm font-regular"
              >
                <Link
                  href="/upload"
                  className="text-md text-white font-semibold"
                >
                  Upload work
                </Link>
              </Button>
              <UserButton afterSignOutUrl="/sign-in" />
            </>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <Button variant="ghost">
                <Link
                  href="/sign-in"
                  className="text-md text-slate-700 font-semibold"
                >
                  Log in
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-3xl font-sans text-sm font-regular"
              >
                <Link
                  href="/sign-up"
                  className="text-md text-white font-semibold"
                >
                  Sign up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* mobile navbar */}
      <div className="flex lg:hidden flex-row justify-between items-centerw w-full">
        <Menu className="mx-8 mt-7" />
        <div className="">
        {isAuthenticated ? (
            <div className="flex flex-row items-center justify-center mx-8 mt-5">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <Button variant="ghost">
                <Link
                  href="/sign-in"
                  className="text-md text-slate-700 font-semibold"
                >
                  Log in
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-3xl font-sans text-sm font-regular"
              >
                <Link
                  href="/sign-up"
                  className="text-md text-white font-semibold"
                >
                  Sign up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 mx-auto absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1
          className={`${telma.className} lg:text-3xl text-2xl cursor-pointer`}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Nibbble
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
