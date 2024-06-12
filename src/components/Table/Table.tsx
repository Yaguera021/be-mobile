import React, { useEffect, useState } from "react";
import { useEmployees } from "../../hooks/employeeHooks";
import { formatDate, formatPhoneNumber } from "../../utils/formatFunctions";

import ellipse from "../../assets/ellipse.svg";
import aDown from "../../assets/arrow-down.svg";
import aUp from "../../assets/arrow-up.svg";

import "./Table.scss";
import SearchBar from "../SearchBar/SearchBar";

const Table: React.FC = () => {
  const { allEmployees, filteredEmployees } = useEmployees();
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleRow = (id: number) => {
    setExpandedRows(
      expandedRows.includes(id)
        ? expandedRows.filter((rowId) => rowId !== id)
        : [...expandedRows, id],
    );
  };

  return (
    <div className='table-wrapper'>
      <div className='top-wrapper'>
        <h4>Funcionários</h4>
        <SearchBar />
      </div>
      <div className='table-table-wrapper'></div>
      <table className='table'>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            {isDesktop ? (
              <>
                <th>Cargo</th>
                <th>Data de admissão</th>
                <th>Telefone</th>
              </>
            ) : (
              <th>
                <img className='ellipse' src={ellipse} alt='' />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {(filteredEmployees.length > 0
            ? filteredEmployees
            : allEmployees
          ).map((employee) => (
            <React.Fragment key={employee.id}>
              <tr>
                <td>
                  <img src={employee.image} alt={employee.name} />
                </td>
                <td>{employee.name}</td>
                {isDesktop && (
                  <>
                    <td>{employee.job}</td>
                    <td>{formatDate(employee.admission_date)}</td>
                    <td>{formatPhoneNumber(employee.phone)}</td>
                  </>
                )}
                {!isDesktop && (
                  <td>
                    <button onClick={() => toggleRow(Number(employee.id))}>
                      {expandedRows.includes(Number(employee.id)) ? (
                        <img src={aDown} alt='arrow-down' />
                      ) : (
                        <img src={aUp} alt='arrow-up' />
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
    </div>
  );
};

export default Table;
