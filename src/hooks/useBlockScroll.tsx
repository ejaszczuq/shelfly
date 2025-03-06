import { useState } from "react";

const useBlockScroll = () => {
  const [isLocked, setIsLocked] = useState(false);

  const lock = () => {
    document.body.style.overflow = "hidden";
    setIsLocked(true);
  };

  const unlock = () => {
    document.body.style.overflow = "";
    setIsLocked(false);
  };

  return { isLocked, lock, unlock };
};

export default useBlockScroll;
