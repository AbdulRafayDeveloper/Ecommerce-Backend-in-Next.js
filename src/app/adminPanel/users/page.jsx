"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegPenToSquare, FaDownload } from "react-icons/fa6";

import Swal from "sweetalert2";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import axios from "axios";

const listUsers = () => {
  const [users, setUsers] = useState([]);
  const [entries, setEntries] = useState(12);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`/api/users`);
        setUsers(response.data.result);
      } catch (error) {
        alert("Records not found");
      }
    };
    fetchRecords();
  }, []);

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue >= 10 && newValue <= 20) {
      setEntries(newValue);
    }
  };

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
        await axios.delete(`/api/users/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was a problem deleting the user.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <Sidebar>
        <Header />
        <div className="data p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-100 h-screen">
          <h1 className="text-xl sm:text-2xl my-1">Users</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h3 className="text-sm">
              Dashboard{" "}
              <span className="text-gray-400">/ Registered Users </span>
            </h3>
          </div>

          <div className="data bg-white rounded-lg p-4 mt-24">
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

            <div class="relative overflow-x-auto my-4">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-center text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="bg-slate-100">
                    <th className="border p-2">Sr#</th>
                    <th className="border p-2">name</th>
                    <th className="border p-2">email</th>
                    <th className="border p-2">actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="text-center">1</td>
                    <td className="text-center">Kashmala</td>
                    <td className="text-center">
                      itskashmalahere1010@gmail.com
                    </td>
                    <td className="flex gap-2 p-2 justify-center items-center">
                      <FaRegPenToSquare className="text-green-400 text-lg font-bold cursor-pointer" />
                      <RiDeleteBin6Line
                        className="text-red-400 text-lg font-bold cursor-pointer"
                        onClick={() => handleDeletion(element.id)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-4 text-sm">
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
        <Footer className="bg-gray-100" />
      </Sidebar>
    </>
  );
};

export default listUsers;
