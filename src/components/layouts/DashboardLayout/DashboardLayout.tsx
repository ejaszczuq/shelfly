import React from "react";

import { IChildren } from "@src/types/IChildren.types";

import Navbar from "@src/components/layouts/shared/Navbar/Navbar";

import "./DashboardLayout.scss"
import ControlPanel from "@src/components/common/ControlPanel/ControlPanel";

const DashboardLayout = ({ children }: IChildren) => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-layout__navbar">
        <Navbar />
      </div>

      <div className="dashboard-layout__content">
        <div className="dashboard-layout__sidebar">
        <ControlPanel labelName="Filter by genres" />
        </div>

        <div className="dashboard-layout__main">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
