"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PostDelete = ({ id }: any) => {
    const router = useRouter()
  const handlePostDelete = async () => {
    try {
      const deletePostRequest = await axios.delete(`/api/posts?id=${id}`);
      router.refresh();
      toast.success('Post Successfully deleted')
      return deletePostRequest.data
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <button
        onClick={handlePostDelete}
        className="text-xs  px-6 py-2 rounded-lg shadow bg-rose-400 duration-500 hover:bg-rose-500 text-white "
      >
        Delete
      </button>
    </div>
  );
};

export default PostDelete;
