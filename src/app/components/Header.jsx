"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import { FiMoon } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div className="header flex justify-between px-4 pt-4 bg-[#006d77]">
      <Image
        src={"/images/Landmark.png"}
        alt="logo"
        width={150}
        height={300}
      ></Image>
      <div
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        className="relative cursor-pointer justify-end mr-6"
      >
        {/* Rounded Profile Image */}
        <div className="flex text-white gap-4">
          <IoLogoGithub className="mt-3 size-4" />
          <IoNotifications className="mt-3 size-4" />
          <FiMoon className="mt-3 size-4" />
          <div style={{ borderRadius: "50%", overflow: "hidden" }}>
            <Image
              src="/images/profile-pic.png"
              alt="Admin Profile Photo"
              width={50}
              height={50}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownVisible && (
          <div
            className="rounded-xl"
            style={{
              position: "absolute",
              right: 0,
              backgroundColor: "#f9f9f9",
              minWidth: "160px",
              boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
              zIndex: 1,
            }}
          >
            <a
              href="#"
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex gap-2 mx-2 my-2">
                <p>Logout</p>
                {/* Assuming LogoutOutlined is imported correctly */}
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
