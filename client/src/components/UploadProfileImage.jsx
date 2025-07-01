import axios from "axios";
import { useEffect, useState } from "react";

export default function UploadProfileImage({
  setFormData,
  setUploading,
  showInput = true,
  showLabel = true,
  fileRef,
}) {
  const [imageFile, setImageFile] = useState(null);

  function handleImageFile(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }
  async function uploadImageCloudnary() {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("myFile", imageFile);
      const response = await axios.post(
        "http://localhost:5007/api/users/uploadImage",
        data
      );
      console.log(response, "response");
      if (response?.data?.success) {
        setFormData((prev) => ({ ...prev, image: response.data.result.url }));
        setUploading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageCloudnary();
  }, [imageFile]);

  console.log(imageFile);

  return (
    <div>
      {showLabel && <label className="font-medium">Upload Image</label>}
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleImageFile}
        className={
          showInput ? "p-2 border bg-white rounded-lg w-full" : "hidden"
        }
      />
    </div>
  );
}
