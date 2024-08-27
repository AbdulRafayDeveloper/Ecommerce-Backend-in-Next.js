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
import { Roboto } from "next/font/google";
const inter = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const Add = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  // Get all category names for dropdown
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/categories`);
        setData(response.data.data);
      } catch (error) {
        alert("Data not found");
      }
    };
    fetchCategories();
  }, []);

  // Sub-Category Form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    subcategory_id: "",
  });

  // Get all subCategory names for dropdown
  const [subCategories, setSubcategories] = useState([]);
  useEffect(() => {
    if (formData.category_id) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get(
            `/api/subCategories/${formData.category_id}`
          );
          setSubcategories(response.data.data);
        } catch (error) {
          alert("Data not found");
        }
      };
      fetchSubCategories();
    }
  }, [formData.category_id]);

  const handleValidate = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.category_id ||
      !formData.subcategory_id
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required!",
        icon: "error",
      });
      return;
    }

    const products = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      category_id: formData.category_id,
      subcategory_id: formData.subcategory_id,
    };

    try {
      const response = await axios.post("/api/products", products);
      if (response.data.status === 200) {
        Swal.fire({
          title: "Product Added!",
          text: "Data added successfully!",
          icon: "success",
        });
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category_id: "",
          subcategory_id: "",
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
    <div className={inter.className}>
      <Sidebar>
        <Header />
        <div className="add p-6 md:p-16 pt-6 bg-gray-100 min-h-screen overflow-hidden">
          <h1 className="text-xl md:text-2xl">Properties</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-3">
            <h3 className="text-sm text-center md:text-left">
              Dashboard / Products{" "}
              <span className="text-gray-400">/ Add Product </span>
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
              Add Product
            </h2>
            <div className="flex flex-col text-sm mt-5 justify-center items-center gap-3">
              {/* Product Name */}
              <div className="w-full md:w-2/5">
                <label htmlFor="name" className="flex justify-between">
                  <p>Product name</p>
                  <p className="text-red-600 text-xs">*</p>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name" // Changed to match API
                  value={formData.name}
                  onChange={handleValidate}
                  className="w-full border border-gray-300 my-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Product Description */}
              <div className="w-full md:w-2/5">
                <label htmlFor="description" className="flex justify-between">
                  <p>Description</p>
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
              {/* Price */}
              <div className="w-full md:w-2/5">
                <label htmlFor="name" className="flex justify-between">
                  <p>Price</p>
                  <p className="text-red-600 text-xs">*</p>
                </label>
                <input
                  type="text"
                  id="name"
                  name="price" // Changed to match API
                  value={formData.price}
                  onChange={handleValidate}
                  className="w-full border border-gray-300 my-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Stock Quantity */}
              <div className="w-full md:w-2/5">
                <label htmlFor="name" className="flex justify-between">
                  <p>Stock Quantity</p>
                  <p className="text-red-600 text-xs">*</p>
                </label>
                <input
                  type="text"
                  id="name"
                  name="stock" // Changed to match API
                  value={formData.stock}
                  onChange={handleValidate}
                  className="w-full border border-gray-300 my-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Category Dropdown */}
              <div className="w-full md:w-2/5">
                <label htmlFor="category" className="flex justify-between">
                  <p>Category Name</p>
                  <p className="text-red-600 text-xs">*</p>
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={(e) => handleValidate(e)}
                  className="w-full border border-gray-300 my-2 p-2 rounded-md"
                >
                  <option value="">Select Category</option>
                  {data &&
                    data.map((element, index) => (
                      <option value={element.category_id} key={index}>
                        {element.category_name}
                      </option>
                    ))}
                </select>
              </div>

              {/* SubCategory name */}
              <div className="w-full md:w-2/5">
                <label htmlFor="category" className="flex justify-between">
                  <p>Subcategory Name</p>
                  <p className="text-red-600 text-xs">*</p>
                </label>
                <select
                  name="subcategory_id"
                  value={formData.subcategory_id}
                  onChange={handleValidate}
                  className="w-full border border-gray-300 my-2 p-2 rounded-md"
                >
                  <option value="">Select Subcategory</option>
                  {subCategories &&
                    subCategories.map((element, index) => (
                      <option value={element.subcategory_id} key={index}>
                        {element.subcategory_name}{" "}
                        {/* This is the display name */}
                      </option>
                    ))}
                </select>
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
    </div>
  );
};

export default Add;
