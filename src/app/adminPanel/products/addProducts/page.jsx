"use client";
import React from "react";
import { Button } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";

const Add = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Sidebar>
      <Header />
      <div className="p-16 pt-10 bg-gray-100 h-screen">
        <h1 className="text-2xl">Properties</h1>
        <div className="flex justify-between items-center">
          <h3 className="text-sm">
            Dashboard / Properties{" "}
            <span className="text-gray-400">/ Add Property </span>
          </h3>
          <button
            className="bg-[#006d77] p-2 rounded flex items-center justify-center"
            onClick={handleBack}
            aria-label="Go back"
          >
            <FiArrowLeft className="text-white font-bold" />
          </button>
        </div>
        <div className="data bg-white rounded-lg p-8 mt-6">
          <h2 className="text-2xl">Basic Info</h2>
          <div className="flex gap-8 text-sm my-6">
            <div className="w-1/2">
              <label htmlFor="property" className="flex justify-between">
                <p>Property name</p>
                <p className="text-red-600 size-1">*</p>
              </label>
              <input
                type="text"
                id="property"
                required
                className="w-full border border-gray-300 my-2 p-2 rounded-md active:border-gray-400"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="category" className="flex justify-between">
                <p>Property code category</p>
                <p className="text-red-600 size-1">*</p>
              </label>
              <input
                type="text"
                id="category"
                required
                className="w-full border border-gray-300 p-2 my-2"
              />
            </div>
          </div>
          <div className="flex gap-8 text-sm my-6">
            <div className="w-1/2">
              <label htmlFor="code" className="flex justify-between">
                <p>Property Code</p>
                <p className="text-red-600 size-1">*</p>
              </label>
              <input
                type="text"
                id="code"
                required
                className="w-full border border-gray-300 my-2 p-2"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="details" className="required">
                Property code detail
              </label>
              <textarea
                id="details"
                className="w-full border border-gray-300 my-2"
                rows={6}
              ></textarea>
            </div>
          </div>
          <Button
            variant="contained"
            className="bg-[#006d77] text-white capitalize mt-4"
          >
            Save Info
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default Add;
