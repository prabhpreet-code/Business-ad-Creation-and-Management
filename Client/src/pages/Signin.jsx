import React, { useState } from "react";
import { SigninForm } from "../components/forms/Signin/SigninForm.jsx";
import { OnBoarding } from "../components/forms/Signin/OnBoarding.jsx";
import { FormContext } from "../Context/FormContext.js";

const Signin = () => {
  {/*Toggler for swithing between two part form*/}
  const [toggle, setToggle] = useState(false);
  {/*Final form object*/}
  const [finalForm, setfinalForm] = useState({});

  return (
    <FormContext.Provider
      value={{ toggle, setToggle, finalForm, setfinalForm }}
    >
      {toggle ? <OnBoarding /> : <SigninForm />}
    </FormContext.Provider>
  );
};

export default Signin;
