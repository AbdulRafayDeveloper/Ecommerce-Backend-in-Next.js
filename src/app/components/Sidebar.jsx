"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // or 'next/navigation' if using app directory
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbCategoryPlus } from "react-icons/tb";
import {
  IoGridOutline,
  IoPersonAddOutline,
  IoAnalyticsSharp,
} from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { FaUserShield } from "react-icons/fa6";
import { BsBoxes, BsCartCheck } from "react-icons/bs";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const currentPath = router.pathname;

  const menus = [
    {
      name: "Overview",
      link: "../adminPanel/dashboard",
      icon: LuLayoutDashboard,
    },
    { name: "Users", link: "../adminPanel/signedUsers", icon: FaUserShield },
    {
      name: "Products",
      link: "../adminPanel/products",
      icon: BsBoxes,
    },
    {
      name: "Categories",
      link: "../adminPanel/categories",
      icon: TbCategoryPlus,
    },
    {
      name: "Sub-Categories",
      link: "../adminPanel/sub-categories",
      icon: MdOutlineCategory,
    },
    {
      name: "Customers",
      link: "../adminPanel/customers",
      icon: IoPersonAddOutline,
    },
    { name: "Orders", link: "../adminPanel/orders", icon: BsCartCheck },
    {
      name: "Analytics",
      link: "../adminPanel/analytics",
      icon: IoAnalyticsSharp,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpen(false);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      setOpen(!open);
    }
  };

  return (
    <div className="flex">
      <div
        className={`sidebar sticky top-0 h-screen max-h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between overflow-hidden ${
          open ? "w-56" : "w-20"
        } duration-500`}
      >
        <div className="flex flex-col items-center">
          <div
            className={`bg-[#006d77] text-white p-3 rounded-lg flex gap-2 items-center ${
              isMobile ? "cursor-default" : "cursor-pointer"
            }`}
            onClick={toggleSidebar}
          >
            <GiHamburgerMenu
              size={20}
              className={`${
                open ? "flex justify-center items-center" : "font-bold"
              }`}
            />
            <Link href="/">
              <h2
                className={`whitespace-pre duration-500 ${
                  open ? "visible" : "hidden"
                }`}
              >
                Admin Panel
              </h2>
            </Link>
          </div>
          <span className="border-b-[1px] w-full p-2 border-gray-200"></span>
          <div className="flex flex-col items-center w-full">
            <div
              className={`bg-white cursor-pointer p-3 rounded-lg inline-block ${
                open ? "w-full" : "w-20"
              } duration-500`}
            >
              <div className="options space-y-1 cursor-pointer flex flex-col gap-3 relative">
                {menus?.map((menu, i) => (
                  <Link
                    href={menu.link}
                    key={i}
                    className={`${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm gap-3.5 py-2 px-3 hover:bg-[#edf6f9] hover:text-black ${
                      currentPath === menu.link && "bg-[#edf6f9]"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {React.createElement(menu.icon, {
                        size: "23",
                        color: "#006d77",
                      })}
                    </div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu.name}
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-4 group-hover:duration-300 group-hover:w-fit z-10`}
                    >
                      {menu.name}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
