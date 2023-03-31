import React from "react";
import { Navigate } from "react-router-dom";

const Taskprotect = ({ children }) => {
  const isAuth = sessionStorage.getItem("useremail");
  if (!isAuth) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};
export default Taskprotect;
