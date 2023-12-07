"use client";

import { FormField } from "@/components/form-field";
import React, { useState } from "react";

const FormValidation = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: e.target.value }));
  };
  return (
    <>
      <form className="p-6 w-96">
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
        >
          Login
        </button>
      </form>
    </>
  );
};

export default FormValidation;
