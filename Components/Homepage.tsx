"use client";

import Image from "next/image";

import pic from "../public/testimg.jpg";
import { useEffect } from "react";

import { getPostData } from "@/app/controller/getPostData";

import Category from "./Category";

import axios from "axios";

import { useUser } from "@clerk/nextjs";

import { FaHeart } from "react-icons/fa6";

// zustand
import { useUserSearchStore } from "@/store/userSearchStore";
import { usePostListStore } from "@/store/store";

interface Post {
  id: string;
  title: string;
  image: string;
  // Add other properties if needed
}

const Homepage: React.FC = () => {
  const user = useUser();

  const { postList, setPostList } = usePostListStore();

  const { userSearch, setUserSearch } = useUserSearchStore();

  useEffect(() => {
    // getPostData();
    const getPostData = async () => {
      try {
        // axios.get("/api/getpost").then((res) => {
        //   setPostList(res.data);
        // });
        const res = await axios.get("/api/getpost");
        const postData = res.data; 
        if(Array.isArray(postData)){
          setPostList(res.data);
        }
        else {
          console.log("Not an array")
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPostData();
  }, [setPostList]);

  useEffect(() => {
    console.log(postList); // Log the updated state
  }, [postList]);


  return (
    <div className="lg:px-20 px-8 py-4 flex flex-col justify-start items-center w-full">
      <div className="w-full flex justify-start items-center">
        <Category />
      </div>
      <div className="grid lg:grid-cols-4 gap-x-8 mt-10 md:grid-cols-2 grid-cols-1 gap-y-8">
        {user && !userSearch && !postList
          ? postList.map((post) => (
              <div
                key={post.id}
                className="flex flex-col justify-center items-center  w-full h-full rounded-lg cursor-pointer"
                onClick={() => {
                  window.location.href = `/work/${post?.id}`;
                }}
              >
                <Image
                  src={post.image}
                  alt=""
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
                <div className="flex flex-row justify-between items-center w-full mt-4">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <h1>{post?.title}</h1>
                  </div>
                  <div>
                    <FaHeart />
                  </div>
                </div>
              </div>
            ))
          : postList
              .filter((post) =>
                post?.title?.toLowerCase().includes(userSearch?.toLowerCase())
              )
              .map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col justify-center items-center  w-full h-full rounded-lg cursor-pointer"
                  onClick={() => {
                    window.location.href = `/work/${post?.id}`;
                  }}
                >
                  <Image
                    src={post.image}
                    alt=""
                    width={400}
                    height={400}
                    className="rounded-lg"
                  />
                  <div className="flex flex-row justify-between items-center w-full mt-4">
                    <div className="flex flex-row justify-center items-center gap-2">
                      <h1>{post?.title}</h1>
                    </div>
                    <div>
                      <FaHeart />
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};

export default Homepage;
