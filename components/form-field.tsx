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
  errorNoti?: string;
  disabled?: boolean;
  messageTest?: string;
}

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error = "",
  errorNoti,
  disabled,
  messageTest,
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  const [showPassword, setShowPassword] = useState({
    type: "password",
    visible: false,
  });

  const toggleEvent = () => {
    if (!showPassword.visible) {
      return (
        <AiFillEyeInvisible
          onClick={() =>
            setShowPassword((form) => ({
              ...form,
              type: "text",
              visible: true,
            }))
          }
          className="cursor-pointer"
        />
      );
    }
    if (showPassword.visible) {
      return (
        <AiFillEye
          onClick={() =>
            setShowPassword((form) => ({
              ...form,
              type: "password",
              visible: false,
            }))
          }
          className="cursor-pointer"
        />
      );
    }
  };

  const input_method = {
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
        data-cy={messageTest}
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
    <div>
      <label htmlFor={htmlFor} className="font-light">
        {label}
      </label>
      <div className="flex relative">
        {type === "text" ? input_method.text : input_method.password}
      </div>
      <div
        data-cy={errorNoti}
        className="text-xs font-semibold text-center tracking-wide text-red-500 w-full"
      >
        {errorText || ""}
      </div>
    </div>
  );
}
