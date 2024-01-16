import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import table1 from "../assets/one.svg";
import table3 from "../assets/three.svg";
import table5 from "../assets/six.svg";

import { Context } from "../Utilities/Context";
import "../Dashboard/Tables.sass";

const Tables = () => {
  const {
    user,
    setuser,
    id,
    setid,
    errorMessage,
    successMessage,
    page,
    setpage,
  } = useContext(Context);

  const db = getFirestore();

  const [tableTypes, setTableTypes] = useState([]);

  const options3 = [
    { value: "Round Indoor table", label: "Round Indoor table", class: 1},
    { value: "Round Outdoor table", label: "Round Outdoor table", class: 4},
    { value: "Square Indoor table", label: "Square Indoor table", class: 2},
    { value: "Square Outdoor table", label: "Square Outdoor table", class: 5},
    { value: "Rectangle Outdoor table", label: "Rectangle Outdoor table", class: 6},
    { value: "Rectangle Indoor table", label: "Rectangle Indoor table", class: 3},
  ];

  useEffect(() => {
    // Reference to the user's document in Firestore
    const restaurantDocRef = collection(db, "tables");

    const query3 = query(restaurantDocRef, where("restaurant_id", "==", id));

    let type_one = 0;
    let type_two = 0;
    let type_three = 0;
    let type_four = 0;
    let type_five = 0;
    let type_six = 0;

    getDocs(query3)
      .then((querySnapshot1) => {
        if (!querySnapshot1.empty) {
          let tableData = [];
          querySnapshot1.forEach((doc) => {
            tableData.push(doc.data());
            if (doc.data().tableClass == 1) {
              type_one++;
            } else if (doc.data().tableClass == 2) {
              type_two++;
            } else if (doc.data().tableClass == 3) {
              type_three++;
            } else if (doc.data().tableClass == 4) {
              type_four++;
            } else if (doc.data().tableClass == 5) {
              type_five++;
            } else if (doc.data().tableClass == 6) {
              type_six++;
            }
          });

          tableData = [
            type_one,
            type_two,
            type_three,
            type_four,
            type_five,
            type_six,
          ];
          setTableTypes(tableData);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting company data:", error);
      });
  }, [id]);

  return (
    <div className="the_table">
      <div className="tables_content">
        <div className="table_heading">{user}</div>
        <div className="table_sub_heading">
          <div className="the_subheading">Available tables</div>
          <div className="heading_option">Add Table</div>
        </div>
        <em className="table_note">
          To mark a table as unavailable, click on the preferred table and
          confirm your action.
        </em>
        <div className="table_cards">
          {tableTypes
            .filter((item) => item !== 0) // Filter out elements with a value of 0
            .map((item, index) => {
              let tableIcon = null;

              switch (index) {
                case 5:
                case 2:
                  tableIcon = (
                    <img
                      src={table5}
                      alt="table_icon"
                      className="table_icons"
                    />
                  );
                  break;
                case 0:
                case 3:
                  tableIcon = (
                    <img
                      src={table1}
                      alt="table_icon"
                      className="table_icons"
                    />
                  );
                  break;
                case 4:
                case 1:
                  tableIcon = (
                    <img
                      src={table3}
                      alt="table_icon"
                      className="table_icons"
                    />
                  );
                  break;
                default:
                  tableIcon = null;
                  break;
              }

              return (
                <div key={item.tableId} className="tables_tab">
                  {tableIcon}
                  <div className="table_card_dets">
                    <span className="card_head">{options3[index].value}</span>
                    <span className="card_exp">
                      {item} available tables
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Tables;
