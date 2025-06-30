import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function FilterUsers({ filters, setFilters }) {
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    //urlParams.set("name", filters.name);

    if (filters.minAge) {
      urlParams.set("minAge", filters.minAge);
    }

    if (filters.maxAge) {
      urlParams.set("maxAge", filters.maxAge);
    }

    if (filters.role) {
      urlParams.set("role", filters.role);
    }
    const searchQuery = urlParams.toString();
    navigate(`/?${searchQuery}`);
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="  flex items-center gap-4  py-2 px-4 "
    >
      <select
        name="role"
        value={filters.role}
        onChange={handleInputChange}
        className="border p-2 rounded focus:outline-none"
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <input
        type="number"
        name="minAge"
        value={filters.minAge}
        onChange={handleInputChange}
        placeholder="Min Age"
        className="w-20 border p-2 rounded"
      />

      <input
        type="number"
        name="maxAge"
        value={filters.maxAge}
        onChange={handleInputChange}
        placeholder="Max Age"
        className="w-20 border p-2 rounded"
      />
    </form>
  );
}
