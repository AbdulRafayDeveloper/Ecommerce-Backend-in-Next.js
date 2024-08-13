"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FaRegPenToSquare, FaDownload } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import Swal from "sweetalert2";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import axios from "axios";

const List = () => {
  // For Filter
  const [isFilterVisible, setFilterVisible] = useState(false);

  // Options for the dropdown
  const propertyNames = [
    "Rental Property 5wk",
    "Another Property",
    "Third Property",
  ];
  const propertyCodes = ["PR-01", "PR-02", "PR-03"];
  const propertyCategories = ["Rental", "Sale"];
  const propertyDetails = ["Faisalabad", "Lahore", "Karachi"];

  // Toggle dropdown visibility
  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible);
  };

  // Handle dropdown change (example)
  const handleFilterChange = (e) => {
    console.log(e.target.value); // Log selected value (add more logic as needed)
  };

  // For Delete
  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#006d77",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
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

    // Send API to list data from database!
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("/api");
          setUsers(response.data.result);
        } catch (e) {
          console.log(e);
        }
      };
      fetchUsers();
    }, []);
  };
  return (
    <>
      <Sidebar>
        <Header />
        <div className="p-12 bg-gray-100">
          <h1 className="text-2xl">Properties</h1>
          <div className="flex justify-between items-center">
            <h3 className="text-sm">
              Dashboard <span className="text-gray-400">/ List </span>
            </h3>
            <div className="options flex gap-3">
              <Button
                variant="contained"
                size="small"
                onClick={toggleFilter}
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
              <Link href={"../adminPanel/products/addProducts"}>
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

          {/* Dropdown Section */}
          <div>
            {isFilterVisible && (
              <div className="mt-4 p-6 bg-white shadow rounded-md border border-gray-200 ">
                <div className="flex justify-between">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="property-name"
                    >
                      Property Name
                    </label>
                    <select
                      id="property-name"
                      className="block appearance-none  bg-white w-48 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select</option>
                      {propertyNames.map((name, index) => (
                        <option key={index} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="property-code"
                    >
                      Property Code
                    </label>
                    <select
                      id="property-code"
                      className="block appearance-none  bg-white w-48 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select</option>
                      {propertyCodes.map((code, index) => (
                        <option key={index} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="property-category"
                    >
                      Property Category
                    </label>
                    <select
                      id="property-category"
                      className="block appearance-none  bg-white w-48 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select</option>
                      {propertyCategories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="property-details"
                    >
                      Property Code Details
                    </label>
                    <select
                      id="property-details"
                      className="block appearance-none  bg-white w-48 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={handleFilterChange}
                    >
                      <option value="">Select</option>
                      {propertyDetails.map((detail, index) => (
                        <option key={index} value={detail}>
                          {detail}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setFilterVisible(false)}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          <div className="data bg-white rounded-lg p-4 mt-8">
            <div className="flex justify-between">
              <p className="text-sm">
                Show{" "}
                <span>
                  <input
                    type="number"
                    id="entries"
                    min={10}
                    max={20}
                    value={10}
                    className="border rounded p-1"
                  />{" "}
                  entries
                </span>
              </p>
              <label htmlFor="search">
                Search: <input type="text" className="border rounded p-1" />
              </label>
            </div>
            <div className="table my-8 text-sm">
              <table className="table-fixed w-full border rounded-lg border-none">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Details</th>
                    <th className="border p-2">Property Code</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="p-2">1</td>
                    <td className="p-2">Rental Property 5wk</td>
                    <td className="p-2">Rental</td>
                    <td className="p-2">Rental Property 5wk, Faislabad</td>
                    <td className="p-2">PR-01</td>
                    <td className="flex gap-2 p-2 justify-center items-center">
                      <Link href={"../adminPanel/properties/editProperty"}>
                        <FaRegPenToSquare className="text-green-400 text-lg font-bold cursor-pointer" />
                      </Link>
                      <RiDeleteBin6Line
                        className="text-red-400 text-lg font-bold cursor-pointer"
                        onClick={handleClick}
                      />
                    </td>
                  </tr>
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

export default List;
