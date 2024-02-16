"use client";
import { useUser } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

import Image from "next/image";

// axios
import axios from "axios";

import { useEffect, useState } from "react";

// zustand
import { useUserPostListStore } from "@/store/userPostStore";

// shadcn
import { Button } from "@/Components/ui/button";
import Link from "next/link";

// lucide react
import { Pen } from "lucide-react";
import { Trash2 } from "lucide-react";

// firebase
import { storage } from "@/firebase";
import { ref, deleteObject, getStorage } from "firebase/storage";

// alert model
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

interface Post {
  image: string;
}

const Page: React.FC = () => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deletePost, setDeletePost] = useState({});
  const [success, setSuccess] = useState(false);

  const { userPostList, setUserPostList } = useUserPostListStore();

  const user = useUser();
  const imageUrl: any = user?.user?.imageUrl;
  const { id } = useParams();

  useEffect(() => {
    const getUserShots = async () => {
      try {
        // const res = await axios.get(`/api/getusershot/${id}`);
        axios.get(`/api/getusershot/${id}`).then((res) => {
          setUserPostList(res.data.shots);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserShots();
  }, [setUserPostList]);

  useEffect(() => {
    console.log(userPostList);
  }, [userPostList]);

  // delete post api call:
  const handleDelete = async (postId: string, mongoDbId: string) => {
    try {
      const res = await axios.post(`/api/deletepost/${mongoDbId}`);
      const desertRef = ref(storage, `shots/${id}/${postId}`);
      deleteObject(desertRef).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-0">
      <Navbar isAuthenticated={true} />
      <div className="flex lg:flex-row flex-col justify-center lg:items-center items-start w-full mt-20 pl-8 lg:pl-0">
        <Image
          src={imageUrl}
          width={100}
          height={100}
          alt=""
          className="rounded-[50%] mr-4"
        />
        <div className="text-left">
          <h1 className="lg:text-3xl text-2xl font-semibold text-slate-800">
            {user?.user?.fullName}
          </h1>
          <p className="lg:text-md text-sm font-regular text-slate-500 mt-2">
            Somewhere in this cold galaxy
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-start w-full lg:items-center items-start gap-8 lg:px-10 px-8 py-4 lg:mt-10 mt-4">
        <h4 className="text-md font-semibold text-slate-800">Work</h4>
        <h4 className="text-md font-semibold text-slate-800">Liked Shots</h4>
      </div>
      <div className="w-full lg:px-20 px-8 py-4 flex flex-col justify-start items-center">
        <div className="grid lg:grid-cols-4 gap-x-8 mt-10 md:grid-cols-2 grid-cols-1 gap-y-8">
          {userPostList.map((post) => (
            <div
              key={post.id}
              className="flex flex-col justify-center items-center w-full h-full rounded-lg cursor-pointer"
            >
              <Image
                src={post.image}
                alt=""
                width={400}
                height={400}
                className="rounded-lg"
                onClick={() => {
                  window.location.href = `/work/${post?.id}`;
                }}
              />
              <div className="flex flex-row justify-between items-center w-full mt-4">
                <div className="flex flex-row justify-center items-center gap-2">
                  <h1>{post?.title}</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-x-2">
                  <Button className="rounded-3xl font-sans text-sm font-regular">
                    <Pen className="w-4" onClick={() => {
                      window.location.href = `/edit/${post?.id}`;
                    }}/>
                  </Button>
                  <Button
                    className="rounded-3xl font-sans text-sm font-regular"
                    variant="destructive"
                    onClick={() => {
                      setDeletePost(post);
                      setDeleteAlert(true)
                    }}
                  >
                    <Trash2 className="w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      <Footer />
      {deleteAlert ? (
        <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete shot permanently
              </AlertDialogTitle>
              <AlertDialogDescription>
                This shot will be deleted from your profile, other people wont
                be able to see this and it will be removed from our database!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setSuccess(false);
                }}
              >
                cancel
              </AlertDialogAction>
              <AlertDialogAction
                onClick={() => {
                  handleDelete(deletePost.postId, deletePost.id)
                  setDeleteAlert(false);
                  setSuccess(true);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
      {success ? (
        <AlertDialog open={success} onOpenChange={setSuccess}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Shot deleted successfully!</AlertDialogTitle>
              <AlertDialogDescription>
                Your work is permanently deleted from your profile. People
                cannot see it anymore and you cannot recover it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  window.location.href = "/dashboard";
                  setSuccess(false);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
