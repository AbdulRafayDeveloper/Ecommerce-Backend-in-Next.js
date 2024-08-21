"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import axios from "axios";
import Swal from "sweetalert2";

const Add = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  // Get all category names for dropdown
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`/api/categories`);
        setData(response.data.data);
      } catch (error) {
        alert("Data not found");
      }
    };
    fetchRecords();
  }, []);

  // Sub-Category Form
  const [formData, setFormData] = useState({
    subcategory_name: "",
    description: "",
    id: "",
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

    if (!formData.subcategory_name || !formData.description || !formData.id) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required!",
        icon: "error",
      });
      return;
    }

    const subCategoryData = {
      subcategory_name: formData.subcategory_name,
      description: formData.description,
      id: formData.id,
    };
    console.log(subCategoryData.id);

    try {
      const response = await axios.post("/api/subCategories", subCategoryData);
      if (response.data.status === 200) {
        Swal.fire({
          title: "SubCategory Added!",
          text: "Data added successfully!",
          icon: "success",
        });
        setFormData({
          subcategory_name: "",
          description: "",
          id: "",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Submission failed",
        icon: "error",
      });
    }
  };

  return (
    <Sidebar>
      <Header />
      <div className="add p-6 md:p-16 pt-6 bg-gray-100 min-h-screen overflow-hidden">
        <h1 className="text-xl md:text-2xl">Properties</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-3">
          <h3 className="text-sm text-center md:text-left">
            Dashboard / SubCategories{" "}
            <span className="text-gray-400">/ Add Sub-Category </span>
          </h3>
          <button
            className="bg-[#006d77] p-2 mt-3 md:mt-0 rounded flex items-center justify-center"
            onClick={handleBack}
            aria-label="Go back"
          >
            <FiArrowLeft className="text-white font-bold" />
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 md:p-8 mt-2">
          <h2 className="text-xl md:text-2xl text-center font-bold text-[#006d77]">
            Add SubCategory
          </h2>
          <div className="flex flex-col text-sm mt-5 justify-center items-center gap-3">
            <div className="w-full md:w-2/5">
              <label htmlFor="name" className="flex justify-between">
                <p>SubCategory name</p>
                <p className="text-red-600 text-xs">*</p>
              </label>
              <input
                type="text"
                id="name"
                name="subcategory_name" // Changed to match API
                value={formData.subcategory_name}
                onChange={handleValidate}
                className="w-full border border-gray-300 my-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-2/5">
              <label htmlFor="category" className="flex justify-between">
                <p>Category Name</p>
                <p className="text-red-600 text-xs">*</p>
              </label>
              <select
                name="id"
                value={formData.id}
                onChange={handleValidate}
                className="w-full border border-gray-300 my-2 p-2 rounded-md"
              >
                <option value="">Select Category</option>
                {data &&
                  data.map((element, index) => (
                    <option value={element.category_id} key={index}>
                      {element.category_name} {/* This is the display name */}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full md:w-2/5">
              <label htmlFor="description" className="flex justify-between">
                <p>Category Description</p>
                <p className="text-red-600 text-xs">*</p>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleValidate}
                className="w-full border border-gray-300 my-2 p-2 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button
              variant="contained"
              className="bg-[#006d77] text-white capitalize"
              type="submit"
              onClick={handleSubmission}
            >
              Save Info
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </Sidebar>
  );
};

export default Add;
