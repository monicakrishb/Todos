import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import { toast } from "react-toastify";
import service from "../../services/API";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mobile, setMobile] = useState("");

  const usenavigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = { name: name, email: email, pass: pass, mobile: mobile };
    await service
      .registerpost(obj)

      .then((res) => {
        toast.success("Registered successfully");
        success();
      })
      .catch((err) => {
        toast.error("error");
      });
  };
  const success = () => {
    usenavigate("/login");
  };
  return (
    <div className="auth-form-container form">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          data-testid="username-test"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          id="password"
          name="password"
          required
        />

        <label htmlFor="mobile">Mobile</label>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          type="tele"
          id="mobile"
          name="mobile"
          required
        />
        <button type="submit" data-testid={"clickme"}>
          Register
        </button>
      </form>
      <a href="/login" id="des">
        <button className="link-btn">
          Already have an account? Login here.
        </button>
      </a>
    </div>
  );
};
