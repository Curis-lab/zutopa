"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { FormField } from "@/components/form-field";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/libs/validators";
import Home from "../home/page";

//testing for these code
//must check Filefield red noti and data connected
//must submit any thing we work

const DEFAULT_FORM = { email: "", password: "", firstName: "", lastName: "" };

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  const firstLoad = useRef(true);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultErrors = {
    email: "",
    password: "",
    ...(!isLogin
      ? {
          firstName: "",
          lastName: "",
        }
      : {}),
  };

  const [errors, setErrors] = useState(defaultErrors);

  function returnHome() {
    router.push("/home");
  }
  useEffect(() => {
    if (session?.status === "authenticated") {
      returnHome();
    }
  }, [session?.status]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
      setFormData((form) => ({ ...form, [field]: e.target.value }));
    },
    [formData, setFormData],
  );

  const onSubmit = async () => {
    setErrors((data) => ({
      ...data,
      email: validateEmail(formData.email) as string,
      password: validatePassword(formData.password) as string,
      ...(!isLogin
        ? {
            firstName: (validateName(formData.firstName) as string) || "",
            lastName: (validateName(formData.lastName) as string) || "",
          }
        : {}),
    }));

    if (isLogin) {
      signInFunction(formData);
    } else {
      axiosPostForRegistration(formData);
    }

    function axiosPostForRegistration(formData: typeof DEFAULT_FORM): any {
      return axios
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
    function signInFunction(formData: typeof DEFAULT_FORM): any {
      return signIn("credentials", {
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
            returnHome();
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const toggleVariant = useCallback(() => {
    setIsLogin((prev) => !prev);
    setErrors(defaultErrors);
    setFormData(DEFAULT_FORM);
  }, [isLogin, setIsLogin]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  return (
    <>
      <h2 data-test="fundamental-header">Zutopia</h2>
      <p className="text-3xl font-bold tracking-tight mt-6">
        Sign in to your account
      </p>
      <div className="p-6 w-96">
        {!isLogin && (
          <>
            <FormField
              htmlFor="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange(e, "firstName")}
              disabled={isLoading}
              error={errors?.firstName}
              errorNoti="formfield-firstname"
            />
            <FormField
              htmlFor="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange(e, "lastName")}
              disabled={isLoading}
              error={errors?.lastName}
            />
          </>
        )}
        <FormField
          htmlFor="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          error={errors?.email}
          disabled={isLoading}
          errorNoti="email-error"
          messageTest="email-input"
        />
        <FormField
          htmlFor="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange(e, "password")}
          error={errors?.password}
          disabled={isLoading}
          errorNoti="password-error"
          messageTest="password-input"
        />
        <button
          type="submit"
          className="w-full p-2 rounded-xl mt-6 bg-green-400 transition duration-300 ease-in-out hover:bg-teal-400 hover:-translate-y-1"
          onClick={onSubmit}
          data-cy="submit"
        >
          {isLogin ? "Sign in" : "Register"}
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
          <div>{isLogin ? "New to zutopia?" : "Already have an Account"}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {isLogin ? "Create an account." : "Login"}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
