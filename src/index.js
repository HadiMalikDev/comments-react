import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import data from "./data.json";
const root = ReactDOM.createRoot(document.getElementById("root"));

localStorage.setItem("username", data.currentUser.username);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
