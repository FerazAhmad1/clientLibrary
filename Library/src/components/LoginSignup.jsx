/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authentication/authSlice";
import { useQuery, useMutation, gql } from "@apollo/client";
import { ADD_USER, LOGIN_HANDLER } from "../GraphQl/Mutation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [addUserMutation, { loading, error, data }] = useMutation(ADD_USER);
  const [loginMutation] = useMutation(LOGIN_HANDLER);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };
  const navigateTo = (path) => navigate(path);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!emailRef.current.value || !emailRef.current.value.trim()) {
      showToast("Please fill email");
      return;
    }

    if (!passwordRef.current.value || !passwordRef.current.value.trim()) {
      showToast("Please fill password");
      return;
    }

    if (!isLogin && !nameRef.current.value && !nameRef.current.value.trim()) {
      showToast("Please fill name");
      return;
    }
    let email = emailRef.current.value.trim();
    let password = passwordRef.current.value.trim();

    let name;
    if (!isLogin) {
      name = nameRef.current.value.trim();
      const response = await addUserMutation({
        variables: {
          name,
          email,
          password,
        },
      });
      const {
        addUser: { error },
      } = response.data;
      console.log(data, "ffffffffffffffffffffffffff", error, loading);
      if (error !== null && error === "Validation error") {
        showToast("this email already exist");
        return;
      } else {
        const {
          addUser: { token },
        } = response.data;
        dispatch(login({ name, email, token }));
        navigateTo("/product");
        toggleForm();
      }
      return;
    } else {
      const response = await loginMutation({
        variables: {
          email,
          password,
        },
      });
      const { success, token } = response.data.loginHandler;
      if (success) {
        dispatch(login({ token, email }));
        navigateTo("/product");
        toggleForm();
        return;
      }
    }
  };

  const showToast = (message, type = "error") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Log in to your account" : "Create an account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  ref={nameRef}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            {console.log(isLogin, "ssssssssssssssssssss")}
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={submitHandler}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin
              ? "Don't have an account yet?"
              : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              {!isLogin ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default LoginSignup;
