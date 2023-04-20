import React from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const value = sessionStorage.getItem("useremail");
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <div id="nav">
      <h4 id="todo">ToDo</h4>

      <div className="flex">
        <div
          className="material-symbols-outlined"
          id="add"
          onClick={() => {
            navigate("/create");
          }}
        >
          add
        </div>

        <div>
          <Link to="/task" className="nav-link">
            Home
          </Link>
        </div>

        <Link to="/tasklist" className="nav-link">
          List
        </Link>

        {value === null ? (
          <div>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </div>
        ) : (
          <div>
            <Link onClick={handleClick} className="nav-link">
              Logout
            </Link>
          </div>
        )}

        {value === null ? (
          <div>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
