"use client";

import React, { useRef, useState } from "react";

interface props {
  onChange: (file: File) => any;
  imageUrl?: string;
}

const ImageUploader = ({ onChange, imageUrl }: props) => {
  const [draggingOver, setDragginOver] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      onChange(e.currentTarget.files[0]);
    }
  };

  const preventDefault = (e: React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault();
    e.stopPropagation();
  }
  return (
    <div
      ref={dropRef}
      onDrag={preventDefault}
      onDragStart={preventDefault}
      onDragEnd={preventDefault}
      onDragOver={preventDefault}
      onDragEnter={()=>setDragginOver(true)}
      onDragLeave={()=>setDragginOver(false)}
      className={`${
        draggingOver
          ? "border-4 border-dashed border-yellow-300 border-rounded "
          : ""
      }    group w-24 h-24 relative flex justify-center rounded-full items-center bg-gray-400  transition duration-300 ease-in-out hover:bg-gray-500 cursor-pointer`}
      onClick={()=>fileInputRef.current?.click()}
    >
      {imageUrl && <div className="absolute w-full h-full bg-blue-400 opacity-50 rounded-full transition duration-300 ease-in-out group-hover:opacity-0"/>}
      {
        <p className="font-extrabold text-4xl text-gray-200 cursor-pointer select-none transition duration-300 ease-in-out group-hover:opacity-0 pointer-events-none z-10">
          +
        </p>
      }
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
