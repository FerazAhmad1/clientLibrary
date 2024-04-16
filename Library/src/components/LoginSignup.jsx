/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, gql } from "@apollo/client";
import { ADD_USER } from "../GraphQl/Mutation";

function LoginSignup() {
  const [addUserMutation, { loading, error, data }] = useMutation(ADD_USER);
  const [isLogin, setIsLogin] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(isLogin, nameRef.current.value);
    if (!emailRef.current.value || !emailRef.current.value.trim()) {
      alert("Please give email");
      return;
    }

    if (!passwordRef.current.value || !passwordRef.current.value.trim()) {
      alert("Please give password");
      return;
    }

    if (!isLogin && !nameRef.current.value && !nameRef.current.value.trim()) {
      alert("Please give name");
      return;
    }
    let email = emailRef.current.value.trim();
    let password = passwordRef.current.value.trim();

    let name;
    if (!isLogin) {
      name = nameRef.current.value.trim();
      await addUserMutation({
        variables: {
          name,
          email,
          password,
        },
      });

      console.log(data, "ffffffffffffffffffffffffff", error, loading);
    }

    toggleForm();
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
    </div>
  );
}

export default LoginSignup;
