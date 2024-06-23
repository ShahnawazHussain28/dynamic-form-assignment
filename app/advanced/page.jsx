"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formElements = [
  {
    id: "fullName",
    name: "Full Name",
    type: "text",
    required: true,
    placeholder: "Full name",
  },
  {
    id: "email",
    name: "Email",
    type: "email",
    required: true,
    placeholder: "Email address",
  },
  {
    id: "topic",
    name: "Survey Topic",
    type: "dropdown",
    options: ["select a topic", "Technology", "Health", "Education"],
  },
  {
    id: "favouriteLanguage",
    name: "Favourite Programming Language",
    type: "dropdown",
    options: ["select a language", "JavaScript", "Python", "Java", "C#"],
    required: true,
    dependency: {
      key: "topic",
      value: "Technology",
    },
  },
  {
    id: "experience",
    name: "Years of Experience",
    type: "number",
    placeholder: "Your experience in years",
    required: true,
    dependency: {
      key: "topic",
      value: "Technology",
    },
  },
  {
    id: "exerciseFrequency",
    name: "Exercise Frequency",
    type: "dropdown",
    options: ["Never", "Daily", "Weekly", "Monthly", "Rarely"],
    required: true,
    dependency: {
      key: "topic",
      value: "Health",
    },
  },
  {
    id: "diet",
    name: "Diet Preference",
    type: "dropdown",
    options: ["select a diet", "Vegetarian", "Vegan", "Non-Vegetarian"],
    required: true,
    dependency: {
      key: "topic",
      value: "Health",
    },
  },
  {
    id: "qualification",
    name: "Highest Qualification",
    type: "dropdown",
    options: [
      "select a qualification",
      "High School",
      "Bachelor's",
      "Master's",
      "PhD",
    ],
    required: true,
    dependency: {
      key: "topic",
      value: "Education",
    },
  },
  {
    id: "fieldOfStudy",
    name: "Field of Study",
    type: "text",
    required: true,
    dependency: {
      key: "topic",
      value: "Education",
    },
  },
];

export default function Advanced() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const [questions, setQuestions] = useState({});
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
    if (
      !formdata.topic ||
      formdata.topic ===
        formElements.filter((f) => f.id === "topic")[0].options[0]
    ) {
      setError("Please select a topic");
      return false;
    }
    let topic = formData.topic;
    for (let i = 0; i < formElements.length; i++) {
      if (
        formElements[i].dependency &&
        formElements[i].dependency.key === "topic" &&
        formElements[i].dependency.value === topic
      ) {
        if (
          formElements[i].type === "dropdown" &&
          (!formdata[formElements[i].id] ||
            formdata[formElements[i].id] === formElements[i].options[0])
        ) {
          setError("Please select all the fields");
          return false;
        }
      }
    }
    return true;
  }

  function submitForm(e) {
    e.preventDefault();
    if (validateInput(formData)) {
      let data = { ...formData };
      for (let key in questions) {
        data[key] = questions[key];
      }
      router.push(`/result?${new URLSearchParams(data).toString()}`);
    } else {
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    (async () => {
      if (
        formData.topic !==
        formElements.filter((f) => f.id === "topic")[0].options[0]
      ) {
        let url;
        if (formData.topic === "Technology")
          url = "https://opentdb.com/api.php?amount=5&category=18&type=boolean";
        else if (formData.topic === "Health")
          url = "https://opentdb.com/api.php?amount=5&category=17&type=boolean";
        else if (formData.topic === "Education")
          url = "https://opentdb.com/api.php?amount=5&category=9&type=boolean";
        if (!url) return;
        const res = await fetch(url);
        const data = await res.json();
        let qna = {};
        data.results.forEach((item) => {
          qna[item.question] = "";
        });
        setQuestions(qna);
      }
    })();
  }, [formData.topic]);

  return (
    <div className="flex flex-col items-center pt-24 w-full">
      <h1 className="text-3xl">Survey Form</h1>
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
        {formElements.map(
          (item, index) =>
            (!item.dependency ||
              formData[item.dependency.key] === item.dependency.value) && (
              <div key={index} className="mt-5 w-full">
                <label htmlFor={item.id}>{item.name}</label>
                {item.type === "dropdown" ? (
                  <select
                    id={item.id}
                    required={item.required}
                    defaultValue={item.options[0]}
                    onChange={(e) => {
                      changeFormData(item.id, e.target.value, true);
                    }}
                    className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
                  >
                    {item.options.map((opt, index) => (
                      <option key={index} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    required={item.required}
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
                )}
              </div>
            ),
        )}
        {Object.keys(questions).map((q, index) => (
          <div key={index} className="mt-5 w-full">
            <label
              htmlFor={q.question}
              dangerouslySetInnerHTML={{ __html: q }}
              className="block max-w-80"
            ></label>
            <input
              required
              type="text"
              id={q}
              name={q}
              value={questions[q] ?? ""}
              onChange={(e) => {
                setQuestions((prev) => {
                  return {
                    ...prev,
                    [q]: e.target.value,
                  };
                });
              }}
              className="bg-transparent border border-[#D9D9D9] block w-full py-2 px-5 rounded my-2 text-lg focus:border-[#F3A07D] focus:outline-none"
            />
          </div>
        ))}
        <div className="mt-5 w-full">
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            value={formData.feedback ?? ""}
            onChange={(e) => changeFormData("feedback", e.target.value)}
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
