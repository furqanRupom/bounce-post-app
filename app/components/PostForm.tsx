"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import moment from "moment";
import toast from "react-hot-toast";

const PostForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    const createPost = {
      title: data.title,
      date: new Date(),
    };
    try {
      console.log(createPost);
      const dataPost = await axios.post(`/api/posts`, createPost);
      toast.success('Post successfully created')
      reset();
      router.refresh();
      return dataPost.data;
    } catch (error: any) {
      console.log(error);
    }
  };
  const dateTime =
    moment("2023-10-05T22:56:06.000Z").subtract(1, "days").calendar()
  console.log(dateTime)

  return (
    <div className="flex items-center justify-center w-full mt-20 mb-8 duration-500">
      <form
        className="w-9/12 flex  items-center justify-center "
        onSubmit={handleSubmit(onSubmit)}
        action=""
      >
        <div className="mb-4 mx-auto w-full">
          <input
            {...register("title")}
            className="border rounded-md p-2 w-9/12  focus:outline-none focus:border-teal-500"
            type="text"
            placeholder="Create New Post"
          />
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-8 rounded-md focus:outline-none ml-3"
            type="submit"
          >
            Create
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default PostForm;
