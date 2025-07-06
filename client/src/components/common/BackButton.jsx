import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1 bg-gray-300 p-2 rounded-lg "
    >
      <FaAngleDoubleLeft /> Back
    </button>
  );
}
