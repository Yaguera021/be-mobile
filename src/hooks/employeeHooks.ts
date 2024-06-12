import { useContext } from "react";
import { EmployeeContext } from "../context/employeeContext";

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
};
