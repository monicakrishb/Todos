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
        <h4>
            ToDos
        </h4>
      <div>
        <Link to="/" className="nav-link" style={{ color: "white" }}>
          Home
        </Link>
      </div>{" "}
      \ <div>
        <Link to="/register" className="nav-link" style={{ color: "white" }}>
          Register
        </Link>
      </div>
      <div>
        <Link to="/login" className="nav-link" style={{ color: "white" }}>
          Login
        </Link>
      </div>{" "}
     
      <div>
        <Link to="/logout" className="nav-link" style={{ color: "white" }}>
          Logout
        </Link>
      </div>
      {/* <nav className="navbar navbar-expand-lg navbar-light ">
        <a class="navbar-brand" id="white" className="nav-link" href="#">
          To Do
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link" style={{ color: "white" }}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" style={{ color: "white" }}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link" style={{ color: "white" }}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav> */}
    </div>
  );
}
