export default function SpouseForm({ formData, handleInputChange }) {
  return (
    <>
      {formData?.maritalStatus === "married" && (
        <div className="flex items-center gap-2 justify-between mt-4">
          <div className="flex flex-col">
            <label>Spouse Name</label>
            <input
              type="text"
              name="spouse.name"
              value={formData?.spouse.name || ""}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-white"
            />
          </div>

          <div className="flex flex-col w-24">
            <label>Spouse Age</label>
            <input
              type="number"
              name="spouse.age"
              value={formData?.spouse.age || ""}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-white"
            />
          </div>
          <div className="flex flex-col w-36 ">
            <label>Spouse Phone</label>
            <input
              type="text"
              name="spouse.phone"
              value={formData?.spouse.phone || ""}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
}
