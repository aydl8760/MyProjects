import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
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

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.name) params.set("name", filters.name);
    if (filters.minAge) params.set("minAge", filters.minAge);
    if (filters.maxAge) params.set("maxAge", filters.maxAge);
    if (filters.role) params.set("role", filters.role);

    navigate(`/?${params.toString()}`);
  }, [filters, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    urlParams.set("name", filters.name);

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
      className="flex items-center gap-4  py-2 px-4 "
    >
      <div className=" flex items-center border rounded-lg  mr-40">
        <input
          type="text"
          name="name"
          placeholder="search..."
          value={filters.name}
          onChange={handleInputChange}
          className="w-96 p-2  focus:outline-none  rounded-l-lg "
        />

        <button type="submit" className="p-[14px] bg-blue-500 rounded-r-lg">
          <FaSearch />
        </button>
      </div>
      <select
        name="role"
        value={filters.role}
        onChange={handleInputChange}
        className="border p-2 rounded-lg focus:outline-none"
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
        className="w-20 border p-2 rounded-lg focus:outline-none"
      />

      <input
        type="number"
        name="maxAge"
        value={filters.maxAge}
        onChange={handleInputChange}
        placeholder="Max Age"
        className="w-20 border p-2 rounded-lg focus:outline-none"
      />
    </form>
  );
}
