/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { authState } from "../features/authentication/authSlice";
import { Navigate } from "react-router-dom";

const Requireauth = ({ children }) => {
  Navigate;
  const { isLoggedin } = useSelector(authState);
  if (!isLoggedin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Requireauth;
