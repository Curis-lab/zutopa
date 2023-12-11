"use client";

import React, { useEffect, useState } from "react";

import { FormField } from "@/components/form-field";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";

const FormValidation = () => {
  const defaultForm = {email:"",password:"",firstName:"",lastName:""}
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: e.target.value }));
  };

  const onSubmit = async () => {
    //send data to authentication
    if (action === "login") {
      await signIn("credentials", {
        email: formData?.email,
        password: formData?.password,
      });
    } else {
      axios
        .post("/api/register", formData)
        .then(() => {
          setFormData(defaultForm);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(()=>{setAction('login');},[])
  
  return (
    <>
      <h2 className="text-5xl font-extralight ">
        {action === "login" ? "Sign In" : "Register"}
      </h2>
      <p>Sign in and start managing your conditatestion</p>
      <div className="p-6 w-96">
        {action === "register" ? (
          <>
            <FormField
              htmlFor="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
            <FormField
              htmlFor="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </>
        ) : null}
        <FormField
          htmlFor="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
        />
        <FormField
          htmlFor="password"
          label="Password"
          value={formData.password}
          onChange={(e) => handleChange(e, "password")}
        />
        <button
          type="submit"
          className="w-full p-2 rounded-xl my-2 bg-green-400 transition duration-300 ease-in-out hover:bg-teal-400 hover:-translate-y-1"
          onClick={onSubmit}
        >
          Login
        </button>
        <div
          onClick={() =>
            setAction((i) => (i === "login" ? "register" : "login"))
          }
        >
          Register
        </div>
        <button onClick={()=>signOut()}>Sign out</button>
      </div>
    </>
  );
};

export default FormValidation;
