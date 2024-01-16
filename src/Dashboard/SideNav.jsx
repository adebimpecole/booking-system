import React, { useContext } from "react";

import { Context } from "../Utilities/Context";
import Modal from "../LandingPage/Modal";
import Modal2 from "../LandingPage/Modal2";

import "./Nav.sass";

const SideNav = () => {
  const {
    user,
    setuser,
    id,
    setid,
    errorMessage,
    successMessage,
    page,
    setpage,
    booking,
    setBooking,
    confirmBooking,
    setCancel,
  } = useContext(Context);

  return (
    <div className="sidenav">
      <div className="subnav">
        <div className="brand">
          <h1 className="brndname">Logo</h1>
        </div>
        <div className="nav">
          <div>
            <div
              className=" option  active dash"
              onClick={() => setpage("Home")}
            >
              <span className={`ntxt ${page === "Home" ? "opened_tab" : ""}`}>Home</span>
            </div>
            <div className=" option " key="2" onClick={() => setpage("Tables")}>
              <span className={`ntxt ${page === "Tables" ? "opened_tab" : ""}`}>Tables</span>
            </div>
            <div
              className=" option "
              key="3"
              onClick={() => setpage("Reservations")}
            >
              <span className={`ntxt ${page === "Reservations" ? "opened_tab" : ""}`}>Reservations</span>
            </div>
            <div className=" option " key="4" onClick={() => setBooking(true)}>
              <span className="ntxt">Book a Table</span>
            </div>
          </div>
          <div>
            <div
              className=" option "
              key="5"
              onClick={() => setpage("Settings")}
            >
              <span className={`ntxt ${page === "Settings" ? "opened_tab" : ""}`}>Settings</span>
            </div>
            <div className=" option " key="6">
              <span className="ntxt">Log out</span>
            </div>
          </div>
        </div>
      {booking ? <Modal/> : <span></span>}
      {confirmBooking ? <Modal2/> : <span></span>}
      </div>
    </div>
  );
};

export default SideNav;
