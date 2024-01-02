"use client";

import { useRef, useState } from "react";

interface props {
  onChange: (file: File) => any;
  imageUrl?: string;
}

const ImageUploader = ({onChange, imageUrl}:props) => {
  const [draggingOver, setDragginOver] = useState(false);
  const dropRef = useRef(null);

  return <div ref={dropRef}>
    {
      imageUrl && 
      <div></div>
    }
  </div>;
};

export default ImageUploader;
