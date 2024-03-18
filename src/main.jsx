import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalUserProvider from "./components/context/UsersContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalUserProvider>
      <App />
    </GlobalUserProvider>
  </React.StrictMode>
);
