"use client";

import Image from "next/image";
import { EnvelopIcon, PencilSquareIcon, UploadIcon, UserIcon } from "@/components/Icons";
import Title from "@/components/Title";

const Profile = () => {
  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">
              Personal Information
            </Title>
          </div>
          <div className="p-7">
            <form action="#">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-foreground"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <UserIcon fill="currentColor" size={20} />
                    </span>
                    <input
                      className="w-full rounded border border-divider bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Devid Jhon"
                      defaultValue="Devid Jhon"
                    />
                  </div>
                </div>
      
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-foreground"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded border border-divider bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="+990 3343 7865"
                    defaultValue="+990 3343 7865"
                  />
                </div>
              </div>
      
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-foreground"
                  htmlFor="emailAddress"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <EnvelopIcon fill="currentColor" size={20} />
                  </span>
                  <input
                    className="w-full rounded border border-divider bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    placeholder="devidjond45@gmail.com"
                    defaultValue="devidjond45@gmail.com"
                  />
                </div>
              </div>
      
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-foreground"
                  htmlFor="Username"
                >
                  Username
                </label>
                <input
                  className="w-full rounded border border-divider bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="Username"
                  id="Username"
                  placeholder="devidjhon24"
                  defaultValue="devidjhon24"
                />
              </div>
      
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-foreground"
                  htmlFor="Username"
                >
                  BIO
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <PencilSquareIcon fill="currentColor" size={20} />
                  </span>
      
                  <textarea
                    className="w-full rounded border border-divider bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="bio"
                    id="bio"
                    rows={6}
                    placeholder="Write your bio here"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                  ></textarea>
                </div>
              </div>
      
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-divider px-6 py-2 font-medium text-black hover:shadow-1 dark:text-white"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-span-5 xl:col-span-2">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">
              Your Photo
            </Title>
          </div>
          <div className="p-7">
            <form action="#">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-full">
                  <Image
                    src={"/images/user/user-03.png"}
                    width={55}
                    height={55}
                    alt="User"
                  />
                </div>
                <div>
                  <span className="mb-1.5 text-foreground">
                    Edit your photo
                  </span>
                  <span className="flex gap-2.5">
                    <button className="text-sm hover:text-primary">
                      Delete
                    </button>
                    <button className="text-sm hover:text-primary">
                      Update
                    </button>
                  </span>
                </div>
              </div>
      
              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-white dark:bg-boxdark">
                    <UploadIcon fill="#3C50E0" size={16} />
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  <p>(max, 800 X 800px)</p>
                </div>
              </div>
      
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-divider px-6 py-2 font-medium text-black hover:shadow-1 dark:text-white"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
