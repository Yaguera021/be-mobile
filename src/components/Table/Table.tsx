import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useEmployees } from "../../hooks/employeeHooks";
import { formatDate, formatPhoneNumber } from "../../utils/formatFunctions";
import { debounce } from "../../utils/debounce";

import ellipse from "../../assets/ellipse.svg";
import aDown from "../../assets/arrow-down.svg";
import aUp from "../../assets/arrow-up.svg";

import "./Table.scss";
import SearchBar from "../SearchBar/SearchBar";

const Table: React.FC = () => {
  const { allEmployees, filteredEmployees } = useEmployees();
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const employeesToDisplay = useMemo(() => {
    return filteredEmployees.length > 0 ? filteredEmployees : allEmployees;
  }, [allEmployees, filteredEmployees]);

  const handleResize = useCallback(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    const debouncedHandleResize = debounce(handleResize, 200);

    handleResize();
    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [handleResize]);

  const toggleRow = useCallback((id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  }, []);

  return (
    <>
      <div className='top-wrapper'>
        <h4>Funcionários</h4>
        <SearchBar />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th className='th-photo'>Foto</th>
            <th className='th-name'>Nome</th>
            {isDesktop ? (
              <>
                <th className='th-job'>Cargo</th>
                <th className='th-data'>Data de admissão</th>
                <th className='th-cellphone'>Telefone</th>
              </>
            ) : (
              <th className='th-ellipse'>
                <img className='ellipse' src={ellipse} alt='' />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {employeesToDisplay.map((employee) => (
            <React.Fragment key={employee.id}>
              <tr>
                <td className='tb-td-image'>
                  <img src={employee.image} alt={employee.name} />
                </td>
                <td className='tb-td-name'>{employee.name}</td>
                {isDesktop ? (
                  <>
                    <td className='tb-job'>{employee.job}</td>
                    <td className='tb-data'>
                      {formatDate(employee.admission_date)}
                    </td>
                    <td className='tb-cellphone'>
                      {formatPhoneNumber(employee.phone)}
                    </td>
                  </>
                ) : (
                  <td className='tb-td-button'>
                    <button
                      onClick={() => toggleRow(Number(employee.id))}
                      aria-expanded={expandedRows.includes(Number(employee.id))}
                    >
                      {expandedRows.includes(Number(employee.id)) ? (
                        <img src={aUp} alt='arrow-up' />
                      ) : (
                        <img src={aDown} alt='arrow-down' />
                      )}
                    </button>
                  </td>
                )}
              </tr>
              {!isDesktop && expandedRows.includes(Number(employee.id)) && (
                <tr className='expanded-items expanded'>
                  <td colSpan={5}>
                    <div className='details'>
                      <p>
                        <strong>Cargo</strong>
                        <span>{employee.job}</span>
                      </p>
                      <p>
                        <strong>Data de admissão</strong>{" "}
                        <span>{formatDate(employee.admission_date)}</span>
                      </p>
                      <p>
                        <strong>Telefone</strong>
                        <span>{formatPhoneNumber(employee.phone)}</span>
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
