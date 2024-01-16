import React, {useContext, useState} from "react";

import { Context } from "../Utilities/Context";
import "./Cancel.sass";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Cancel = () => {
    let {
        user,
        setuser,
        id,
        setid,
        booking,
        setBooking,
        cancel,
      setCancel,
        confirmBooking,
        setConfirmBooking,
        bookingObj,
        setBookingObj,
      } = useContext(Context);

      const [bookingID, setBookingID] = useState("");
      const [bookingName, setBookingName] = useState("");
      const [bookingEmail, setBookingEmail] = useState("");
    
  return (
    <div className="cancel">
      <FontAwesomeIcon
        icon={faXmark}
        className="close"
        onClick={() => setCancel(false)}
      />
      <h1 className="booking_head">Cancel reservation</h1>
      <div className="booking_container">
        <label>
          <div className="book_head">Enter name used in booking</div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setBookingName(e.target.value)}
          />
        </label>
        <label>
          <div className="book_head">Enter email used in booking</div>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setBookingEmail(e.target.value)}
          />
        </label>
        <label>
          <div className="book_head">Reservation id</div>
          <input
            type="text"
            placeholder="Enter reservation ID"
            onChange={(e) => setBookingID(e.target.value)}
          />
        </label>
          <label className="other_input">
            <div className="book_head">Reason for cancellation <em>(optional)</em></div>
            <textarea
              placeholder="Enter reason for cancellation"
              className="seats"
            ></textarea>
          </label>
        <div className="book" >
          Next
        </div>
      </div>
    </div>
  );
};

export default Cancel;
