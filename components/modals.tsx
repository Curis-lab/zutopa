"use client";

import React from "react";

interface IModal{
  children: React.ReactNode
}
const Modal = ({children}:IModal) => {
  return (
    <>
      <div className="fixed justify-center flex items-center overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className=" text-black relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto lg:h-auto md:h-auto bg-gray-200 p-4 max-h-screen md:rounded-xl">
            {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
