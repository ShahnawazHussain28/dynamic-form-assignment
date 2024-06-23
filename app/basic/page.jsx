"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formElements = [
  {
    id: "name",
    name: "Name",
    type: "text",
    placeholder: "Full name",
  },
  {
    id: "email",
    name: "Email",
    type: "email",
    placeholder: "Email address",
  },
  {
    id: "age",
    name: "Age",
    type: "number",
    placeholder: "Your age in years",
  },
];

export default function Basic() {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  function changeAttendingWithGuest(e, val) {
    e.preventDefault();
    e.target.blur();
    setFormData((prev) => {
      return {
        ...prev,
        ["attendingWithGuest"]: val,
      };
    });
  }
  function changeFormData(key, val) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: val,
      };
    });
  }

  function submitForm(e) {
    e.preventDefault();
    router.push(`/result?${new URLSearchParams(formData).toString()}`);
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="flex flex-col items-center pt-24 w-full">
      <h1 className="text-3xl">Event Registration Form</h1>
      <form className="flex flex-col items-center mt-10" onSubmit={submitForm}>
        {formElements.map((item, index) => (
          <div key={index} className="mt-5">
            <label htmlFor={item.id}>{item.name}</label>
            <input
              type={item.type}
              id={item.id}
              name={item.id}
              placeholder={item.placeholder}
              value={formData[item.id] ?? ""}
              onChange={(e) => {
                changeFormData(item.id, e.target.value);
              }}
              className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
            />
          </div>
        ))}
        <div className="mt-5">
          <label htmlFor="attendingWithGuest">
            Are you attending with a guest?
          </label>
          <div className="grid overflow-hidden grid-cols-2 my-2 mx-10 bg-gray-200 rounded divide-x-2 divide-black dark:bg-gray-800">
            <button
              onClick={(e) => changeAttendingWithGuest(e, true)}
              className={`${formData.attendingWithGuest === true && "bg-black text-white dark:bg-white dark:text-black"} p-3 focus:bg-gray-500/50`}
            >
              Yes
            </button>
            <button
              onClick={(e) => changeAttendingWithGuest(e, false)}
              className={`${formData.attendingWithGuest === false && "bg-black text-white dark:bg-white dark:text-black"} p-3 focus:bg-gray-500/50`}
            >
              No
            </button>
          </div>
        </div>
        {formData.attendingWithGuest && (
          <div className="mt-5">
            <label htmlFor="guestName">Guest Name</label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              placeholder="Guest Name"
              value={formData.guestName ?? ""}
              onChange={(e) => {
                changeFormData("guestName", e.target.value);
              }}
              className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
            />
          </div>
        )}
        <input
          type="submit"
          value={"Submit"}
          className="mt-5 px-5 py-2 bg-[#F3A07D] rounded text-white text-lg font-bold cursor-pointer hover:bg-[#F27F5E]"
        />
      </form>
    </div>
  );
}
