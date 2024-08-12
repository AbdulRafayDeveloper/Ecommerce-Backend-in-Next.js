"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FaRegPenToSquare, FaDownload } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Swal from "sweetalert2";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import axios from "axios";
import Link from "next/link";

const listCategories = () => {
  // Send API to list data from database!
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`/api/categories`);
        setCategories(response.data.result);
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
        const response = await axios.delete(`/api/categories/${id}`);
        if (response.data.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setCategories((prevData) =>
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
        <div className="p-12 bg-gray-100 h-screen">
          <h1 className="text-2xl">Categories</h1>
          <div className="flex justify-between items-center">
            <h3 className="text-sm">
              Dashboard <span className="text-gray-400">/ List </span>
            </h3>
            <div className="options flex gap-3">
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
              <Link href={"../adminPanel/categories/addCategory"}>
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

          <div className="data bg-white rounded-lg p-4 mt-8">
            <div className="flex justify-between">
              <p className="text-sm">
                Show{" "}
                <input
                  type="number"
                  id="entries"
                  min={10}
                  max={20}
                  value={entries} // Controlled input value from state
                  step={1}
                  onChange={handleInputChange} // Call the handler function on change
                  className="border rounded p-1"
                />
                entries
              </p>
              <label htmlFor="search">
                Search: <input type="text" className="border rounded p-1" />
              </label>
            </div>
            <div className="table my-8 text-sm">
              <table className="table-fixed w-full border rounded-lg border-none">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border p-2">category_id</th>
                    <th className="border p-2">category_name</th>
                    <th className="border p-2">description</th>
                    <th className="border p-2">created_at</th>
                    <th className="border p-2">updated_at</th>
                    <th className="border p-2">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((element, index) => (
                      <tr key={index} className="border">
                        <td className="text-center">{element.category_id}</td>
                        <td className="text-center">{element.category_name}</td>
                        <td className="text-center">{element.description}</td>
                        <td className="text-center">
                          {new Date(element.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="text-center">
                          {new Date(element.updated_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="flex gap-2 p-2 justify-center items-center">
                          <Link
                            href={`../adminPanel/categories/editCategory/${element.category_id}`}
                          >
                            <FaRegPenToSquare className="text-green-400 text-lg font-bold cursor-pointer" />
                          </Link>
                          <RiDeleteBin6Line
                            className="text-red-400 text-lg font-bold cursor-pointer"
                            onClick={() => {
                              handleDeletion(element.category_id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <p>Showing 1 to 1 of 1 entries</p>
              <div className="flex">
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
      </Sidebar>
    </>
  );
};

export default listCategories;
