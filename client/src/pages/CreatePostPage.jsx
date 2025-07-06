import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";

const initialState = {
  title: "",
  content: "",
  user: "",
};

export default function CreatePostPage() {
  const [formData, setFormData] = useState(initialState);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user");

  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({ ...prev, user: userId }));
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5007/api/posts/create",
        formData
      );
      if (response) {
        toast.success("Post created successfully", { position: "top-right" });
        navigate("/");
      }
    } catch (error) {}
  };

  console.log(formData);

  return (
    <div className="w-[500px] mx-auto mt-20  bg-white p-4 rounded-lg">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 bg-gray-300 p-2 rounded-lg "
      >
        <FaAngleDoubleLeft /> Back
      </button>
      <div className="flex flex-col p-4">
        <h2 className="text-center text-2xl font-bold">Create new post</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full mt-4 gap-4  "
        >
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="bg-gray-200 p-2 rounded-lg border"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="bg-gray-200 rounded-lg border"
          />
          <button type="submit" className="w-full bg-green-400 p-2 rounded-lg">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
