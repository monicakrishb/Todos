import React from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const value = sessionStorage.getItem("useremail");
  const navigate = useNavigate();

  const handleClickss = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div id="nav">
      <h4 id="todo">To Do</h4>
      <div className="flex">
        <div>
          <Link to="/task" className="nav-link">
            Home
          </Link>
        </div>
        <Link to="/tasklist" className="nav-link">List</Link>
        {value === null ? (
          <div>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </div>
        ) : (
          <div>
            <Link onClick={handleClickss} className="nav-link">
              Logout{" "}
            </Link>
          </div>
        )}
        {value === null ? (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        ) : (
          ""
        )}
      </div>{" "}
    </div>
  );
}
