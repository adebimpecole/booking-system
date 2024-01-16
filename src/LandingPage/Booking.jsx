import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import "./Booking.sass";
import "../Authentication/Auth.sass";
import { Context } from "../Utilities/Context";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Booking = () => {
  const navigate = useNavigate();

  let {
    user,
    setuser,
    id,
    setid,
    booking,
    setBooking,
    confirmBooking,
    setConfirmBooking,
    bookingObj,
    setBookingObj,
  } = useContext(Context);

  const [bookingEmail, setBokingEmail] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [bookingName, setBookingName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState(null);

  const options3 = [
    { value: "Round Indoor table", label: "Round Indoor table", class: 1 },
    { value: "Round Outdoor table", label: "Round Outdoor table", class: 4 },
    { value: "Square Indoor table", label: "Square Indoor table", class: 2 },
    { value: "Square Outdoor table", label: "Square Outdoor table", class: 5 },
    {
      value: "Rectangle Outdoor table",
      label: "Rectangle Outdoor table",
      class: 6,
    },
    {
      value: "Rectangle Indoor table",
      label: "Rectangle Indoor table",
      class: 3,
    },
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

  const NextBooking = (e) => {
    let bookedTime = bookingTime.$m;
    if (bookedTime.toString().length == 1) {
      console.log(bookingDate);
      bookedTime = bookedTime.toString() + "0";
    }
    let dateString = `${bookingDate.$d}`;
    let datestamp = Date.parse(dateString);

    let dateObj = new Date(`${dateString}`);
    let options = { month: "long", day: "2-digit" };
    let cleanedDateString = dateObj.toLocaleDateString("en-US", options);

    const BookingDets = {
      bookingName: bookingName,
      bookingEmail: bookingEmail,
      bookingSeats: selectedPeople,
      bookingTable: selectedNumber,
      bookingClass: selectedClass,
      bookingRealDate: `${cleanedDateString} ${bookingDate.$y}`,
      bookingDate: `${datestamp}`,
      bookingTime: `${bookingTime.$H}:${bookedTime}`,
    };
    console.log(bookingTime);
    // navigate("/bookconfirm", { state: BookingDets });
    setBookingObj(BookingDets);
    setConfirmBooking(true);
    setBooking(false);
  };

  return (
    <div className="booking">
      <FontAwesomeIcon
        icon={faXmark}
        className="close"
        onClick={() => setBooking(false)}
      />
      <h1 className="booking_head">Book a table</h1>
      <div className="booking_text">
        Fill in the form with the required information and click on the{" "}
        <strong>CONFIRM </strong>
        button to proceed with your booking.
        {/* <em>Nt: Each booking is for a duration of 1hr 30 minutes. We kindly ask that you arrive within [20 minutes] of your reservation time. </em> */}
      </div>
      <div className="booking_container">
        <label>
          <div className="book_head">name of booking</div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setBookingName(e.target.value)}
          />
        </label>
        <label>
          <div className="book_head">email</div>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setBokingEmail(e.target.value)}
          />
        </label>
        <div className="other_input">
          <label>
            <div className="book_head">no. of seats</div>
            <input
              type="text"
              placeholder="Enter the number of seats"
              className="seats"
              onChange={(e) => setSelectedPeople(e.target.value)}
            />
          </label>
          <label>
            <div className="book_head">Type of tables</div>
            <Select
              options={options3}
              styles={colourStyles}
              isSearchable={false}
              onChange={(selectedOption) => {
                setSelectedNumber(selectedOption.value);
                setSelectedClass(selectedOption.class);
              }}
            />
          </label>
        </div>
        <div className="book_head">Select date and time</div>
        <div className="calender">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{ width: "4800px" }}
          >
            <DemoContainer
              components={["DatePicker"]}
              style={{ width: "4800px" }}
            >
              <DatePicker
                format="LL"
                value={bookingDate}
                onChange={(e) => setBookingDate(e)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                value={bookingTime}
                onChange={(e) => setBookingTime(e)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="book" onClick={NextBooking}>
          Next
        </div>
      </div>
    </div>
  );
};

export default Booking;
