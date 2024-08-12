"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { RiPieChart2Fill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { CiMenuKebab } from "react-icons/ci";
import CountUp from "react-countup";

const TopCards = () => {
  return (
    <>
      <div className="grid lg:grid-cols-5 gap-7 p-4 ">
        <div className="lg:col-span-3 col-span-1 flex flex-col lg:flex-row justify-between bg-white w-full p-4 rounded-lg">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-[#006d77] font-bold text-xl lg:text-2xl">
              Congratulations John! 🎉
            </h1>
            <p className="my-3 text-sm lg:text-base">
              You have done 25% more sales today. <br /> Check your new rising
              badge in your profile.
            </p>
            <Button
              variant="outlined"
              className="mb-4 text-[#006d77]"
              startIcon={<MonetizationOnOutlinedIcon />}
            >
              Claim your Badges
            </Button>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src={"/images/john.jpg"}
              alt="image"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="lg:col-span-2 col-span-2 justify-between bg-white w-full p-4 rounded-lg space-y-3 hover:scale-105 transition duration-150">
            <p className="flex justify-between gap-6">
              <RiPieChart2Fill className="text-[#006d77] bg-green-200 p-2 size-10 rounded-lg" />
              <CiMenuKebab className="size-5" />
            </p>
            <p className="text-gray-300">Profit</p>
            <h2 className="font-medium text-xl">
              $
              <CountUp start={100} end={7200} delay={0} />
            </h2>
            <span className="text-green-500 text-lg">+72.8%</span>
          </div>
          <div className="lg:col-span-1 col-span-1 justify-between bg-white w-full p-4 rounded-lg space-y-3 hover:scale-105 transition duration-150">
            <p className="flex justify-between gap-6">
              <IoWallet className="text-pink-500 bg-pink-100 p-2 size-10 rounded-lg" />
              <CiMenuKebab className="size-5" />
            </p>
            <p className="text-gray-300">Sales</p>
            <h2 className="font-medium text-xl">
              $
              <CountUp start={0} end={4728} delay={0} />
            </h2>
            <span className="text-green-500 text-lg">+28.82%</span>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 gap-4 p-4">
        <div className="lg:col-span-2 col-span-1 flex justify-between bg-white w-full p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">
              $
              <CountUp start={0} end={7846} delay={0} />
            </p>
            <p className="text-gray-600">Daily Revenue</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
            <span className="text-green-700 text-lg">+18%</span>
          </p>
        </div>
        <div className="lg:col-span-2 col-span-1 flex justify-between bg-white w-full p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">
              $
              <CountUp start={0} end={14846} delay={0} />
            </p>
            <p className="text-gray-600">YTD Revenue</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
            <span className="text-green-700 text-lg">+10%</span>
          </p>
        </div>
        <div className="flex justify-between bg-white w-full p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">
              $
              <CountUp start={0} end={9000} delay={0} />
            </p>
            <p className="text-gray-600">Customers</p>
          </div>
          <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
            <span className="text-green-700 text-lg">+20%</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default TopCards;
