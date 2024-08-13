"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  IoNotifications,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotify, setIsNotify] = useState(false);

  const accountDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      accountDropdownRef.current &&
      !accountDropdownRef.current.contains(event.target) &&
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsNotify(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header flex justify-between px-4 py-2 bg-[#006d77]">
      <Image src={"/images/Landmark.png"} alt="logo" width={150} height={150} />
      <div className="flex text-white gap-4 justify-center items-center my-1">
        <div className="relative">
          <a
            href="#"
            class="dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <IoNotifications
              onClick={() => {
                setIsNotify(!isNotify);
                setIsOpen(false);
              }}
              className="text-xl cursor-pointer "
            />
            {isNotify && (
              <div
                ref={notificationDropdownRef}
                className="absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform translate-y-4"
              >
                <div className="relative py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                    {/* <!-- Header --> */}
                    <div class="text-center">
                      <div className="text-white bg-[#006d77] py-1">
                        Notifications
                      </div>
                    </div>
                    {/* <!-- Notification Item --> */}
                    <div class="flex items-center p-4 border-b">
                      <div class="mr-4">
                        <IoNotifications />
                      </div>
                      <div>
                        <p class="font-semibold">John Doe</p>
                        <p class="text-gray-600 text-sm">
                          You have a new message
                        </p>
                      </div>
                    </div>

                    {/* <!-- Another Notification Item --> */}
                    <div class="flex items-center p-4 border-b">
                      <div class="mr-4">
                        <IoIosLogOut />
                      </div>
                      <div>
                        <p class="font-semibold">Jane Smith</p>
                        <p class="text-gray-600 text-sm">
                          Your order has been shipped
                        </p>
                      </div>
                    </div>

                    {/* <!-- Footer --> */}
                    <div class="p-4 text-center">
                      <button class="text-blue-600 hover:underline">
                        See All Notifications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div class="notify">
              <span class="heartbit"></span> <span class="point"></span>{" "}
            </div>
          </a>
        </div>

        <div className="relative">
          <div
            onClick={() => {
              setIsOpen(!isOpen);
              setIsNotify(false); // Ensure the notification dropdown is closed
            }}
            className="cursor-pointer"
          >
            <div style={{ borderRadius: "50%", overflow: "hidden" }}>
              <Image
                src="/images/profile-pic.png"
                alt="Admin Profile Photo"
                width={40}
                height={40}
              />
            </div>
          </div>

          {isOpen && (
            <div
              ref={accountDropdownRef}
              className="absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform translate-y-[20%]"
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                  My Account
                </div>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <IoPersonOutline className="mr-2" />
                  <p>Profile</p>
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <IoSettingsOutline className="mr-2" />
                  <p>Settings</p>
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <IoIosLogOut className="mr-2" />
                  <p>Logout</p>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
