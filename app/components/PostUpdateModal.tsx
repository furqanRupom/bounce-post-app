"use client"
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Fragment, useState,useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function PostUpdateModal({ isOpen, setIsOpen,id}:any) {


    const router = useRouter();
    const updateRef = useRef("");


  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }


  const handleUpdate = async () =>{
    try {
         const updateText = updateRef.current.value


        if(!updateText.length){
            return toast.error('Please Add some text')
        }
         const updatePost = {
           title: updateText,
           date: new Date(),
         };



        const responseUpdatePost = await axios.put(`/api/posts?id=${id}`,updatePost)
        closeModal();
        toast.success('Update post successfully !')
        router.refresh();
        return responseUpdatePost.data;


    } catch (error) {
        console.log(error);

    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl  text-center font-medium leading-6 text-rose-400 py-3"
                  >
                    <span className="text-teal-500"> Update </span>Post
                  </Dialog.Title>
                  <div className="mt-2">

                    <textarea
                      ref={updateRef}
                      className="w-full"
                      type="text"
                      name="updatePost"
                      id=""
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-3"
                      onClick={closeModal}
                    >
                      close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
