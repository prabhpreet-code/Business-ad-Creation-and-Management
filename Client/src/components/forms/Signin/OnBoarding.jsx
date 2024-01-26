// TODO: Create and provide verification using zod
import React, { useContext } from "react";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { onboardingValidation } from "../../../validations/onboardingValidation.js";
import { FormContext } from "../../../Context/FormContext.js";
import axios from "../../../services/axios.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function OnBoarding() {
  {/*Initializing the finalForm object*/}

  let { finalForm } = useContext(FormContext);

  const navigate = useNavigate();

  const success = () => toast.success("Account created Successfully!");
  
  {/*Initializing the Form Object*/}
  const form = useForm({
    resolver: zodResolver(onboardingValidation),
    defaultValues: {
      description: "",
      role: "Select your Role",
    },
  });

  const { register, handleSubmit, formState, trigger } = form;

  const { errors } = formState;

  const onSubmit = async (data) => {
    {/*Calling the API for form submission*/}
    try {
      const finalObject = Object.assign({}, finalForm, data);
      console.log(finalObject);
      const response = await axios.post("/auth/signin", finalObject); 
      success();
  
      setTimeout(()=>{
        navigate("/login", { replace: true });

      },1500) 
      return response.data;
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            <span className="font-bold text-[25px]">Hold On {name}</span>{" "}
            <span className="italic">before you go....</span>
          </h2>

          <form
            action="#"
            method="POST"
            className="mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-5">
              <div className="grid w-full  items-center gap-1.5">
                <label className="text-sm font-medium leading-none  text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select Role:
                </label>
                <select
                  id="role"
                  {...register("role")}
                  className="flex h-10 w-full rounded-md border !text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                >
                  <option disabled defaultValue value="Select your Role">
                    Select your Role
                  </option>
                  <option value="Advertiser">Advertiser</option>
                  <option value="Content Creator">Content Creator</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Description:{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    className="flex  w-full h-[200px] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Enter the description"
                    {...register("description")}
                  ></textarea>
                  <p className="text-[red]">{errors.description?.message}</p>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={() => trigger()}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Let's get you Started🚀
                  <ArrowRight className="ml-2" size={16} />
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
}
