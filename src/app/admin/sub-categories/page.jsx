"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FaRegPenToSquare, FaDownload } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import axios from "axios";
import Link from "next/link";

const listSubCategories = () => {
  // Send API to list data from database!
  const [subcategories, setSubCategories] = useState([]);
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`/api/subCategories`);
        setSubCategories(response.data.data);
      } catch (error) {
        alert("Records not found");
      }
    };
    fetchRecords();
  }, []);

  // For Delete
  const handleDeletion = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#006d77",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`/api/subCategories/${id}`);
        if (response.data.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setSubCategories((prevData) =>
            prevData.filter((category) => category.id !== id)
          );
        }
      } catch (error) {
        console.error("Failed to delete:", error);
        Swal.fire({
          title: "Error!",
          text: "There was a problem in deleting data.",
          icon: "error",
        });
      }
    }
  };

  // Pagination
  const [entries, setEntries] = useState(12);
  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue >= 10 && newValue <= 20) {
      setEntries(newValue);
    }
  };

  // For Import
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFileName("");
  };
  const handleFileImport = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };
  return (
    <>
      <Sidebar>
        <Header />
        <div className="p-8 bg-gray-100 h-screen">
          <h1 className="text-xl sm:text-2xl my-1">Sub-Categories</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h3 className="text-sm">
              Dashboard <span className="text-gray-400">/ List </span>
            </h3>
            <div className="options flex gap-3 mt-4 md:mt-0">
              <Button
                variant="contained"
                size="small"
                className="bg-[#006d77] hover:bg-[#349fa9] capitalize"
                startIcon={<FilterAltOutlinedIcon className="text-white" />}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                size="small"
                className="bg-[#006d77] hover:bg-[#349fa9] capitalize"
                startIcon={<DescriptionOutlinedIcon className="text-white" />}
                onClick={openModal}
              >
                Import
              </Button>
              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <h2 className="text-lg font-semibold mb-4">
                        Import Excel
                      </h2>
                      <RxCross2
                        className="text-gray-600 cursor-pointer"
                        onClick={closeModal}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CSV file <span className="text-red-500">*</span>
                        </label>
                        <FaDownload className="text-blue-500" />
                      </div>
                      <input
                        type="file"
                        accept=".csv"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2 focus:outline-none"
                        onChange={handleFileImport}
                      />
                      {fileName && (
                        <p className="mt-2 text-gray-600">{fileName}</p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-[#006d77] text-white font-medium py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={closeModal}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <Link href={"../admin/sub-categories/addSubCategory"}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="bg-[#006d77] hover:bg-[#349fa9] capitalize"
                  startIcon={
                    <AddOutlinedIcon className="text-white font-bold" />
                  }
                >
                  Add
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mt-10">
            <div className="flex flex-col md:flex-row justify-between">
              <p className="text-sm">
                Show{" "}
                <input
                  type="number"
                  id="entries"
                  min={10}
                  max={20}
                  value={entries}
                  step={1}
                  onChange={handleInputChange}
                  className="border rounded p-1 w-16"
                />
                {"  "}
                entries
              </p>
              <label htmlFor="search" className="mt-4 md:mt-0">
                Search: <input type="text" className="border rounded p-1" />
              </label>
            </div>

            <div className="relative overflow-x-auto my-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="bg-slate-100">
                    <th className="border px-4 py-2">Sr#</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subcategories &&
                    subcategories.map((element, index) => (
                      <tr key={index} className="border">
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          {element.subcategory_name}
                        </td>
                        <td className="text-center">{element.description}</td>
                        <td className="text-center">
                          {element.category_name}
                        </td>{" "}
                        <td className="flex gap-2 p-2 justify-center items-center">
                          <Link
                            href={`../admin/sub-categories/editSubCategory/${element.subcategory_id}`}
                          >
                            <FaRegPenToSquare className="text-green-400 text-lg font-bold cursor-pointer" />
                          </Link>
                          <RiDeleteBin6Line
                            className="text-red-400 text-lg font-bold cursor-pointer"
                            onClick={() =>
                              handleDeletion(element.subcategory_id)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between my-4 text-sm">
              <p>Showing 1 to 1 of 1 entries</p>
              <div className="flex mt-4 md:mt-0">
                <Button
                  variant="outlined"
                  className="capitalize border-slate-300 text-gray-400"
                >
                  Previous
                </Button>
                <div className="bg-[#006d77] hover:bg-[#349fa9] text-white px-4 py-2">
                  1
                </div>
                <Button
                  variant="outlined"
                  className="capitalize border-slate-300 text-gray-400"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Sidebar>
    </>
  );
};

export default listSubCategories;
