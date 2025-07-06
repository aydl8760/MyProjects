import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import BackButton from "../components/common/BackButton";

export default function AllBlogLists() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        const response = await axios.get("http://localhost:5007/api/posts");
        if (response) {
          setBlogs(response?.data);
        }
      } catch (error) {}
    };
    fetchAllBlog();
  }, []);
  return (
    <div className="max-w-6xl mx-auto mt-10 flex flex-col gap-4">
      <div>
        <BackButton />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {blogs?.length > 0 &&
          blogs.map((blog) => (
            <div key={blog?._id} className=" rounded-lg border shadow-md">
              <div className="">
                <div>
                  <h2 className="bg-blue-50 p-1 font-semibold uppercase">
                    {blog?.title}
                  </h2>
                </div>

                <p className="p-2">{blog?.content}</p>
                <div className="text-right px-3">
                  <p>By: {blog?.user?.name}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
