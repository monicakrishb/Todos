import React, { useEffect, useState } from "react";
import service from "../../services/API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/form.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const usenavigate = useNavigate();
  const validate = (email, pass) => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
    }
    if (pass === "" || pass === null) {
      result = false;
    }
    return result;
  };

  useEffect(() => {
    if (sessionStorage.getItem("useremail")) {
      usenavigate("/task");
    }
  }, []);

  const ProceedLogin = async (e) => {
    e.preventDefault();
    if (validate(email, pass)) {
      try {
        await service.loginget(email).then((response) => {
          if (Object.keys(response.data).length === 0) {
            toast.error("Please enter valid useremail");
          } else {
            if (response.data[0].pass === pass) {
              toast.success(" login success");

              sessionStorage.setItem("useremail", email);

              usenavigate("/task");
            } else {
              if (response.data[0].pass != pass) {
                toast.error("Please enter valid password");
              }
            }
          }
        });
      } catch (err) {
        toast.error("Login Failed due to:" + err.message);
      }
    } else {
      toast.warning("Please enter useremail and password");
    }
  };

  return (
    <div className="auth-form-container form">
      <h2>Login</h2>
      <form className="login-form" onSubmit={ProceedLogin}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
          data-testid="username-test"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Enter assword"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <a href="/register" id="logindesc">
        <button className="link-btn">
          Don't have an account? Register here.
        </button>
      </a>
    </div>
  );
};
