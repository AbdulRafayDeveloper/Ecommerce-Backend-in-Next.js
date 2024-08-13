import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Sidebar from "@/app/components/Sidebar";
import TopCards from "@/app/components/TopCards";
import BarChart from "@/app/components/BarChart";
import RecentOrders from "@/app/components/RecentOrders";
import Analysis from "@/app/components/AnalysisChart";

const dashboard = () => {
  return (
    <div>
      <Sidebar>
        <Header />
        <TopCards />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart />
          <RecentOrders />
          <Analysis />
        </div>
        <Footer />
      </Sidebar>
    </div>
  );
};

export default dashboard;
