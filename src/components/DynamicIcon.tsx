import React from "react";
import * as MuiIcons from "@mui/icons-material";

type IconProps = {
  iconName: string;
  [key: string]: any; 
};

const DynamicIcon: React.FC<IconProps> = ({ iconName, ...props }) => {
  
  const IconComponent = (MuiIcons as any)[iconName];

  if (!IconComponent) {
    return <span>Ikona nieznaleziona</span>;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
