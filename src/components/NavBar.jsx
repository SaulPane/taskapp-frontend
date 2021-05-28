import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const { logged, logout } = useAuth();

  return (
    <div>
      <ul id="navBar" className="text-white">
        <li className="navItem">
          <Link to="/">Home</Link>
        </li>
        <li className="navItem">
          <Link to="/task">Tasks</Link>
        </li>
        <li className="navItem">
          <Link to="/profile">User</Link>
        </li>
        <li className="navItem">
          {logged ? (
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li className="navItem">
          { !logged && <Link to="/register">Register</Link> }
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
