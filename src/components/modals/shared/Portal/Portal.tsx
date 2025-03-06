/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  onClick?: () => void;
}

function createWrapperAndAppendToBody(wrapperId: string, onClick: () => void) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  wrapperElement.addEventListener("click", onClick);
  return wrapperElement;
}

const Portal = ({ children, onClick = () => {} }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    let element = document.getElementById("overlay-default");
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody("overlay-default", onClick);
    }

    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.removeEventListener("click", onClick);
        element.parentNode.removeChild(element);
      }
    };
  }, []);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default Portal;
