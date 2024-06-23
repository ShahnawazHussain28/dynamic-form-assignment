"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formElements = [
  {
    id: "fullName",
    name: "Full Name",
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
    id: "phone",
    name: "Phone Number",
    type: "tel",
    placeholder: "Phone number",
  },
];

export default function Intermediate() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const router = useRouter();

  function changeFormData(key, val, checked) {
    setFormData((prev) => {
      if (key === "additionalSkills") {
        let nv = prev[key] ?? [];
        if (checked) {
          nv.push(val);
          nv = [...new Set(nv)];
        } else {
          nv = nv.filter((item) => item !== val);
        }
        return {
          ...prev,
          [key]: nv,
        };
      } else {
        return {
          ...prev,
          [key]: val,
        };
      }
    });
  }

  function validateInput(formdata) {
    if (!formdata.position || formdata.position === "select a role") {
      setError("Please select a role");
      return false;
    }
    if (!formdata.phone || formdata.phone.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }
    if (
      ["Developer", "Designer"].includes(formdata.position) &&
      !formdata.experience
    ) {
      setError("Please enter your experience");
      return false;
    }
    if (!formdata.additionalSkills || formdata.additionalSkills.length === 0) {
      setError("Please select at least one skill");
      return false;
    }
    if (
      !formdata.interviewTime ||
      !formdata.interviewTime.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    ) {
      setError("Please enter a valid date and time");
      return false;
    }
    return true;
  }

  function submitForm(e) {
    e.preventDefault();
    if (validateInput(formData)) {
      router.push(`/result?${new URLSearchParams(formData).toString()}`);
    } else {
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="flex flex-col items-center pt-24 w-full">
      <h1 className="text-3xl">Event Registration Form</h1>
      <form className="flex flex-col items-center mt-10" onSubmit={submitForm}>
        {error && (
          <div className="flex justify-between p-3 w-full rounded bg-red-500/50">
            <p>{error}</p>
            <button
              onClick={() => {
                setError(null);
              }}
            >
              &#10005;
            </button>
          </div>
        )}
        {formElements.map((item, index) => (
          <div key={index} className="mt-5">
            <label htmlFor={item.id}>{item.name}</label>
            <input
              required
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

        <div className="mt-5 w-full">
          <label htmlFor="position">Applying for position</label>
          <select
            id={"position"}
            defaultValue={"select a role"}
            onChange={(e) => changeFormData("position", e.target.value)}
            className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
          >
            <option value={"select a role"}>select a role</option>
            <option value={"Developer"}>Developer</option>
            <option value={"Designer"}>Designer</option>
            <option value={"Manager"}>Manager</option>
          </select>
        </div>
        {["Developer", "Designer"].includes(formData.position) && (
          <div className="mt-5 w-full">
            <label htmlFor="experience">Relevant Experience</label>
            <input
              required
              type="number"
              placeholder="Number of years"
              value={formData.experience ?? ""}
              onChange={(e) => changeFormData("experience", e.target.value)}
              className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
            />
          </div>
        )}
        {formData.position === "Designer" && (
          <div className="mt-5 w-full">
            <label htmlFor="portfolio">Portfolio URL</label>
            <input
              required
              type="url"
              placeholder="Portfolio URL"
              value={formData.portfolio ?? ""}
              onChange={(e) => changeFormData("portfolio", e.target.value)}
              className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
            />
          </div>
        )}
        {formData.position === "Manager" && (
          <div className="mt-5 w-full">
            <label htmlFor="experience">Management Experience</label>
            <input
              required
              type="text"
              placeholder="Describe your experience"
              value={formData.experience ?? ""}
              onChange={(e) => changeFormData("experience", e.target.value)}
              className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
            />
          </div>
        )}
        <div className="mt-5 w-full">
          <label htmlFor="additionalSkills">Additional Skills</label>
          {["JavaScript", "CSS", "Python", "Rust"].map((item, index) => (
            <div key={index} className="flex gap-3 items-center mt-2 ml-5">
              <input
                type="checkbox"
                id={item}
                className="w-5 h-5"
                onChange={(e) =>
                  changeFormData("additionalSkills", item, e.target.checked)
                }
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
        <div className="mt-5 w-full">
          <label htmlFor="interviewTime">Preferred Interview Time</label>
          <input
            type="datetime-local"
            value={formData.interviewTime ?? ""}
            onChange={(e) => changeFormData("interviewTime", e.target.value)}
            className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
          />
        </div>
        <input
          required
          type="submit"
          value={"Submit"}
          className="mt-5 px-5 py-2 bg-[#F3A07D] rounded text-white text-lg font-bold cursor-pointer hover:bg-[#F27F5E]"
        />
      </form>
    </div>
  );
}
