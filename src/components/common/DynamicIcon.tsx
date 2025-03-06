import React from "react";
import * as MuiIcons from "@mui/icons-material";

type IconProps = {
  iconName: string;
  [key: string]: any;
};

const DynamicIcon: React.FC<IconProps> = ({ iconName, ...props }) => {
  const IconComponent = (MuiIcons as any)[iconName];

  return <IconComponent {...props} />;

  // iconNames from - https://mui.com/material-ui/material-icons/
};

export default DynamicIcon;
