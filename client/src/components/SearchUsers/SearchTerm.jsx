import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

export default function SearchUsers({ filters }) {
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("name", name);

    navigate(`/?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("name");
    if (searchTermFromUrl) {
      setName(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <form
      onSubmit={handleSubmit}
      className="  flex items-center gap-4  py-2 px-4 "
    >
      <div className=" flex items-center bg-white rounded-lg p-2">
        <input
          type="text"
          name="name"
          placeholder="search..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" w-80  focus:outline-none   "
        />
        <div>
          <button type="submit">
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
}
