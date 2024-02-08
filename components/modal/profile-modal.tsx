"use client";

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

  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("profile-pic", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      //data response
      const data = await response.json();
      console.log(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
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
      <form onSubmit={handleSubmit} className="flex flex-col p-10 bg-blue-300">
        <input
          type="file"
          onChange={(e) => handleSubmitChange(e)}
          accept="image/*"
        />
        <button type="submit" disabled={uploading}>
          Submit
        </button>
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
