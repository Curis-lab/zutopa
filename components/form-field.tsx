"use client";

import { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  error?: string;
  dataTest?: string;
  disabled?:boolean
}


export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error = "",
  dataTest,
  disabled
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  const hidePassword = {
    type: "password",
    visible: false,
  };

  const [showPassword, setShowPassword] = useState<typeof hidePassword>(hidePassword);

  const changeTypeEvent = () => {
    if (showPassword.visible) {
      setShowPassword((form) => ({ ...form, type: "password", visible: false }));
    }
    if (!showPassword.visible) {
      setShowPassword((form) => ({
        ...form,
        type: "text",
        visible: true,
      }));
    }
  };

  const toggleEvent = () => {
    if (!showPassword.visible) {
      return (
        <AiFillEyeInvisible
          onClick={()=>changeTypeEvent()}
          className="cursor-pointer"
        />
      );
    }
    if (showPassword.visible) {
      return (
        <AiFillEye
          onClick={() => changeTypeEvent()}
          className="cursor-pointer"
        />
      );
    }
  };

  const inputFactory = {
    text: (
      <input
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="w-full p-2 rounded-xl my-2 text-black"
        value={value}
        disabled={disabled}
      />
    ),
    password: (
      <>
        <input
          onChange={(e) => {
            onChange(e);
            setErrorText("");
          }}
          type={showPassword.type}
          id={htmlFor}
          name={htmlFor}
          className="w-full p-2 rounded-xl my-2 text-black"
          value={value}
          disabled={disabled}
        />
        <div className="text-2xl absolute top-4 right-5 text-black">
          {toggleEvent()}
        </div>
      </>
    ),
  };

  return (
    <div data-test={dataTest}>
      <label htmlFor={htmlFor} className="font-light">
        {label}
      </label>
      <div className="flex relative">
        {type === "text" ? inputFactory.text : inputFactory.password}
      </div>
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errorText || ""}
      </div>
    </div>
  );
}
