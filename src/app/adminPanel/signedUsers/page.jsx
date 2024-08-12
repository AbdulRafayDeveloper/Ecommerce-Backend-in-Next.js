"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import axios from "axios";

const listUsers = () => {
  // Send API to list data from database!
  const [users, setUsers] = useState([]);

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

  const [entries, setEntries] = useState(12);
  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue >= 10 && newValue <= 20) {
      setEntries(newValue);
    }
  };

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
        await axios.delete(`/api/users/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Failed to delete:", error);
        Swal.fire({
          title: "Error!",
          text: "There was a problem deleting your file.",
          icon: "error",
        }); 
      }
    }
  };

  return (
    <>
      <Sidebar>
        <Header />
        <div className="p-12 bg-gray-100 h-screen">
          <h1 className="text-2xl">Users</h1>
          <div className="flex justify-between items-center">
            <h3 className="text-sm">
              Dashboard{" "}
              <span className="text-gray-400">/ Registered Users </span>
            </h3>
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
                    <th className="border p-2">id</th>
                    <th className="border p-2">name</th>
                    <th className="border p-2">email</th>
                    <th className="border p-2">role</th>
                    <th className="border p-2">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((element, index) => (
                      <tr key={index} className="border">
                        <td className="text-center">{element.id}</td>
                        <td className="text-center">{element.name}</td>
                        <td className="text-center">{element.email}</td>
                        <td className="text-center">{element.role}</td>
                        <td className="flex gap-2 p-2 justify-center items-center">
                          <RiDeleteBin6Line
                            className="text-red-400 text-lg font-bold cursor-pointer"
                            onClick={() => handleDeletion(element.id)}
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

export default listUsers;
