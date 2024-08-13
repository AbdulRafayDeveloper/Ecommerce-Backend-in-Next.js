"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import axios from "axios";
import Swal from "sweetalert2";

const Add = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });
  const handleValidate = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!formData.category_name || !formData.description) {
      alert("Fill the fields.");
      return;
    }
    const categoryData = {
      category_name: formData.category_name,
      description: formData.description,
    };

    try {
      let response = await axios.post("/api/categories", categoryData);
      if (response.data.status === 200) {
        Swal.fire({
          title: "Category Added!",
          text: "Data is added successfully!.",
          icon: "success",
        });
        setFormData({
          category_name: "",
          description: "",
        });
      } else if (response.data.status === 409) {
        Swal.fire({
          title: "Oops!",
          text: "Category already exits. Try another name.",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "An unexpected error occurred",
          icon: "error",
        });
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Error!",
        text: "API Failed!",
        icon: "error",
      });
    }
  };

  return (
    <Sidebar>
      <Header />
      <div className="add p-16 pt-6 bg-gray-100 h-screen overflow-hidden">
        <h1 className="text-2xl">Properties</h1>
        <div className="flex justify-between items-center">
          <h3 className="text-sm">
            Dashboard / Categories{" "}
            <span className="text-gray-400">/ Add Category </span>
          </h3>
          <button
            className="bg-[#006d77] p-2 rounded flex items-center justify-center"
            onClick={handleBack}
            aria-label="Go back"
          >
            <FiArrowLeft className="text-white font-bold" />
          </button>
        </div>
        <div className="data bg-white rounded-lg p-8 mt-4">
          <h2 className="text-2xl text-center font-bold text-[#006d77]">
            Add New Category
          </h2>
          <div className="flex text-sm my-2 mt-4 justify-center items-center">
            <div className="w-1/2">
              <label htmlFor="name" className="flex justify-between">
                <p>Category name</p>
                <p className="text-red-600 size-1">*</p>
              </label>
              <input
                type="text"
                id="name"
                name="category_name"
                value={formData.category_name}
                onChange={handleValidate}
                className="w-full border border-gray-300 my-2 p-2 rounded-md focus:outline-none focus:border-blue-500 font-serif"
              />
            </div>
          </div>
          <div className="flex text-sm my-2 justify-center items-center">
            <div className="w-1/2">
              <label htmlFor="name" className="flex justify-between">
                <p>Category Description</p>
                <p className="text-red-600 size-1">*</p>
              </label>
              <textarea
                id="details"
                name="description"
                value={formData.description}
                onChange={handleValidate}
                className="w-full border border-gray-300 my-2 p-2 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                rows={6}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Button
              variant="contained"
              className="bg-[#006d77] text-white capitalize mt-2"
              type="submit"
              onClick={handleSubmission}
            >
              Save Info
            </Button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Add;
