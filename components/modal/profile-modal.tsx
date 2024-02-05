"use client";

import axios from "axios";
import { ChangeEvent, useState } from "react";

import { FormField } from "../form-field";
import { IProfileModal } from "@/interfaces/profile";

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
    if (!selectedFile) {
      return null;
    }
    console.log("From selected File -> ", selectedFile);
    const formData = new FormData();
    formData.append("profile-pic", selectedFile);
    const { data } = await axios.post("/api/profilePic", formData);
    console.log("form on Submit button ---->", data);
  };

  function handleChangeUpload(e: EventTarget & HTMLInputElement) {
    if (e.files) {
      setSelectImage(URL.createObjectURL(e.files[0]));
      setSelectedFile(e.files[0]);
    }
  }

  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
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
    if(response.ok){
      const {url, fields} = await response.json();
      if(url){console.log('success on fields')};
      const formData = new FormData();
      // Object.entries(fields).forEach
    }
    // if (response.ok) {
    //   const { url, fields } = await response.json();
    //   const formData = new FormData();
    //   Object.entries(fields).forEach(([key, value]) => {
    //     formData.append(key, value as string);
    //   });
    //   formData.append("file", file);

    //   const uploadResponse = await fetch(url, {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (uploadResponse.ok) {
    //     console.log("upload successfully!");
    //   } else {
    //     console.log("Failed go get presigned URL");
    //   }
    //   setUploading(false);
    // }
  };

  //success on these part
  function handleSubmitChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) {
      return null;
    }
    setFile(e.target.files[0]);
  }
  return (
    <div className="p-3">
      <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">
        Your Profile
      </h2>
      {/* <form onSubmit={handleSubmit} className="bg-blue-900 p-10">
        <input
          id="file"
          type="file"
          onChange={({ target }) => handleSubmitChange(target)}
          accept="image/*"
        />
      </form>
      <input
        type="file"
        accept="image/*"
        onChange={({ target }) => handleChangeUpload(target)}
      />
      <div>
        {selectedImage ? (
          <img src={selectedImage} alt="" className="w-24 h-23 rounded-full" />
        ) : (
          <span></span>
        )}
      </div>

      <button onClick={onSubmit} className="bg-blue-200 p-10 rounded-lg">
        ONSUBMIT
      </button> */}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => handleSubmitChange(e)}
          accept="image/*"
        />
        <button type="submit" disabled={uploading}>Submit</button>
      </form>
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
