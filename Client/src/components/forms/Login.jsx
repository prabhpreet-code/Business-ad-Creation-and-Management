import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import axios from "../../services/axios.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  {/*Setting up the toast functions*/}
  const success = () => toast.success("User Logged In successfully!");
  const error = () => toast.error("Login failed! Check Credentials or Sign Up");

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, trigger } = form;

  const { errors } = formState;

  const handleLogin = async (data) => {
   
    try {
      const response = await axios.post("/auth/login", data, {
        withCredentials: true,
      });
      if (response.data.success === true) {
        localStorage.setItem("user", JSON.stringify(response.data.LoginUser));
        success();
        {
          /*Setting timeout for toast notif*/
        }
        setTimeout(() => {
          navigate("/profile", { replace: true });
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      error();
      console.log(err);
    }
  };
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Login
          </h2>

          <form
            action=""
            method="POST"
            className="mt-8"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  ></input>
                  <p className="text-[red]">{errors.email?.message}</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Password{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Enter your password.."
                    {...register("password")}
                  ></input>
                  <p className="text-[red]">{errors.password?.message}</p>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={() => {
                    trigger();
                  }}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Next <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default Login;
