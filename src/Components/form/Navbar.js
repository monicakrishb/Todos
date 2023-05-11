import React,{useEffect} from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const value = sessionStorage.getItem("useremail");
  const userEmail =
    sessionStorage.getItem("useremail") || localStorage.getItem("user");

  const navigate = useNavigate();
  // useEffect(() => {
  //   const user = sessionStorage.getItem("useremail");
  //   if (user) {
  //     navigate("/task"); // Redirect to home page if user is already registered
  //   }
  // }, [navigate]);

  const handleClick = () => {
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <div id="nav">
      <h4 id="todo">ToDo</h4>
 <span
          className="material-symbols-outlined"
          id="add"
          onClick={() => {
            navigate("/create");
          }}
        >
          add
        </span>
      <div className="flex">
       

        <div>
          {userEmail && (
            <span className="nav-link" id="welcome">
              Welcome, {userEmail}!
            </span>
          )}
        </div>
        <div>
          <Link to="/task" className="nav-link">
            Home
          </Link>
        </div>

        <Link to="/tasklist" className="nav-link list">
          List
        </Link>
        <Link to="/perform" className="nav-link per">
          Performance
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
              LogOut
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
