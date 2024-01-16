import React, { useContext, useState, useEffect, useMemo } from "react";
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

import "./Reservations.sass";

const MiniTable = () => {
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
  );
};

export default MiniTable;
