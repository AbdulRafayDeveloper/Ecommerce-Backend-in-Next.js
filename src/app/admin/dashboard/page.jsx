import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Sidebar from "@/app/components/Sidebar";
import TopCards from "@/app/components/TopCards";
import BarChart from "@/app/components/BarChart";
import RecentOrders from "@/app/components/RecentOrders";
import Analysis from "@/app/components/AnalysisChart";
import { Roboto } from "next/font/google";

const inter = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const dashboard = () => {
  return (
    <div className={inter.className}>
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
