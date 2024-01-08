"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Portal } from "@/components/modal/portal";

interface IModal {
  children: React.ReactNode,
  isOpen?: boolean,
  ariaLabel?: string,
  className?:string
}

const Model = ({ children, isOpen, ariaLabel ,className}: IModal) => {

  const route = useRouter();

  if (!isOpen) return null;

  return (
    <Portal wrapperId="modal">
      <div
        className="fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80"
        aria-labelledby={ariaLabel ?? "modal-title"}
        role="dialog"
        aria-modal="true"
        onClick={() => route.push("/home")}
      />
      <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-scrol">
        <div className={`${className} p-4 bg-gray-200 pointer-events-auto max-h-screen md:rounded-xl text-black`}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Model;
