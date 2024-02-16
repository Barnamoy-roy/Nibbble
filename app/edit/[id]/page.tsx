"use client";

import React from "react";
import { useState } from "react";

// next-navigation 
import { useParams } from "next/navigation";

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
} from "../../../Components/ui/alert-dialog"


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

// clerk
import { useUser } from "@clerk/nextjs";

// form schema

const FormSchema = z.object({
  postId: z.any(),
  newTitle: z.string().min(2, {
    message: "Title should be atleast 2 characters",
  }),
  newDescription: z.string().min(2, {
    message: "Description should be atleast 2 characters",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newTitle: "",
      newDescription: "",
    },
  });

  const [success, setSuccess] = useState(false);

  const {id} = useParams();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post(`/api/editpost/${id}`, data)
      setSuccess(true);
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
            <AlertDialogTitle>Shot updated successfully!</AlertDialogTitle>
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
          Change is the only constant
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
                  name="newTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Title</FormLabel>
                      <FormControl>
                        <Input placeholder="A new touch to a old friend" {...field} />
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
                  name="newDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How did you make it?.."
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
                <Button type="submit">Confirm Edit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;