import React from "react";
import useAuth from "../hooks/useAuth";

function UserPage() {
  const { email } = useAuth();
  return (
    <div className="w-1/4 bg-gray-300 rounded text-left mx-auto mt-2 p-3">
      <span className="block">User: { email }</span>
      <hr className="my-2 border-black" />
      {/* <span>Password:{user.password}</span> */}
    </div>
  );
}

export default UserPage;
