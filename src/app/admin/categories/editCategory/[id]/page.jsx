"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "@/app/components/Footer";

const Update = ({ params }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const [category, setCategory] = useState({
    category_name: "",
    description: "",
  });
  const id = params.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/categories/${id}`);
        setCategory(response.data[0]);
      } catch (error) {
        alert("API hit failed");
      }
    };

    getData();
  }, [id]);

  const handleUpdation = async (e) => {
    e.preventDefault();

    const upadtedCategory = {
      category_name: category.category_name,
      description: category.description,
    };

    try {
      let response = await axios.put(`/api/categories/${id}`, upadtedCategory);
      console.log(response.data);
      if (response.data.status === 200) {
        Swal.fire({
          title: "Category Updated!",
          text: "Category successfully updated!.",
          icon: "success",
        });
        setCategory({
          category_name: "",
          description: "",
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

  const handleValidate = (e) => {
    const { name, value } = e.target;
    setCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Sidebar>
      <Header />
      <div className="add p-6 md:p-16 pt-6 bg-gray-100 min-h-screen overflow-hidden">
        <h1 className="text-xl md:text-2xl">Properties</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-3">
          <h3 className="text-sm text-center md:text-left">
            Dashboard / Categories{" "}
            <span className="text-gray-400">/ Update Category </span>
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
            Update Category
          </h2>
          <div className="flex flex-col text-sm mt-5 justify-center items-center gap-4 md:gap-8">
            <div className="w-full md:w-1/3">
              <label htmlFor="name" className="flex justify-between">
                <p>Category name</p>
                <p className="text-red-600 text-xs">*</p>
              </label>
              <input
                type="text"
                id="name"
                name="category_name"
                value={category.category_name}
                onChange={handleValidate}
                className="w-full border border-gray-300 my-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-1/3">
              <label htmlFor="description" className="flex justify-between">
                <p>Category Description</p>
                <p className="text-red-600 text-xs">*</p>
              </label>
              <textarea
                id="description"
                name="description"
                value={category.description}
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
              onClick={handleUpdation}
            >
              Update Info
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </Sidebar>
  );
};

export default Update;
