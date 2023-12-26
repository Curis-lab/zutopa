"use client";

import React, { useState } from "react";

import SelectBox from "@/components/select-box";
import { colorMap, emojiMap } from "@/libs/constant";
import useZutoModal from "@/app/hooks/use-zuto-modal";

interface IFrom {
  message: string;
  style: {
    background: string;
    text: string;
    emoji: string;
  };
}

const ZutoModal = () => {

  // const [isOpen, setIsOpen] = useState<boolean>(true);
  const zudoModal = useZutoModal();
  const [formData, setFormData] = useState<IFrom>({
    message: "",
    style: { background: "", text: "", emoji: "" },
  });

  const getOptions = (data: any) =>
    Object.keys(data).reduce((acc: any[], curr) => {
      acc.push({
        name: curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase(),
      });
      return acc;
    }, []);

  const colors = getOptions(colorMap);
  const emojis = getOptions(emojiMap);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (field === "message") {
      setFormData((data) => ({ ...data, [field]: e.target.value }));
    } else {
      setFormData((data) => ({
        ...data,
        style: { ...data.style, [field]: e.target.value },
      }));
    }
  };

  return (
      <>
        <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
          <div className="text-center flex flex-col items-center gap-y-2 pr-8">
            <p>Zudo Modal</p>
            <button onClick={()=>{zudoModal.onClose()}}>Close</button>
          </div>
          <div className="flex-1 flex flex-col gap-y-4">
            <textarea
              name="message"
              className="w-full rounded-xl h-40 p-4"
              placeholder={`Say something nice about`}
              value={formData.message}
              onChange={(e) => {
                handleChange(e, "message");
              }}
            />
            <div className="flex flex-col items-center md:flex-row md:justify-start gap-x-4">
              {/*selected box */}
              <SelectBox
                options={colors}
                name="backgroundColor"
                label="Background Color"
                containerClassName="w-36"
                className="w-full rounded-xl px-3 py-2 text-gray-400"
                value={formData.style.background}
                onChange={(e) => handleChange(e, "background")}
              />
              <SelectBox
                options={colors}
                name="textColor"
                label="Text Color"
                containerClassName="w-36"
                className="w-full rounded-xl px-3 py-2 text-gray-400"
                value={formData.style.text}
                onChange={(e) => handleChange(e, "text")}
              />
              <SelectBox
                options={emojis}
                name="emoji"
                label="Emoji"
                containerClassName="w-36"
                className="w-full rounded-xl px-3 py-2 text-gray-400"
                value={formData.style.emoji}
                onChange={(e) => handleChange(e, "emoji")}
              />
            </div>
          </div>
        </div>
        <br />
        <div>{/* zuto */}</div>
      </>
  );
};

export default ZutoModal;
