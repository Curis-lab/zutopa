"use client";

import { useState } from "react";
import { FormField } from "../form-field";
import SelectBox from "../select-box";
import { Department, Profile, User } from "@prisma/client";
import { UserCircle } from "../user-circle";

interface IUser {
  currentUser: Profile;
}

const ProfileModal = ({ currentUser }: IUser) => {
  const [formData, setFormData] = useState({ firstName:currentUser.firstName, lastName: currentUser.lastName, department: currentUser.department });

  return (
    <div className="flex">
      <div className="w-1/3">
        <UserCircle profile={currentUser} className="h-16 w-16"/>
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
        {/* <SelectBox
          className="w-full rounded-xl px-3 py-2 text-gray-400"
          id="department"
          name="department"
          value={formData.department}
          onChange={() => {}}
          options={formData.department}
        /> */}
        <button
          name="_action"
          value="delete"
          className="rounded-xl w-full bg-red-300 font-semibold text-white mt-4 px-16 py-2 transition duration-300 ease-in-out hover:bg-red-400 hover:-translate-y-1"
        >
          Delete Account
        </button>
        <div className="w-full text-right mt-4">
          <button
            name="_action"
            value="save"
            className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
