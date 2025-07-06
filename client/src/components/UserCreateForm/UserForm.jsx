import React from "react";
import SpouseForm from "./SpouseForm";

export default function UserForm({ formData, handleInputChange }) {
  return (
    <div className="flex flex-col gap-5">
      <input
        type="text"
        name="name"
        placeholder="Enter your Name..."
        className="p-3 rounded-lg border shadow-sm"
        value={formData?.name || ""}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="email"
        placeholder="Enter your Email..."
        className="p-3 rounded-lg border shadow-sm"
        value={formData?.email || ""}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Enter your phone Number..."
        className="p-3  rounded-lg border shadow-sm"
        value={formData?.phone || ""}
        onChange={handleInputChange}
      />

      <div className="flex gap-8">
        <div className="flex flex-col w-36">
          <label className="font-medium text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            className="p-3  rounded-lg border shadow-sm"
            value={formData?.age || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col w-full ">
          <label className="font-medium text-gray-700">Role:</label>
          <select
            name="role"
            className="border p-3 rounded-lg focus:outline-none  "
            onChange={handleInputChange}
            value={formData?.role || ""}
          >
            <option value=""></option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex flex-col w-full  ">
          <label className="font-medium text-gray-700">Status:</label>
          <select
            name="maritalStatus"
            className="border p-3 rounded-lg focus:outline-none  "
            onChange={handleInputChange}
            value={formData?.maritalStatus || ""}
          >
            <option value=""></option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
      </div>
      <SpouseForm formData={formData} handleInputChange={handleInputChange} />
    </div>
  );
}
