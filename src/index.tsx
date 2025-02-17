import React from "react";
import ReactDOM from "react-dom/client";

import App from "./views/App";

const rootElement = document.getElementById("root");
const ReactRoot = ReactDOM.createRoot(rootElement!);

ReactRoot.render(<App />);
