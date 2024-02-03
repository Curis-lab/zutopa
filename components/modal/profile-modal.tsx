"use client";

import axios from "axios";
import { useState } from "react";

import { FormField } from "../form-field";
import { IProfileModal } from "@/interfaces/profile";
import toast from "react-hot-toast";
import { display_alert, display_background } from "@/libs/console_decorator";

const ProfileModal = ({
  firstName,
  lastName,
  department,
  profilePicture,
}: IProfileModal) => {
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    department,
    profilePicture,
  });

  const [selectedImage, setSelectImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const onSubmit = async () => {
    console.log("Selected Image", selectedImage);
    console.log(selectedFile);

    if (!selectedFile) {
      return null;
    }

    const formData = new FormData();
    formData.append("profile-pic", selectedFile);
    const { data } = await axios.post("/api/profilePic", formData);

    console.log(data);
  };

  function handleChangeUpload(e: EventTarget & HTMLInputElement) {
    if (e.files) {
      const file = e.files[0];
      setSelectImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  }

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    display_alert(file);
    if (!file) {
      toast("Please select a file to upload");
      return;
    }

    setUploading(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    );
    if (response.ok) {
      const { url, fields } = await response.json();
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        toast("upload successfully!");
      } else {
        toast("Failed go get presigned URL");
      }

      setUploading(false);
    }
  };
  return (
    <div className="p-3">
      <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">
        Your Profile
      </h2>
      <form onSubmit={handleSubmit} className="bg-blue-900">
        <input
          id="file"
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setFile(files[0]);
            }
            display_background(file);
          }}
          accept="image/*"
        />
        <label>AWS Submit</label>
      </form>
      {/* <div>
        <input
          type="file"
          accept="image/*"
          onChange={({ target }) => handleChangeUpload(target)}
        />
      </div> */}
      <div>
        {selectedImage ? (
          <img src={selectedImage} alt="" className="w-24 h-23 rounded-full" />
        ) : (
          <span></span>
        )}
      </div>

      <button onClick={onSubmit}>ONSUBMIT</button>
      <div className="text-xs font-semibold text-center">formError</div>
      <div className="flex">
        <div className="w-1/3 flex justify-center">
          {/* <ImageUploader
            onChange={handleFileUpload}
            imageUrl={formData.profilePicture || ""}
          /> */}
        </div>
        <div className="flex-1">
          <FormField
            htmlFor="firstName"
            label="First Name"
            value={formData.firstName}
          />
          <FormField
            htmlFor="lastName"
            label="Last Name"
            value={formData.lastName}
          />
          <FormField
            htmlFor="Department"
            label="Department"
            value={formData.department}
          />
          <button
            name="_action"
            value="delete"
            className="rounded-xl w-full bg-red-300 font-semibold text-white mt-4 px-16 py-2 transition duration-300 ease-in-out hover:bg-red-400 hover:-translate-y-1"
          >
            Delete Account
          </button>
          <div className="w-full text-right mt-4">
            <button
              value="save"
              className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
