"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Analysis = () => {
  // Random data for Area Chart
  const areaChartData = Array.from({ length: 10 }, (_, i) => ({
    name: `Day ${i + 1}`,
    uv: Math.floor(Math.random() * 4000) + 1000,
    pv: Math.floor(Math.random() * 4000) + 1000,
  }));

  // Random data for Pie Chart
  const pieChartData = [
    { name: "Group A", value: Math.floor(Math.random() * 4000) + 1000 },
    { name: "Group B", value: Math.floor(Math.random() * 4000) + 1000 },
    { name: "Group C", value: Math.floor(Math.random() * 4000) + 1000 },
    { name: "Group D", value: Math.floor(Math.random() * 4000) + 1000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-[#006d77] font-bold text-xl md:text-2xl lg:text-3xl mb-8">
        Dashboard
      </h1>
      <div className="flex flex-col gap-8 w-[90vw] h-auto lg:flex-row lg:w-[70vw] lg:h-[100vh]">
        <div className="bg-white shadow-lg rounded-lg p-4 w-full lg:w-1/2 lg:h-2/3">
          <h2 className="text-lg font-semibold mb-4">Area Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 w-full lg:w-1/2 lg:h-2/3">
          <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
