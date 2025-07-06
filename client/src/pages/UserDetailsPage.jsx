import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import BackButton from "../components/common/BackButton";

export default function UserDetailsPage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [showBlogList, setShowBlogList] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserById = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5007/api/users/${params.id}`
        );

        if (response) {
          console.log(response);

          setUser(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUserById();
  }, [params.id]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5007/api/users/${id}`);
      toast.success("User deleted successfully");

      // 🔁 Remove from UI
      navigate("/");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete user");
    }
  };

  const fetchBlogs = async () => {
    if (!showBlogList) {
      try {
        const response = await axios.get(
          `http://localhost:5007/api/posts/${params.id}`
        );
        if (response) {
          console.log(response.data);
          setBlogs(response?.data);
        }
      } catch (error) {}
    }
    setShowBlogList(!showBlogList);
  };

  const handleDeleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5007/api/posts/${id}`
      );
      toast.success(response?.data?.message, { position: "bottom-right" });

      // 🔁 Remove from UI
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="w-full h-screen bg-[#ffffff]  ">
      <div className=" h-full">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 pt-4">
          <BackButton />
          <div className="flex items-center gap-4">
            <Link
              to={`/update/${user?._id}`}
              className="text-green-600 text-xl font-semibold "
            >
              Edit
            </Link>
            <button
              onClick={() => navigate(`/create-post?user=${user?._id}`)}
              className="bg-blue-600 p-2 rounded-md text-white"
            >
              Add Post
            </button>
          </div>
        </div>

        {loading && <Loading loading={loading} />}

        {!loading && (
          <div className="flex items-center justify-center  ">
            <div className="w-[700px] pt-10 flex justify-between ">
              <div className="flex flex-col w-full">
                <div className="flex flex-col justify-center items-center  text-2xl font-bold text-white">
                  <img
                    src={user?.image}
                    alt="profile"
                    className="size-56 rounded-full object-cover cursor-pointer "
                  />
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-black uppercase">{user?.name}</p>
                    <p className="text-black ">{user?.email}</p>
                  </div>
                </div>
                <div className="px-4 py-2 ">
                  <div className="">
                    <div className="px-4 py-2 border shadow-lg rounded-xl">
                      <div className="mb-1">
                        <span className="">mobile</span>
                        <p className="">{user?.phone}</p>
                      </div>
                      <hr className="text-gray-100  border-gray-300" />
                      <div className="my-1">
                        <span className="">email</span>
                        <p className="text-blue-400">{user?.email}</p>
                      </div>
                      <hr className="text-gray-100  border-gray-300" />
                      <div className="mt-1 ">
                        <span className="">age</span>
                        <p className="text-lg">{user?.age}</p>
                      </div>
                      <hr className="text-gray-100  border-gray-300" />
                      <div className="mt-1 ">
                        <span className="">status</span>
                        <p className="text-lg">{user?.maritalStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-7 pt-2 flex justify-between ">
                  <button
                    onClick={fetchBlogs}
                    className="text-xl font-bold hover:underline"
                  >
                    Blogs
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex gap-2 items-center text-lg font-medium hover:underline text-red-500"
                  >
                    Delete <FaTrash />
                  </button>
                </div>
                <div className="px-2 mt-2 pb-20">
                  {showBlogList && (
                    <div className="mt-4 space-y-2">
                      {blogs?.length === 0 ? (
                        <p>No blog posts found.</p>
                      ) : (
                        blogs.map((blog) => (
                          <div
                            key={blog?._id}
                            className="p-2 border border-gray-300 rounded-lg bg-white"
                          >
                            <h3 className="font-semibold text-lg">
                              {blog?.title}
                            </h3>
                            <hr className="text-gray-100  border-gray-300" />
                            <p className="text-gray-70 mt-1">{blog?.content}</p>

                            <div className="flex items-center gap-2 justify-end ">
                              <HiOutlinePencilAlt className="hover:text-green-600 cursor-pointer" />
                              <HiOutlineTrash
                                onClick={() => handleDeleteBlog(blog?._id)}
                                className="hover:text-red-600 cursor-pointer"
                              />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
              {user?.maritalStatus === "married" && (
                <div className="w-[300px] pt-80">
                  <div className="px-4 py-2 border shadow-lg rounded-xl">
                    <div className="mb-1">
                      <span>Spouse Name</span>
                      <p>{user?.spouse?.name}</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="mt-1">
                      <span>Spouse Age</span>
                      <p>{user?.spouse?.age}</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="mt-1">
                      <span>Spouse Phone</span>
                      <p>{user?.spouse?.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
