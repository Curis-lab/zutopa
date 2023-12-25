"use client";

import React from "react";

interface IModal{
  children: React.ReactNode
}
const Modal = ({children}:IModal) => {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-scrol bg-neutral-800/70">
        <div className="p-4 bg-gray-200 pointer-events-auto max-h-screen md:rounded-xl text-black">
            {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
