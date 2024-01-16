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

const SetTables = () => {
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

  const items = [table1, table3, table5];
  const [editTable, setEditTable] = useState(false);
  useEffect(() => {
    // Reference to the user's document in Firestore
    const restaurantDocRef = collection(db, "tables");

    const query3 = query(restaurantDocRef, where("restaurant_id", "==", id));

    getDocs(query3)
      .then((querySnapshot1) => {
        if (!querySnapshot1.empty) {
          const tableData = [];
          querySnapshot1.forEach((doc) => {
            tableData.push(doc.data());
          });
          setTableTypes(tableData);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting company data:", error);
      });
  }, []);
  useEffect(() => {
    console.log(tableTypes);
  }, [tableTypes]);

  return (
    <div className="set_profile">
      <div className="section_header">Tables Information</div>
      <span className="settings_info">
        Your restaurants tables and information
      </span>
      <div className="set_section">
        <div className="setting_tab">
          <div className="tab_title">
            Available Tables{" "}
            <div className="add_table">
              <span>+</span> Add Table
            </div>
          </div>
          <div className={`set_table_cards ${editTable ? "hide" : "show"}`}>
            {tableTypes.map((item, index) => {
              let tableIcon = null;

              switch (item.tableId) {
                case 6:
                case 3:
                  tableIcon = (
                    <img
                      src={table5}
                      alt="table_icon"
                      className="set_table_icons"
                    />
                  );
                  break;
                case 1:
                case 4:
                  tableIcon = (
                    <img
                      src={table1}
                      alt="table_icon"
                      className="set_table_icons"
                    />
                  );
                  break;
                case 5:
                case 2:
                  tableIcon = (
                    <img
                      src={table3}
                      alt="table_icon"
                      className="set_table_icons"
                    />
                  );
                  break;
                default:
                  tableIcon = null;
                  break;
              }

              return (
                <div key={item.tableId} className="set_tables_tab">
                  {tableIcon}
                  <div className="set_table_card_dets">
                    <span className="card_head">{item.tableType}</span>
                    <span className="card_exp">
                      {item.tableNumber} available tables
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`the_cards ${editTable ? "show" : "hide"}`}>
            <span className="lil_note">
              Enter the number of tables for each table type
            </span>
            <div className=" set_table_cards">
              {tableTypes.map((item, index) => {
                let tableIcon = null;

                switch (item.tableId) {
                  case 6:
                  case 3:
                    tableIcon = (
                      <img
                        src={table5}
                        alt="table_icon"
                        className="set_table_icons"
                      />
                    );
                    break;
                  case 1:
                  case 4:
                    tableIcon = (
                      <img
                        src={table1}
                        alt="table_icon"
                        className="set_table_icons"
                      />
                    );
                    break;
                  case 5:
                  case 2:
                    tableIcon = (
                      <img
                        src={table3}
                        alt="table_icon"
                        className="set_table_icons"
                      />
                    );
                    break;
                  default:
                    tableIcon = null;
                    break;
                }

                return (
                  <div key={item.tableId} className="set_tables_tab">
                    {tableIcon}
                    <div className="set_table_card_dets">
                      <span className="card_head">{item.tableType}</span>
                      <span className="card_exp">
                        Amount:
                      <input type="text" className="set_input" value={item.tableNumber}/>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {editTable ? (
            <div className="button_div">
              <div
                className="change_button save_button"
                onClick={() => setEditTable(true)}
              >
                Save
              </div>
              <div
                className="change_button"
                onClick={() => setEditTable(false)}
              >
                Cancel
              </div>
            </div>
          ) : (
            <div className="change_button" onClick={() => setEditTable(true)}>
              Edit Table information
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetTables;
