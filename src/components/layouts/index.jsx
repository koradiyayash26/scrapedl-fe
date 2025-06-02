import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="">
      <nav>
        <Header />
      </nav>
      <main className="pb-8">
        <Outlet />
      </main>
    </div>
  );
};
