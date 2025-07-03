import { useEffect, useRef, useState } from "react";
import UserForm from "../components/UserCreateForm/UserForm";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { FaAngleDoubleLeft } from "react-icons/fa";
import UploadProfileImage from "../components/UploadProfileImage";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";

export default function UpdateUserPage() {
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);

  useEffect(() => {
    const fetchUserById = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5007/api/users/${params.id}`
        );

        if (response) {
          setFormData(response.data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing field: ${name}, Value: ${value}`);

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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5007/api/users/${params.id}`,
        formData
      );
      if (response) {
        console.log(response);
        toast.success(response?.data?.message);
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      console.log("error during update", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  console.log(formData);

  return (
    <div className="w-full ">
      {loading && <Loading loading={loading} />}
      {!loading && (
        <div className="w-[550px] mx-auto bg-gray-100 p-6 mt-20 rounded-lg  ">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 bg-gray-300 p-2 rounded-lg "
          >
            <FaAngleDoubleLeft /> Back
          </button>
          <div className="mt-6 flex flex-col  gap-4 "></div>
          <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-2">
            <UploadProfileImage
              setFormData={setFormData}
              showInput={false} // hides both label and input
              showLabel={false}
              fileRef={fileRef}
              setUploading={setUploading}
            />

            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center">
                <span
                  onClick={() => fileRef.current.click()}
                  className="text-center cursor-pointer"
                >
                  Edit
                </span>

                {formData?.image && (
                  <img
                    onClick={() => fileRef.current.click()}
                    src={formData?.image || ""}
                    alt="profile"
                    className="rounded-full h-20 w-20  object-cover cursor-pointer self-center"
                  />
                )}
              </div>
              {uploading && (
                <p className="text-sm text-gray-500 text-center">
                  Uploading...
                </p>
              )}
            </div>

            <UserForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg mt-8 text-center text-white hover:bg-green-500"
              disabled={loading}
            >
              {loading ? "Loadind..." : "Update User"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
