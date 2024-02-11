import React, { useState } from "react";
import OrderList from "./OrderList";
import AddOrderForm from "./AddOrderForm";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("orders");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "orders":
        return <OrderList />;
      case "addProduct":
        return <AddOrderForm />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto py-10 px-4">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold mr-4">Admin Dashboard</h2>
      </div>
      <div className="flex mb-4">
        <button
          className={`mr-4 ${selectedTab === "orders" ? "border-b-2 border-slate-900" : ""}`}
          onClick={() => setSelectedTab("orders")}
        >
          Orders
        </button>
        <button
          className={`mr-4 ${selectedTab === "addProduct" ? "border-b-2 border-slate-900" : ""}`}
          onClick={() => setSelectedTab("addProduct")}
        >
          Add Product
        </button>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
