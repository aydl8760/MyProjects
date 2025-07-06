import { FaUserPlus } from "react-icons/fa";
import FilterUsers from "../components/SearchUsers/FilterUsers";
import UserList from "../components/UserList";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import axios from "axios";
import UserStateInfo from "../components/UserStateInfo";

export default function HomePage() {
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    minAge: "",
    maxAge: "",
  });
  const location = useLocation();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchNameFromUrl = urlParams.get("name");
    const minAgeFromUrl = urlParams.get("minAge");
    const maxAgeFromUrl = urlParams.get("maxAge");
    const roleFromUrl = urlParams.get("role");

    if (searchNameFromUrl || minAgeFromUrl || maxAgeFromUrl || roleFromUrl) {
      setFilters((prev) => ({
        ...prev,
        name: searchNameFromUrl || "",
        role: roleFromUrl || "",
        minAge: minAgeFromUrl || "",
        maxAge: maxAgeFromUrl || "",
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
          setLoading(false);
          setSearchResult(response.data);
        }
      } catch (error) {
        console.log("error during data fetch", error);
        setSearchResult({
          name: "",
          role: "",
          minAge: "",
          maxAge: "",
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [location.search]);

  console.log(searchResult);
  return (
    <div className="w-full ">
      <div className="">
        <div className="w-full py-2 px-5 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex gap-1 items-center ">
              <Link
                to="/create"
                className="p-2  rounded-lg flex items-center gap-2 hover:underline hover:text-blue-700 font-medium"
              >
                Add-User
              </Link>
              <Link
                to="/blogs"
                className="p-2  rounded-lg flex items-center gap-2 hover:underline hover:text-blue-700 font-medium"
              >
                All-Blogs
              </Link>
            </div>

            <FilterUsers setFilters={setFilters} filters={filters} />
          </div>
        </div>
        <UserStateInfo loading={loading} data={searchResult} />
        {!loading && searchResult?.length === 0 && (
          <p className="text-2xl mt-28 text-center text-white">
            No users found matching your search.
          </p>
        )}
        {!loading && (
          <div className="grid grid-cols-2 gap-4 mt-7 max-w-5xl mx-auto ">
            <UserList userData={searchResult} />
          </div>
        )}
      </div>
    </div>
  );
}
