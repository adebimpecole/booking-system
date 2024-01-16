import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
} from "firebase/firestore";

import "./Booking.sass";
import "../Authentication/Auth.sass";
import { Context } from "../Utilities/Context";

import emailjs from "@emailjs/browser";

import "./ConfirmBooking.sass";

const ConfirmBooking = (props) => {
  const db = getFirestore();

  const navigate = useNavigate();

  const {
    user,
    setuser,
    id,
    setid,
    confirmBooking,
    setConfirmBooking,
    bookingObj,
    setBookingObj,
  } = useContext(Context);

  const [getPrice, setPrice] = useState(0);

  useEffect(() => emailjs.init("pJ4MU-Zgp_kAYRle9"), []);

  useEffect(() => {
    console.log(id);
    // Reference to the user's document in Firestore
    const restaurantDocRef = collection(db, "restaurant");
    let query2;
    if (props.myProp) {
      console.log(props.myProp)
      query2 = query(restaurantDocRef, where("userId", "==", props.myProp));
    } else {
      query2 = query(restaurantDocRef, where("userId", "==", id));
    }
    getDocs(query2)
      .then((querySnapshot1) => {
        if (!querySnapshot1.empty) {
          // Retrieve the first document that matches the query from the 'users' collection
          const docSnapshot1 = querySnapshot1.docs[0];
          const restaurantData = docSnapshot1.data();
          setPrice(restaurantData.price_per_table);
        } else {
          console.log("No user found.");
        }
      })
      .catch((error) => {
        console.error("Error getting company data:", error);
      });
  }, [id]);

  // function that generates custom id for reservation
  function generateCustomId(prefix, length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let customId = prefix;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      customId += characters.charAt(randomIndex);
    }

    return customId;
  }

  const selectRandomAvailableTable = async (selectedClass) => {
    const availableTablesRef = collection(db, "tables");
    const query2 = query(
      availableTablesRef,
      where("tableClass", "==", selectedClass),
      where("tableAvailability", "==", "true")
    );

    try {
      const querySnapshot = await getDocs(query2);
      let availableTables = [];

      querySnapshot.forEach((doc) => {
        availableTables.push(doc.data().tableId);
      });
      // Randomly select a table from the available tables
      const randomlySelectedTableID =
        availableTables[Math.floor(Math.random() * availableTables.length)];
      return randomlySelectedTableID;
    } catch (error) {
      console.error("Error getting table data:", error);
      return null;
    }
  };

  // submits the information to the database
  const Finish = async () => {
    const serviceId = "service_t7s80jb";
    const templateId = "template_ny7koid";

    const customId = generateCustomId("RES_", 5);
    console.log(id);
    let pickedTable = await selectRandomAvailableTable(bookingObj.bookingClass);
    console.log(bookingObj.bookingClass);
    console.log(pickedTable);
    try {
      // Add the restaurants name to Firestore
      const collectionRef = collection(db, "reservations");
      // creates a new doecument for each active table

      await addDoc(collectionRef, {
        restaurant_id: id,
        reservation_id: customId,
        name: bookingObj.bookingName,
        email: bookingObj.bookingEmail,
        date: bookingObj.bookingDate,
        real_Date: bookingObj.bookingRealDate,
        time: bookingObj.bookingTime,
        no_of_seats: bookingObj.bookingSeats,
        total_paid: bookingObj.bookingSeats * getPrice,
        selectedTable: pickedTable,
        status: "pending",
      });

      await emailjs.send(serviceId, templateId, {
        user:
          bookingObj.bookingName.charAt(0).toUpperCase() +
          bookingObj.bookingName.slice(1),
        email: bookingObj.bookingEmail,
        date: bookingObj.bookingRealDate,
        time: bookingObj.bookingTime,
        id: customId,
        restaurant: user.charAt(0).toUpperCase() + user.slice(1),
      });

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // Handle registration errors
    }
    setBookingObj({});
    setConfirmBooking(false);
  };

  return (
    <div className="confirm_booking">
      {bookingObj ? (
        <div className="confirm_section">
          <h1 className="confirm_head">Confirm your booking</h1>
          <div className="confirm_text">
            <strong>Nt:</strong> Each booking is for a duration of 1hr 30
            minutes. We kindly ask that you arrive within [20 minutes] of your
            reservation time. <br />
            Failure to keep this will result in an unbooking of your reserved
            table
          </div>
          <div className="booking_container">
            <div className="container_head">Booking information</div>
            <div className="booking_information">
              <div className="booking_name">{bookingObj.bookingName}</div>
              <div className="the_email">{bookingObj.bookingEmail}</div>
              <div className="the_date">
                Date of reservation: <span>{bookingObj.bookingRealDate}</span>
              </div>
              <div className="the_time">
                Time of reservation: <span>{bookingObj.bookingTime}</span>
              </div>
            </div>
            <div className="booking_details">
              <div className="booking_table">
                <ul>
                  <li className="type_header">Type of table</li>
                  <li className="price_header">Price per seat</li>
                  <li className="seats_header">Seats</li>
                  <li className="total_header">Total price</li>
                </ul>
                <ul>
                  {getPrice !== 0 ? (
                    <>
                      <li>{bookingObj.bookingTable}</li>
                      <li>${getPrice}</li>
                      <li>{bookingObj.bookingSeats}</li>
                      <li>${bookingObj.bookingSeats * getPrice}</li>
                    </>
                  ) : (
                    <span></span>
                  )}
                </ul>
              </div>
            </div>
            <div className="book" onClick={Finish}>
              Finish
            </div>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default ConfirmBooking;
