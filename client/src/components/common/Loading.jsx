import React from "react";

export default function Loading({ loading }) {
  return (
    <div>
      {loading && (
        <p className="text-center text-2xl mt-20 md:mt-28 text-white">
          Loading...
        </p>
      )}
    </div>
  );
}
