import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import countryList from "../../../utils/getCountriesArray.js";
import { MultiSelect } from "react-multi-select-component";
import { fetchNamearray } from "../../../utils/utilityFunctions.js";
import Datepicker from "react-tailwindcss-datepicker";
import DropBox from "../../common/DragnDrop.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerAd from "../../../services/registerAd.js";
import { useNavigate } from "react-router-dom";

export default function CreateAd() {
  const [selected, setSelected] = useState([]);
  {/*State for storing Calender dates*/ }
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  {/*Using useNavigate() hook*/}
  const navigate = useNavigate();

  {/*Setting up the toastify success counter*/}
  const success = () => toast.success("Ad is created successfully!");
  
  {/*Setting up the React-Hook-Form Object */}
  const form = useForm({});

  {/*Destructuring the form handler functions*/}
  const { register, handleSubmit, formState, trigger } = form;
  
  {/* Initiating the errors handler for Verification*/}
  const { errors } = formState;
  
  {/*Handles the Duration field*/}
  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  
  {/*Adding the missing fields(target_audience,duration)*/}
  const addtoForm = () => {
    let demoarray = fetchNamearray(selected);
    form.setValue("target_audience", demoarray);

    form.setValue("duration", value);
  };
  
  {/*onSubmission Handler for form*/}
  const onSubmit = async (data) => {

    {/* Getting the response from registerAd()*/}
    const res = await registerAd(form, data);
    if (res.success === true) {
      success();
      setTimeout(() => {
        navigate("/profile", { replace: true });
        window.location.reload();
      }, 1500);
    }

    console.log("Form submitted:", data);
  };
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-7xl py-12 md:py-24">
        <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="px-2 md:px-12">
              <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                Create a New Post
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Set the details We will ready you for the launch!
              </p>

              <form
                action=""
                className="mt-8 space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid w-full gap-y-4 md:gap-x-4 ">
                  <div className="grid w-full  items-center gap-1.5">
                    <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Title
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border !text-black border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      id="title"
                      placeholder="What is the topic?"
                      {...register("title")}
                    />
                    <p className="text-[red]">{errors.topic?.message}</p>
                  </div>
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Description
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border  !text-black  border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    id="description"
                    placeholder="Describe your advertisment"
                    {...register("description")}
                  />
                  <p className="text-[red]">{errors.description?.message}</p>
                </div>
                <div className="grid w-full  items-center gap-1.5">
                  <label className="text-sm font-medium leading-none  text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Choose Country(s):
                  </label>

                  <MultiSelect
                    options={countryList}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                  <p className="text-[red]">{errors.severity?.message}</p>
                </div>

                <div className="grid w-full  items-center gap-1.5">
                  <label className="text-sm font-medium leading-none  text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Time:
                  </label>
                  <Datepicker
                    i18n="light"
                    className="bg-white"
                    value={value}
                    onChange={handleValueChange}
                    primaryColor="green"
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    addtoForm();
                    trigger();
                  }}
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Create Advertisment!
                </button>
              </form>
            </div>
          </div>
          <div className="">
            <DropBox form={form} editable={false} oldImg={""} />
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
        </div>
      </div>
    </div>
  );
}
