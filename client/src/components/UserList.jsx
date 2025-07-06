import { FaEnvelope, FaPlus, FaTrash } from "react-icons/fa";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function UserList({ userData }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(userData); // Initialize from props
  }, [userData]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5007/api/users/${id}`);
      toast.success("User deleted successfully");

      // 🔁 Remove from UI
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete user");
    }
  };
  return (
    <>
      {users?.length > 0 &&
        users.map((user) => (
          <div
            key={user?._id}
            className="relative bg-white rounded-lg p-4 border flex items-center justify-between gap-2 cursor-pointer group shadow-lg"
          >
            <div className="flex items-end justify-start gap-4  ">
              <img
                src={user?.image}
                className="size-14 rounded-full object-cover"
                onClick={() => navigate(`/details/${user?._id}`)}
              />

              <div className="">
                <div className="flex flex-col">
                  <h2 className="font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
                  </h2>
                  <p className="hover:text-blue-500 hover:underline  cursor-pointer ">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mt-7">
                <button onClick={() => handleDelete(user._id)}>
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
