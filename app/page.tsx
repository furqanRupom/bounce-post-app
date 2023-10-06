import axios from "axios";
import PostForm from "./components/PostForm";
import PostDelete from "./components/PostDelete";
import { randomUUID } from "crypto";
import PostUpdate from "./components/PostUpdate";
import moment from "moment";

const getPosts = async () => {
  const posts = await axios.get(`${process.env.BASE_URL}/api/posts`);
  const data = await posts.data;
  return data;
};

console.log(moment().format("llll"));



const Home = async () => {
  const posts: { id: number; title: string, date:any }[] = await getPosts();

  return (
    <div className="max-w-7xl mx-auto">
      <PostForm />
      <h3 className="text-4xl font-bold text-center my-5 text-teal-500">
        All <span className="text-red-400">Posts</span>
      </h3>

      <div className="grid grid-cols-3 gap-4   rounded-lg  leading-relaxed text-xl  text-gray-400">
        {posts.map((post) => (
          <div
            key={randomUUID()}
            className="flex space-x-3 flex-col space-y-3 bg-gray-50 shadow p-5"
          >
            <small>
              {moment(post?.date).format('llll')}
            </small>
            <h3>{post.title}</h3>

            <div className="flex items-center space-x-3">
              <PostDelete id={post.id} />
              <PostUpdate id={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
