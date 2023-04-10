import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";

const authUser = () => {
  const store = sessionStorage.getItem("useremail");

  var user;
  if (store) {
    user = { login: true };
    console.log(user);
  } else {
    user = { login: false };
    console.log(user);
  }

  return user && user.login;
};

const ProtectUser = () => {
  const Auth = authUser();

  return Auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectUser;
