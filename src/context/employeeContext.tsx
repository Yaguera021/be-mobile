import { createContext, ReactNode, useEffect, useState } from "react";
import { fetchEmployees } from "../services/fetchAPI";
import { Employees } from "../types/Employees";

interface EmployeeContextType {
  allEmployees: Employees[];
  filteredEmployees: Employees[];
  setFilteredEmployees: (employees: Employees[]) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined,
);

interface EmployeeProviderProps {
  children: ReactNode;
}

const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
  const [allEmployees, setAllEmployees] = useState<Employees[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employees[]>([]);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setAllEmployees(data);
    };
    getEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{ allEmployees, filteredEmployees, setFilteredEmployees }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
