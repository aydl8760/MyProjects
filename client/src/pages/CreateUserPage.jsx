import { useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

import CreateUserForm from "../components/UserCreateForm/CreateUserForm";
import BackButton from "../components/common/BackButton";

const intialState = {
  name: "",
  email: "",
  age: "",
  role: "",
  phone: "",
  image: "",
  maritalStatus: "",
  spouse: {
    name: "",
    age: "",
    phone: "",
  },
};

export default function CreateUserPage() {
  const [formData, setFormData] = useState(intialState);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  console.log(formData);

  return (
    <div className="w-full  ">
      <div className="w-[600px] mx-auto border shadow-lg p-6 mt-8 mb-14 rounded-lg  ">
        <BackButton />
        <div className="mt-6 max-w-[500px] mx-auto flex flex-col  gap-4 ">
          {!uploading && formData.image ? (
            <img
              src={formData.image}
              alt="profile"
              className="rounded-full size-20 object-cover cursor-pointer self-center"
            />
          ) : uploading ? (
            <p className="text-sm text-gray-500 text-center">Uploading...</p>
          ) : (
            <h2 className="text-2xl font-semibold text-center text-green-800 ">
              Add New User
            </h2>
          )}

          <hr className="h-[0.2px] bg-black border-none" />
          <CreateUserForm
            uploading={uploading}
            setUploading={setUploading}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
}
