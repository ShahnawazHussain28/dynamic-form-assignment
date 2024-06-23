"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Result() {
  const params = useSearchParams();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData((_prev) => {
      let d = {};
      params.forEach((value, key) => {
        d[key] = value;
      });
      return d;
    });
  }, [params]);

  return (
    <div className="flex flex-col items-center pt-10 mt-24 w-full">
      <h1 className="text-3xl">Form Data</h1>
      <div className="p-10 mt-10 text-lg bg-gray-200 border-2 dark:bg-gray-800">
        {Object.keys(formData).map((key, index) => (
          <div key={index}>
            <span className="mr-3">{key} : </span>
            <span className="">{formData[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
