import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../../services/API";
import "../styles/form.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("useremail")) {
      navigate("/task");
    }
  }, [navigate]);

  const validate = (email, pass) => {
    return email.trim() !== "" && pass.trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(email, pass)) {
      try {
        const response = await service.loginget(email);
        if (Object.keys(response.data).length === 0) {
          toast.error("Please enter valid user email");
        } else {
          if (response.data[0].pass === pass) {
            // localStorage.setItem("user",email)
            toast.success("Login success");
            sessionStorage.setItem("useremail", email);
            navigate("/task");
          } else if (response.data[0].pass !== pass) {
            toast.error("Please enter valid password");
          }
        }
      } catch (err) {
        toast.error("Login Failed due to: " + err.message);
      }
    } else {
      toast.warning("Please enter user email and password");
    }
  };

  return (
    <div className="auth-form-container form">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
          data-testid="username-test"
          id="email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Enter Password"
          id="password"
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
        <button type="submit" data-testid="submitme">
          Log In
        </button>
      </form>
      <a href="/register" id="logindesc">
        <button className="link-btn">
          Don't have an account? Register here.
        </button>
      </a>
    </div>
  );
};
