'use client'

import { useParams } from "next/navigation";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

import pic from "@/public/testimg.jpg";
import Image from "next/image";

import { useEffect, useState } from "react";

import axios from 'axios';

const Page = () => {
  const { id } = useParams();

  const [shot, setShot] = useState(null);

  // const getShot = async () => {
  //   try {
  //     const res = await axios.get(`/api/getshot/${id}`);
  //     setShot(res.data);
  //     console.log(shot);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  useEffect(() => {
    const getShot = async () => {
    try {
      axios.get(`/api/getshot/${id}`).then((res) => {
        setShot(res.data); 
      });
    } catch (error) {
      console.error(error);
    };
  };
  getShot();
  }, [setShot]);

  useEffect(() => {
    console.log(shot); // Log the updated state
  }, [shot]);

  return (
    <div className="flex flex-col gap-20 lg:gap-0">
      <Navbar isAuthenticated={true}/>
      <div className="w-full h-full flex flex-col justify-center items-center px-8 py-4 lg:px-32 lg:py-10">
        <div className="w-full text-left rounded-md">
          <h1 className="text-2xl font-semibold">{shot?.shot?.title}</h1>
          <h2 className="text-md font-regular mt-2 text-slate-500">
            {shot?.shot?.desc}
          </h2>
        </div>
        <div className="lg:mt-20 mt-10 rounded-md">
          <Image
            src={shot?.shot?.image}
            alt="Picture of the author"
            width={1024}
            height={1149}
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <p className="text-center text-slate-600 max-w-[80%] lg:text-xl text-md font-medium lg:mt-20 mt-10">
          {shot?.shot?.desc}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
