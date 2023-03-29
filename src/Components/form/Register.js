import React, { useState } from "react";
import service from "../../services/API";
import { useNavigate } from "react-router-dom";
import "../styles/form.css"


export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mobile, setMobile] = useState("");
  
    
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = { name:name, email:email, pass:pass, mobile:mobile };
    console.log(obj);
   service.registerpost(obj)
    // axios.post("http://localhost:8000/user",obj)
        .then((res) => {
          // toast.success("registered successfully");
          success();
        })
        .catch((err) => {
          // toast.error("error");
        });
    
  };
  const success = () => {
    navigate("/login");
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          id="password"
          name="password"
        />
        <label htmlFor="mobile">Mobile</label>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          type="tele"
          id="mobile"
          name="mobile"
        />
        <button type="submit">Register</button>
      </form>
      <a href="/login">
        <button className="link-btn">
          Already have an account? Login here.
        </button>
      </a>
    </div>
  );
};
