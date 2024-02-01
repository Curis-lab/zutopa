"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

import { FormField } from "@/components/form-field";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/libs/validators";

type Vairant = "LOGIN" | "REGISTER";

const DEFAULT_FORM = { email: "", password: "", firstName: "", lastName: "" };

const LoginForm = () => {
  const session = useSession();

  const router = useRouter();

  const [variant, setVariant] = useState<Vairant>("LOGIN");
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/home");
    }
  }, [session?.status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: e.target.value }));
  };

  const onSubmit = async () => {
    if (variant === "LOGIN") {
      signIn("credentials", {
        email: formData?.email,
        password: formData?.password,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok) {
            toast.success("Logged in!");
            router.push("/home");
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      axios
        .post("/api/register", formData)
        .then(() => {
          signIn("credentials", formData);
          setFormData(DEFAULT_FORM);
        })
        .catch(() => {
          toast.error("Invalid Registration");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const default_errors = {
    email: "",
    password: "",
  };
  const [errors, setErrors] = useState(default_errors);

  const onSubmitting = () => {
    console.log(errors.email);
  };
  useEffect(() => {
    setErrors((data) => ({
      ...data,
      email: validateEmail(formData.email) as string,
    }));
  }, [formData]);
  return (
    <>
      <h2 data-test="header">Zutopia</h2>
      <p className="text-3xl font-bold tracking-tight mt-6">
        Sign in to your account
      </p>
      <div className="p-6 w-96">
        {variant === "REGISTER" && (
          <>
            <FormField
              dataTest="firstName"
              htmlFor="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange(e, "firstName")}
              disabled={isLoading}
            />
            <FormField
              htmlFor="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange(e, "lastName")}
              disabled={isLoading}
            />
          </>
        )}
        <FormField
          htmlFor="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          error={"hello"}
          disabled={isLoading}
        />
        <FormField
          htmlFor="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange(e, "password")}
          error={errors?.password}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="w-full p-2 rounded-xl mt-6 bg-green-400 transition duration-300 ease-in-out hover:bg-teal-400 hover:-translate-y-1"
          // onClick={onSubmit}
          onClick={onSubmitting}
          data-test="submit"
        >
          {variant === "LOGIN" ? "Sign in" : "Register"}
        </button>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-cyan-950 px-2 text-white">
                Or continue with
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-white">
          <div>
            {variant === "LOGIN"
              ? "New to zutopia?"
              : "Already have an Account"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account." : "Login"}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
