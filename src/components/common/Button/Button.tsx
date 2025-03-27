import React from "react";

import "./Button.scss";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "primary-with-arrow" | "secondary";
  children: React.ReactNode;
}

const Button: React.FC<IButton> = ({ variant, children, className = "", ...rest }) => {
  return (
    <button className={`${variant}-button ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
