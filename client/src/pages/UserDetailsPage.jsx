import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../components/common/Loading";

export default function UserDetailsPage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="w-full h-screen bg-[#111]  ">
      <div className="h-full ">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 pt-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 bg-gray-300 p-2 rounded-lg "
          >
            <FaAngleDoubleLeft /> Back
          </button>
          <Link to={`/update/${user?._id}`} className="text-green-500 text-lg">
            Edit
          </Link>
        </div>
        {loading && <Loading loading={loading} />}
        {!loading && (
          <div className="flex items-center justify-center ">
            <div className="w-[500px]  pt-20 ">
              <div className="flex flex-col">
                <div className="flex flex-col justify-center items-center gap-4 text-2xl font-bold text-white">
                  <img
                    src={user?.image}
                    alt="profile"
                    className="size-56 rounded-full object-cover cursor-pointer "
                  />
                  <div className="flex flex-col items-center justify-center">
                    <p className="">{user?.name}</p>
                    <p className=" ">{user?.email}</p>
                  </div>
                </div>
                <div className="p-4 ">
                  <div className="">
                    <div className="px-4 py-2 bg-[#333] rounded-xl">
                      <div className="mb-1">
                        <span className="text-white">mobile</span>
                        <p className="text-green-400">{user?.phone}</p>
                      </div>
                      <hr className="text-gray-100  border-gray-600" />
                      <div className="my-1">
                        <span className="text-white">email</span>
                        <p className="text-green-400">{user?.email}</p>
                      </div>
                      <hr className="text-gray-100  border-gray-600" />
                      <div className="mt-1 text-white">
                        <span>age</span>
                        <p className="text-lg">{user?.age}</p>
                      </div>
                      <hr className="text-gray-100  border-gray-600" />
                      <div className="mt-1 text-white">
                        <span className="">status</span>
                        <p className="text-lg">{user?.maritalStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {user?.maritalStatus === "married" && (
              <div className="p-4 mt-[370px] w-[300px]">
                <div className="">
                  <div className="px-4 py-2 bg-[#333] rounded-xl">
                    <div className="mb-1">
                      <span className="text-white">spouse-name</span>
                      <p className="text-green-400">{user?.spouse?.name}</p>
                    </div>
                    <hr className="text-gray-100  border-gray-600" />

                    <div className="mt-1 text-white">
                      <span>spouse-age</span>
                      <p className="text-lg">{user?.spouse?.age}</p>
                    </div>
                    <hr className="text-gray-100  border-gray-600" />
                    <div className="mt-1 text-white">
                      <span className="">spouse-mobile</span>
                      <p className="text-lg text-green-400">
                        {user?.spouse?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
