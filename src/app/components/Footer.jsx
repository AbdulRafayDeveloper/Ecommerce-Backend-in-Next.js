import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between text-gray-400 m-4 flex-col text-center lg:flex-row">
        <p>
          &copy; 2024 RedBrick.Co under XYZ.v.3{" "}
          <span className="text-[#006d77]">Lisence</span>
        </p>
        <p className="text-center">All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
