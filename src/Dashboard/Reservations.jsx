import React, { useContext, useState, useEffect, useMemo } from "react";
import Select from "react-select";

import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { format } from "date-fns";
import { Context } from "../Utilities/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./Reservations.sass";

const Reservations = () => {
  const {
    user,
    setuser,
    id,
    setid,
    errorMessage,
    successMessage,
    page,
    setpage,
    view,
  } = useContext(Context);

  const db = getFirestore();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedDepartment, setSelectedDepartment] = useState("Department");

  const options3 = [
    { value: "All", label: "All", class: 1 },
    { value: "Cancelled", label: "Cancelled", class: 4 },
    { value: "Pending", label: "Pending", class: 2 },
  ];

  // select tag styles
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      height: "3rem",
      background: "white",
      padding: "0 .3rem",
      fontSize: ".8rem",
      margin: ".5rem 0 0",
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "#f1f1f1" : "white",
      color: state.isSelected ? "#333" : "#666",
      fontSize: ".8rem",
    }),
  };

  // columns
  const COLUMNS = [
    {
      Header: "ID",
      accessor: "reservation_id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Time",
      accessor: "time",
    },
    {
      Header: "Date",
      accessor: (row) => {
        const convertedDate = new Date(row.date * 1000);
        const formattedDate = convertedDate.toLocaleDateString("en-GB");
        return `${formattedDate}`;
      },
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  // get requests
  useEffect(() => {
    setIsLoading(true);
    const userCollectionRef = collection(db, "reservations");
    const query4 = query(userCollectionRef, where("restaurant_id", "==", id));

    getDocs(query4)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const userData = [];
          querySnapshot.forEach((doc) => {
            userData.push(doc.data());
          });
          setData(userData);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const columns = useMemo(() => COLUMNS, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="reserve">
      <div className="reserve_content">
        <div className="reserve_heading">{user}</div>
        <div className="instruction">
          To change the status of a reservation, simply click on the
          reservation. Utilize provided filters to navigate through the table
          swiftly, and use the search bar to find a specific reservation ID with
          ease.
        </div>
        <div className="table_filters">
          <Select
              options={options3}
              styles={colourStyles}
              isSearchable={false}
              // onChange={(selectedOption) => {
              //   setSelectedNumber(selectedOption.value);
              //   setSelectedClass(selectedOption.class);
              // }}
            />
          <span className="page_title">
            <div>
              <input
                type="text"
                placeholder="Enter request ID..."
                // value={value}
                // onChange={handleSearch}
              />
              <FontAwesomeIcon
                className="search-icon"
                icon={faMagnifyingGlass}
                // onClick={filterUsers}
              />
            </div>
          </span>
        </div>
        <div className="reservation_table">
          <div className="table">
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              <>
                <table {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            className="description_head"
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                      prepareRow(row);
                      return (
                        <tr onClick={() => openRequest(row)} key={index}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="description_cell"
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
