"use client";

import axios from "axios";
import React, { useState } from "react";

import Zudo from "../zudo";
import SelectBox from "@/components/select-box";

import { backgroundColorMap, colorMap, emojiMap } from "@/libs/constant";
import { IFrom, IGetUserById } from "@/app/types";
import { UserCircle } from "../user-circle";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IZudoModal {
  recipient: IGetUserById;
}

const ZutoModal = ({ recipient }: IZudoModal) => {
  const defaultFormData:IFrom = {
    message: "",
    style: { backgroundColor: "GREEN", textColor: "BLUE", emoji: "HANDSUP" },
  };

  const [formData, setFormData] = useState<IFrom>(defaultFormData);
  

  const getOptions = (data: any) =>
    Object.keys(data).reduce((acc: any[], curr) => {
      acc.push({
        name: curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase(),
        value: curr,
      });
      return acc;
    }, []);

  const backgroundColors = getOptions(backgroundColorMap);
  const textColors = getOptions(colorMap);
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

  const onSubmit = async () => {
    setFormData((data) => ({ ...data, recipientId: recipient.id }));
    axios
      .post("/api/zuto", formData)
      .then(() => {
        setFormData(defaultFormData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
        <div className="text-center flex flex-col items-center gap-y-2 pr-8">
          <UserCircle profile={recipient.profile} className="w-24 h-24" />
          <p className="text-blue-300">
            {recipient.profile.firstName} {recipient.profile.lastName}
          </p>
          {recipient.profile.department && (
            <span className="px-2 py-1 bg-gray-300 rounded-xl text-blue-300 w-auto">
              {recipient.profile.department[0].toUpperCase() +
                recipient.profile.department.toLowerCase().slice(1)}
            </span>
          )}
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
            <SelectBox
              options={backgroundColors}
              name="backgroundColor"
              label="Background Color"
              containerClassName="w-36"
              className="w-full rounded-xl px-3 py-2 text-gray-400"
              value={formData.style.backgroundColor}
              onChange={(e) => handleChange(e, "backgroundColor")}
            />
            <SelectBox
              options={textColors}
              name="textColor"
              label="Text Color"
              containerClassName="w-36"
              className="w-full rounded-xl px-3 py-2 text-gray-400"
              value={formData.style.textColor}
              onChange={(e) => handleChange(e, "textColor")}
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
      <div className="flex flex-col items-center md:flex-row gap-x-24 gap-y-2 md:gap-y-0">
        <Zudo profile={recipient.profile} zuto={formData} />
        <div className="flex-1">
          <button
            type="submit"
            className="rounded-xl bg-yellow-300 font-semibold text-blue-600 w-80 h-12 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
            onClick={() => onSubmit()}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ZutoModal;
