import React, { useState } from "react";

import { IChildren } from "@src/types/IChildren.types";
import Navbar from "@src/components/layouts/shared/Navbar/Navbar";
import ControlPanel from "@src/components/common/ControlPanel/ControlPanel";

import "./DashboardLayout.scss";
import { useTranslation } from "react-i18next";
import DynamicIcon from "@src/components/common/DynamicIcon";

const DashboardLayout = ({ children }: IChildren) => {
  const { t } = useTranslation(["common"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="dashboard-layout__content">
        <div className={`dashboard-layout__sidebar ${sidebarOpen ? "open" : ""}`}>
          <button
            className="dashboard-layout__toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <DynamicIcon iconName={"KeyboardArrowLeftTwoTone"}/> : <DynamicIcon iconName={"KeyboardArrowRightTwoTone"}/>}
          </button>

          <ControlPanel labelName={t("common:filterByGenres.title")} />
        </div>

        <div className="dashboard-layout__main">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
