"use client";
import React from "react";
import { Button } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";

const Update = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <Sidebar>
        <Header />
        <div className="p-16 bg-gray-100 h-screen">
          <h1 className="text-2xl ">Properties</h1>
          <div className="flex justify-between">
            <h3 className="text-sm">
              Dashboard / Properties{" "}
              <span className="text-gray-400">/ Update Property </span>
            </h3>
            <div className="bg-[#006d77] p-2">
              <FiArrowLeft
                className="text-white font-bold cursor-pointer"
                onClick={handleBack}
              />
            </div>
          </div>
          <div className="data bg-white rounded-lg p-8 mt-6">
            <h2 className="text-2xl ">Basic Info</h2>
            <form action="/" className="mt-5 text-sm flex gap-8 ">
              <div className="w-1/2">
                <div>
                  <label htmlFor="name" className="flex justify-between">
                    <p>Property name </p>
                    <p className="text-red-600 size-1">*</p>
                  </label>
                  <input
                    type="text"
                    id="property"
                    required
                    className="w-full border border-gray-300 my-2 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="flex justify-between">
                    <p>Property code category </p>
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
              <div className="w-1/2">
                <div>
                  <label htmlFor="name" className="flex justify-between">
                    <p>Property Code </p>
                    <p className="text-red-600 size-1">*</p>
                  </label>
                  <input
                    type="text"
                    id="code"
                    required
                    className="w-full border border-gray-300 my-2 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="required">
                    Property code detail{" "}
                  </label>
                  <textarea
                    className="w-full border border-gray-300 my-2"
                    rows={6}
                  ></textarea>
                </div>
              </div>
            </form>
            <Button
              variant="contained"
              className="bg-[#006d77] text-white capitalize flex justify-end items-end"
            >
              Update Info
            </Button>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Update;
