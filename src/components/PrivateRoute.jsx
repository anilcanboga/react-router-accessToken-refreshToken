import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Context from "../context/auth";

function PrivateRoute() {
  const { user } = useContext(Context);

  return user ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
