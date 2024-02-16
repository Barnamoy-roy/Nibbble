"use client";

import { useEffect, useState } from "react";

import Navbar from "@/Components/Navbar";

import { redirect } from "next/navigation";

// components
import { Button } from "@/Components/ui/button";
import Homepage from "@/Components/Homepage";

// clerk
import { auth, useUser } from "@clerk/nextjs";

export default function Home() {
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call once to set initial state

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { user } = useUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div>
      {isDesktop ? (
        <div>
          <Navbar />
          <div className="flex justify-center items-center w-full h-full flex-col mt-20 flex-wrap">
            <div className="rounded-3xl w-fit bg-pink-300 text-slate-800 font-medium text-md text-center px-4 py-2 font-serif">
              Over 3-million ready-to-work creatives!
            </div>
            <div className="grid place-items-center grid-cols-1 mt-10">
              <h1 className="lg:text-[72px] md:text-[64px] sm:text-[48px] text-black font-serif font-normal w-[80%] text-center leading-tight">
                Work with the world’s top creative talent.
              </h1>
              <h4 className="mt-4 text-center font-sans text-black text-xl">
                Connect with millions of top-rated designers & agencies around
                the world.
              </h4>
              <Button className="mt-10 rounded-3xl text-sm px-6 py-6 font-sans font-medium">
                Start hiring today
              </Button>
            </div>
          </div>
          <div className="mt-20 bg-yellow-300 flex justify-center items-center flex-col py-20">
            <h1 className="font-regular font-serif w-[40%] text-slate-800 font-sans text-center text-[64px] leading-[4rem]">
              Find your next designer today
            </h1>
            <p className="text-black text-[20px] font-serif font-regular w-[40%] text-center mt-10">
              The worlds leading brands use Nibbble to hire creative minds.
              Browse millions of top rated portfolios to find your creative
              match.
            </p>
            <div className="flex justify-center items-center flex-row gap-4">
              <Button
                className="mt-10 rounded-3xl text-sm px-6 py-6 font-sans font-medium"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Get started now
              </Button>
              <Button
                className="mt-10 rounded-3xl text-sm px-6 py-6 font-sans font-medium bg-white text-black"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Learn about hiring
              </Button>
            </div>
            <h4 className="mt-10 text-2xl text-center font-sans font-light">
              Are you are designer?{" "}
              <a href="/signup" className="underline">
                Join Nibbble
              </a>
            </h4>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-screen text-center justify-center items-center">
          <h1 className="font-serif text-3xl text-center text-slate-800">
            Please open this on desktop
          </h1>
          <p className="text-lg w-[80%] text-center font-serif text-slate-500 mt-4">
            we are currently working on the mobile version of the website, thank
            you for your patience
          </p>
        </div>
      )}
    </div>
  );
}
