import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { EmployeeProvider } from "./context/employeeContext.tsx";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </React.StrictMode>,
);
