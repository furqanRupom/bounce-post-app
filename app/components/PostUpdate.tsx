"use client"
import {useState} from "react"
import PostUpdateModal from "./PostUpdateModal";
const PostUpdate = ({id}:any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-xs  px-6 py-2 rounded-lg shadow bg-teal-500 duration-500 hover:bg-teal-600 text-white"
        >
          Update
        </button>

        <PostUpdateModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
      </div>
    );
};

export default PostUpdate;