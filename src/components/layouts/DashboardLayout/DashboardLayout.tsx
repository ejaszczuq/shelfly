import React from "react";

import { IChildren } from "@src/types/IChildren.types";

import Navbar from "@src/components/layouts/shared/Navbar/Navbar";

import "./DashboardLayout.scss";

const DashboardLayout = ({ children }: IChildren) => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-layout__navbar">
        <Navbar />
      </div>

      <div className="dashboard-layout__main">{children}</div>
    </div>
  );
};

export default DashboardLayout;
