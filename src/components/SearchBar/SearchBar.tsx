/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useEmployees } from "../../hooks/employeeHooks";
import {
  cleanPhoneNumber,
  normalizeSearch,
  removeAccents,
} from "../../utils/formatFunctions";

import "./SearchBar.scss";

const SearchBar: React.FC = () => {
  const { allEmployees, setFilteredEmployees } = useEmployees();
  const [search, setSearch] = useState("");

  const normalizedSearch = normalizeSearch(search);

  const filteredEmployees = allEmployees.filter((employee) => {
    const normalizedName = removeAccents(employee.name.toLowerCase());
    const normalizedRole = removeAccents(employee.job.toLowerCase());
    const formattedPhone = cleanPhoneNumber(employee.phone);
    return (
      normalizedName.includes(normalizedSearch) ||
      normalizedRole.includes(normalizedSearch) ||
      formattedPhone.includes(normalizedSearch)
    );
  });

  useEffect(() => {
    setFilteredEmployees(search ? filteredEmployees : []);
  }, [search]);

  return (
    <div className='input-container'>
      <input
        type='text'
        placeholder='Pesquisar'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        name='search'
      />
    </div>
  );
};

const MemoizedSearchBar = React.memo(SearchBar);

export default MemoizedSearchBar;
