import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost } from "../../redux/store/forumSlice";
import CreatePost from "./CreatePost"; // Component for creating a new post
import PostList from "./PostList"; // Component for displaying the list of posts

const ForumPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.forum);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = (content) => {
    dispatch(createPost({ content }));
  };

  return (
    <>
      <div className="flex w-full">
        <div className="forum-page w-3/4 bg-gray-100 min-h-screen p-8">
        <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Forum</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border p-2 rounded mr-4"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
          <CreatePost onCreate={handleCreatePost} />
          {status === "loading" && <p>Loading posts...</p>}
          {error && <p>Error fetching posts: {error}</p>}
          <PostList posts={posts} />
        </div>

        <div className="py-8">
          <div className="max-w-sm bg-white shadow rounded p-6">
            <div className="flex items-end">
              <p
                tabIndex="0"
                className="focus:outline-none text-xl font-semibold leading-5 text-gray-800"
              >
                Activity
              </p>
              <p
                tabIndex="0"
                className="focus:text-indigo-800 focus:outline-none text-sm leading-normal pl-44 cursor-pointer focus:underline text-right text-indigo-700"
              >
                View all
              </p>
            </div>
            <div className="mt-6 flex">
              <div className="w-10 flex flex-col items-center">
                <img
                  aria-label="boy avatar"
                  tabIndex="0"
                  className="focus:outline-none h-10 rounded-full"
                  src="https://cdn.tuk.dev/assets/components/misc/activity-1.png"
                  alt="boy avatar"
                />
                <div className="pt-4">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card116-svg1.svg"
                    alt="bg"
                  />
                </div>
              </div>
              <div className="pl-3">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm font-semibold leading-normal text-gray-800"
                >
                  John Stark
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none text-xs leading-3 text-gray-500 pt-1"
                >
                  2 hours ago
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none pt-4 text-sm leading-4 text-gray-600"
                >
                  Changes made to{" "}
                  <span className="text-indigo-700">styleguide.fig</span>, icons{" "}
                  <br />
                  updated with v2 colors
                </p>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="w-10 flex flex-col items-center">
                <img
                  tabIndex="0"
                  alt="woman avatar"
                  className="focus:outline-none h-10 rounded-full"
                  src="https://cdn.tuk.dev/assets/components/misc/profile-img-1.png"
                />
                <div className="pt-4">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card116-svg1.svg"
                    alt="bg"
                  />
                </div>
              </div>
              <div className="pl-3">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm font-semibold leading-normal text-gray-800"
                >
                  Rachel Green
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none text-xs leading-3 text-gray-500 pt-1"
                >
                  5 hours ago
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none pt-4 text-sm leading-4 text-gray-600"
                >
                  Reviewed and sent to{" "}
                  <span className="text-indigo-700">jill@astro.com </span>
                  <br />&{" "}
                  <span className="text-indigo-700">jason@ipsum.com</span>
                </p>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="w-10 flex flex-col items-center">
                <img
                  tabIndex="0"
                  alt="boy avatar"
                  className="focus:outline-none unded-full"
                  src="https://cdn.tuk.dev/assets/components/misc/activity-2.png"
                />
                <div className="pt-4">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card116-svg1.svg"
                    alt="bg"
                  />
                </div>
              </div>
              <div className="pl-3">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm font-semibold leading-normal text-gray-800"
                >
                  Rachel Green
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none text-xs leading-3 text-gray-500 pt-1"
                >
                  8 hours ago
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none pt-4 text-sm leading-4 text-gray-600"
                >
                  Ticket number <span className="text-indigo-700">#18293</span>{" "}
                  has been
                  <br />
                  resolved.Thank you.
                </p>
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="w-10 flex flex-col items-center">
                <img
                  tabIndex="0"
                  alt="boy avatar"
                  className="focus:outline-none h-10 rounded-full"
                  src="https://cdn.tuk.dev/assets/components/misc/activity-2.png"
                />
                <div className="pt-4">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card116-svg1.svg"
                    alt="bg"
                  />
                </div>
              </div>
              <div className="pl-3">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm font-semibold leading-normal text-gray-800"
                >
                  Jill Dawson
                </p>
                <p
                  tabIndex="0"
                  className="focus:outline-none text-xs leading-3 text-gray-500 pt-1"
                >
                  8 hours ago
                </p>
                <div className="py-4 flex items-center">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/card116-svg2.svg"
                    alt="report"
                  />
                  <p
                    tabIndex="0"
                    className="focus:outline-none text-xs leading-6 pl-2 text-indigo-700"
                  >
                    Annual Report.docx
                  </p>
                </div>
                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm leading-4 text-gray-600"
                >
                  Shared final version of the report
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumPage;
