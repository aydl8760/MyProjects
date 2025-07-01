import { FaSearch, FaUserPlus } from "react-icons/fa";

import UserList from "../components/UserList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import FilterUsers from "../components/SearchUsers/FilterUsers";
import SearchUsers from "../components/SearchUsers/SearchTerm.jsx";
import {
  Link,
  replace,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";

export default function HomePage() {
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    minAge: "",
    maxAge: "",
  });
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchNameFromUrl = urlParams.get("name");
    console.log(searchNameFromUrl);

    const minAgeFromUrl = urlParams.get("minAge");
    const maxAgeFromUrl = urlParams.get("maxAge");
    const roleFromUrl = urlParams.get("role");

    if (searchNameFromUrl || minAgeFromUrl || maxAgeFromUrl || roleFromUrl) {
      setFilters((prev) => ({
        ...prev,
        name: searchNameFromUrl || "",
        role: roleFromUrl || "",
        minAge: minAgeFromUrl || "", // Update the select values dynamically
        maxAge: maxAgeFromUrl || "", // Update the select values dynamically
      }));
    }

    const fetchListing = async () => {
      const searchQuery = urlParams.toString();

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5007/api/users/search?${searchQuery}`
        );
        if (response) {
          setSearchResult(response?.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("error during data fetch", error);
        setLoading(false);
        setSearchResult({
          name: "",
          role: "",
          minAge: "",
          maxAge: "",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.name) params.set("name", filters.name);
    if (filters.minAge) params.set("minAge", filters.minAge);
    if (filters.maxAge) params.set("maxAge", filters.maxAge);
    if (filters.role) params.set("role", filters.role);

    navigate(`/?${params.toString()}`, { replace: true });
  }, [filters]);

  if (loading) {
    <p className="text-center text-2xl mt-20 md:mt-28">Loading....</p>;
  }

  console.log(searchResult);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-10">
        <div className="w-full flex justify-between items-center  rounded-lg p-4 bg-green-300">
          <Link
            to="/create"
            className="p-2 bg-white rounded-lg flex items-center gap-2"
          >
            <FaUserPlus /> Add user
          </Link>
          <SearchUsers filters={filters} />
          <FilterUsers setFilters={setFilters} filters={filters} />
        </div>
        {loading && (
          <p className="text-center text-2xl mt-20 md:mt-28 text-white">
            Loading...
          </p>
        )}
        {!loading && searchResult?.length === 0 && (
          <p className="text-2xl  mt-28 text-center text-white">
            No User found
          </p>
        )}
        {!loading && (
          <div className="grid grid-cols-4 gap-4 mt-7 ">
            <UserList userData={searchResult} />
          </div>
        )}
      </div>
    </div>
  );
}
