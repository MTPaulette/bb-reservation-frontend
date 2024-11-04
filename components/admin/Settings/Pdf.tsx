"use client";

import { EnvelopIcon, PencilSquareIcon, UserIcon } from "@/components/Icons";
import Title from "@/components/Title";

const Pdf = () => {
  return (
    <div className="rounded-sm border border-divider bg-background shadow-default">
      <div className="border-b border-divider px-7 py-4">
        <Title className="font-medium text-foreground">
          Pdf
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
  );
};

export default Pdf;
