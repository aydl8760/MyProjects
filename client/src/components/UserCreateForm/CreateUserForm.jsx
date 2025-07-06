import React, { useRef, useState } from "react";
import UploadProfileImage from "../UploadProfileImage";
import { useNavigate } from "react-router";
import axios from "axios";
import UserForm from "./UserForm";
import toast from "react-hot-toast";

export default function CreateUserForm({
  setUploading,
  uploading,
  setFormData,
  formData,
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "maritalStatus") {
      setFormData((prev) => {
        const shouldClearSpouse = value !== "married";
        return {
          ...prev,
          maritalStatus: value,
          spouse: shouldClearSpouse
            ? { name: "", age: "", phone: "" }
            : prev.spouse,
        };
      });
    }
    if (name.startsWith("spouse.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        spouse: {
          ...prev.spouse,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5007/api/users",
        formData
      );
      if (response) {
        toast.success(response.data.message, { position: "top-right" });
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log("error during create user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
      <UploadProfileImage
        setFormData={setFormData}
        setUploading={setUploading}
        fileRef={fileRef}
        showInput={true}
        showLabel={true}
      />
      <UserForm
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
      />
      <button
        type="submit"
        className="bg-blue-500 p-2 rounded-lg mt-4 text-center text-white hover:bg-green-500"
        disabled={loading}
      >
        {loading ? "Loadind..." : "Submit"}
      </button>
    </form>
  );
}
