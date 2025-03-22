import React from "react";

import { IChildren } from "@src/types/IChildren.types";

import "./BaseLayout.scss";

const BaseLayout = ({ children }: IChildren) => {
  return <div className="base-layout">{children}</div>;
};

export default BaseLayout;
