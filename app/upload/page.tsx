"use client";

import React from "react";
import { useState } from "react";

// axios
import axios from "axios";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";

// cancel dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

// alert dialog 
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
} from "../../Components/ui/alert-dialog"


// zod form validation
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";

// firabase
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// clerk
import { useUser } from "@clerk/nextjs";

// uuid
import { v4 } from "uuid";

// form schema

const FormSchema = z.object({
  postId: z.any(),
  picture: z.any(),
  title: z.string().min(2, {
    message: "Title should be atleast 2 characters",
  }),
  description: z.string().min(2, {
    message: "Description should be atleast 2 characters",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [imageUpload, setImageUpload] = useState(null);

  const [success, setSuccess] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (imageUpload === null) return;
    const randomId = v4();
    const imageRef = ref(storage, `shots/${user?.id}/${randomId}`);
    try {
      setLoading(true);
      uploadBytes(imageRef, imageUpload)
      .then(() => {
        console.log("image uploaded");
        getDownloadURL(imageRef).then((url) => {
          data.picture = url;
          data.postId = randomId;
          axios.post('/api/post', data).then((res) => {
            console.log(res);
            setSuccess(true);
            setLoading(false);
          })
        })
      })
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="w-full bg-white flex justify-between items-center px-10 py-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="px-5 py-4 rounded-3xl" variant={"secondary"}>
              Cancel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Unpublished work</DialogTitle>
              <DialogDescription>
                Your work is not out there. Make sure to post it before leaving.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-start items-center flex-row gap-4">
              <Button
                className="px-5 py-4 rounded-3xl"
                variant={"secondary"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="px-5 py-4 rounded-3xl"
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                Leave page
              </Button>
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>

        { success ? 
        <AlertDialog open={success} onOpenChange={setSuccess}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Shot uploaded successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Your work will be visible to the public. People can react and reach out to you.
              We will notify you if someone reacts to your work.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              window.location.href = "/dashboard";
              setSuccess(false);
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> : 
      <></>
      }

      </div>
      <div className="mt-4 w-full">
        <h1 className="text-[36px] text-slate-800 font-sans text-center font-semibold">
          What have you been working on
        </h1>
        {/* form component */}
        <div className="flex justify-center items-center flex-row lg:mt-10">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="picture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Picture</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...field}
                          onChange={(event: any) => {
                            setImageUpload(event?.target?.files[0]);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        This is display your post picture to the public.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="A starry night.." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is display your post title to the public.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Painted by famous french artist Van gogh.."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is display your post desc to the public.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
