import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import countryList from "../../../utils/getCountriesArray.js";
import { MultiSelect } from "react-multi-select-component";
import { fetchNamearray } from "../../../utils/utilityFunctions.js";
import Datepicker from "react-tailwindcss-datepicker";
import DropBox from "../../common/DragnDrop.jsx";
import fetchOldData from "../../../services/fetchOldData.js";
import updateData from "../../../services/updateData.js";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditForm = ({objectId}) => {
  {/* Setting the Old Data State*/}
  const[oldData,setOldData]=useState()

  const [selected, setSelected] = useState([]);

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const navigate = useNavigate();

  const success = () => toast.success("Ad updated Successfully!");
  
  {/*Fetching the Old data*/}
  useEffect(() => {
      const getOldData=async ()=>{
          setOldData(await fetchOldData(objectId) )

      }
      getOldData();
  }, []);
  
  
  {/*Initializing the Form Object*/}
  const form = useForm({
    title: oldData === undefined ? "" : oldData.getDocumentById.title,
    description:
      oldData === undefined ? "" : oldData.getDocumentById.description,
    target_audience:
      oldData === undefined ? "" : oldData.getDocumentById.target_audience,
    duration: oldData === undefined ? "" : oldData.getDocumentById.duration,
    multimedia: oldData === undefined ? [""] : oldData.getDocumentById.multimedia,
  });

  const { register, handleSubmit, formState, trigger } = form;

  const { errors } = formState;

  {/*Handling the Duration Object*/}
  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  
  {/* Adding the new fields to form*/}

  const addtoForm = () => {
    let demoarray = fetchNamearray(selected);
    form.setValue("target_audience", demoarray);

    form.setValue("duration", value);
  };
  
  {/*Function to revert the Form*/}
  const resetForm=()=>{
    form.reset();
  }
   
  
  const onSubmit = async (data) => {
    
    const res=await updateData(objectId,form, data);
    
    if (res.success === true) {
      success();
      {
        /* Setting a Timeout for the Toast notif.*/ 
      }
      setTimeout(() => {
        navigate('/profile',{replace:true})
        window.location.reload();
      }, 1500);
    }
    
  };
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-7xl py-12 md:py-24">
        <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="px-2 md:px-12">
              <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                Edit
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Need to change somthing?
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
                  Complete Edits
                </button>
              </form>
            </div>
          </div>
          <div className="">
            <div>
              <DropBox
                form={form}
                editable={true}
                oldImg={
                  oldData === undefined
                    ? ""
                    : oldData.getDocumentById.multimedia
                }
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={resetForm}
            >
              Revert Edits
            </button>
          </div>
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
    </div>
  );
};

export default EditForm;
