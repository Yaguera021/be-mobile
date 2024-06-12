import { Employees } from "../types/Employees";

const fetchEmployees = async (): Promise<Employees[]> => {
  try {
    const response = await fetch("http://localhost:3000/employees");
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data: Employees[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

export { fetchEmployees };
