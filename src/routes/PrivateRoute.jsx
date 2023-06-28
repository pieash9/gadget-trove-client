/* eslint-disable react/prop-types */
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (user) {
    return children;
  }
  if (loading) {
    return <Loader />;
  }
  toast.error("Login First");
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
