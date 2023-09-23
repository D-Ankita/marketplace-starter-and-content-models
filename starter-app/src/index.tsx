import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "@contentstack/venus-components/build/main.css";

// This will enable mocking the data ony when REACT_APP_NODE_ENVIRONMENT is set as local_development.
if (process.env.REACT_APP_NODE_ENVIRONMENT === "local_development") {
  require("./mockedData/browser");
}

const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
