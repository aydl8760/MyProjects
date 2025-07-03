import { FaEnvelope } from "react-icons/fa";
import { HiOutlinePencilAlt, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
export default function UserList({ userData }) {
  const navigate = useNavigate();
  return (
    <>
      {userData?.length > 0 &&
        userData.map((user) => (
          <div
            key={user?._id}
            className="relative bg-white rounded-lg p-2 flex items-center justify-between gap-2 cursor-pointer group"
          >
            <div className="flex items-center justify-start gap-2  ">
              <img
                src={user?.image}
                className="size-14 rounded-full object-cover"
                onClick={() => navigate(`/details/${user?._id}`)}
              />

              <div className="">
                <h2 className="font-bold text-lg">{user?.name}</h2>
                <p className="text-blue-500 flex gap-1 items-center hover:underline cursor-pointer">
                  <FaEnvelope /> {user?.email}
                </p>
              </div>
            </div>

            <div className=" absolute top-0 right-0 px-2 py-1 hidden group-hover:block">
              <div className="flex items-center gap-2">
                <Link to={`/update/${user?._id}`}>
                  <HiOutlinePencilAlt />
                </Link>
                <button onClick={() => handleDelete(user._id)}>
                  <HiOutlineX />
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
