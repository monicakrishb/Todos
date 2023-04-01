import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

const authAdmin = () => {
  const store = sessionStorage.getItem("useremail");

  var admin;
  if (store) {
    admin = { login: true };
    console.log(admin);
  } else {
    admin = { login: false };
    console.log(admin);
  }

  return admin && admin.login;
};

const ProtectAdmin = () => {
  const Auth = authAdmin();

  return Auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectAdmin;
