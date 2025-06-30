// components/UserStateInfo.jsx

export default function UserStateInfo({ loading, data }) {
  if (loading) {
    return (
      <p className="text-center text-2xl mt-20 md:mt-28 text-white">
        Loading...
      </p>
    );
  }

  if (!loading && Array.isArray(data) && data.length === 0) {
    return (
      <p className="text-2xl mt-28 text-center text-white">
        No users found matching your search.
      </p>
    );
  }

  if (!loading && !data) {
    return (
      <p className="text-2xl mt-28 text-center text-white">
        No users found matching your search.
      </p>
    );
  }

  return null; // nothing to show
}
