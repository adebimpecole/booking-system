import React, { useState, useContext } from "react";
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

import "./Auth.sass";
import { Context } from "../Utilities/Context";

import table1 from "../assets/one.svg";
import table3 from "../assets/three.svg";
import table5 from "../assets/six.svg";
import check from "../assets/check.svg";

const SetUp = () => {
  const db = getFirestore();

  const navigate = useNavigate();

  let { user, setuser, id, setid } = useContext(Context);

  const [activeElements, setActiveElements] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [getPrice, setPrice] = useState("");

  const items = [
    {
      id: 1,
      head: "Round Indoor table",
      body: "A round table set indoors",
      img: table1,
      tag: "RNDI_"
    },
    {
      id: 2,
      head: "Square Indoor table",
      body: "A square table set indoors",
      img: table3,
      tag: "SQRI_"
    },
    {
      id: 3,
      head: "Rectangle Indoor table",
      body: "A rectangular table set indoors",
      img: table5,
      tag: "RECI_"
    },
    {
      id: 4,
      head: "Round Outdoor table",
      body: "A round table set outside",
      img: table1,
      tag: "RNDO_"
    },
    {
      id: 5,
      head: "Square Outdoor table",
      body: "A square table set outside",
      img: table3,
      tag: "SQRO_"
    },
    {
      id: 6,
      head: "Rectangle Outdoor table",
      body: "A rectangular table set outside",
      img: table5,
      tag: "RECO_"
    },
  ];

  const handleClick = (id) => {
    const isActive = activeElements.some((arr) => id === arr.the_id);

    if (isActive) {
      setActiveElements(activeElements.filter((item) => item.the_class !== id));
    } else {
      const newItem = {
        the_class: id,
        the_head: `${items[id - 1].head}`,
        the_amount: "",
        tag: `${items[id - 1].tag}`,
        availability: "true"
      };
      setActiveElements([...activeElements, newItem]);
    }
  };

  // opens and closes the modal
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  // sets the amount of input on change
  const setAmount = (id, value) => {
    setActiveElements((prevItems) =>
      prevItems.map((item) =>
        item.the_class === id ? { ...item, the_amount: value } : item
      )
    );
  };



  //   collects the price per seat
  const updatedData = {
    price_per_seat: getPrice,
  };

  // checks if any field is empty and submits the information to the database
  const Finish = async () => {
    const hasEmptyIdField = activeElements.some(
      (item) => item.the_amount === ""
    );
    const hasEmptyPriceField = activeElements.some(
      (item) => item.the_money === ""
    );

    if (hasEmptyIdField && hasEmptyPriceField) {
      console.log(true);
    } else {
      try {
        // Add the restaurants name to Firestore
        const collectionRef = collection(db, "tables");
        // creates a new doecument for each active table
        activeElements.forEach(async (object) => {
          console.log(object)

          for(let i = 0; i < object.the_amount; i++){
            await addDoc(collectionRef, {
              restaurant_id: id,
              tableId: object.tag + String(i),
              tableClass: object.the_class,
              tableType: object.the_head,
              tableNumber: object.the_amount,
              tableAvailability: object.availability,
            });
          }
        });

        // storing the price per seat in the restaurants database

        const priceCollectionRef = collection(db, "restaurant");

        const q = query(priceCollectionRef, where("userId", "==", id));

        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((docSnap) => {

              // Found a document that matches the criteria
              const docRef = doc(db, "restaurant", docSnap.id);

              // Update the specific document field
              updateDoc(docRef, {
                price_per_table: `${getPrice}`,
              })
                .then(() => {
                  console.log("Document successfully updated!");
                })
                .catch((error) => {
                  console.error("Error updating document: ", error);
                });
            });
          })
          .catch((error) => {
            console.error("Error querying Firestore:", error);
          });
        navigate("/dash");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // Handle registration errors
      }
    }
  };

  return (
    <div className="Setup">
      <div className="set_table">
        <div className="set_head">
          <h2 className="set_name">Select your table type</h2>
          <div className="lil_exp">
            Tailor your reservation options to match your restaurants seating
            layout and enhance the booking experience
          </div>
        </div>
        <div className="table_cards">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`tables_tab ${
                activeElements.some((arr) => arr.the_class === item.id)
                  ? "selected_tab"
                  : ""
              }`}
            >
              <img src={item.img} alt="table_icon" className="table_icons" />
              <div className="table_card_dets">
                <span className="card_head">{item.head}</span>
                <span className="card_exp">{item.body}</span>
              </div>
              <span className="good">
                <img src={check} alt="good" />
              </span>
            </div>
          ))}
        </div>
        <div className="move_on">
          <span className="next_button" onClick={openModal}>
            {" "}
            next
          </span>
        </div>
      </div>
      <div className={`overlay_tab ${modalIsOpen ? "modal" : ""}`}>
        <div className="set_table_no">
          <span className="code_arrow" onClick={closeModal}>
            &#8592; <span>Back</span>
          </span>
          <div className="select_head">Selection Summary</div>
          <div className="select_note">
            Please fill in the following fields with the required information
            your restaurant.
          </div>
          <div className="selection">
            <label className="real_Deal">
              Price per seat:
              <input
                type="text"
                placeholder="$"
                className="logged"
                value={getPrice}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <div className="tables_Selected">tables</div>
            <div className="selected">
              {activeElements.map((item, index) => (
                <div className="summary_tab" key={index}>
                  <div className="sum_header">
                    <span className="summary_head">Table card</span>
                    <span
                      className="close_code"
                      onClick={() => handleClick(item.the_class)}
                    >
                      &#9747;
                    </span>
                  </div>
                  <label>
                    Table type:
                    <span className="summary_name">{item.the_head}</span>
                  </label>
                  <label>
                    Table number:
                    <input
                      type="text"
                      placeholder="no. of tables"
                      value={item.the_amount}
                      className="logged"
                      onChange={(e) => setAmount(item.the_class, e.target.value)}
                    />
                  </label>
                </div>
              ))}
            </div>
            <div className="finish_button" onClick={Finish}>
              Finish
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetUp;
