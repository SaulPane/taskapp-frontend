import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RegisterPage() {
  const { register } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    register({ email, password });
    history.push("/task");
  }

  // function goTask() {
  //   history.push("/tasks");
  // }

  // function stateUser(event) {
  //   setUser({ ...user, name: event.target.value });
  // }

  // function statePassword(event) {
  //   setUser({ ...user, password: event.target.value });
  // }

  return (
    <div className="grid grid-cols-1 gap-4">
      <form onSubmit={handleSubmit}>
        <input
          className="p-2 mt-2 mb-2 block w-1/4 mx-auto rounded outline-none border border-solid border-gray-800"
          type="text"
          name="user"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 mb-2 block w-1/4 mx-auto rounded outline-none border border-solid border-gray-800"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="p-2 block w-1/4 mx-auto rounded bg-gray-300 hover:bg-gray-800 hover:text-white focus:outline-none"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
