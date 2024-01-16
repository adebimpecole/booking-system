import React from "react";
import ConfirmBooking from "./ConfirmBooking";

const Modal2 = (props) => {

  return (
    <div className="the_modal">
      <ConfirmBooking myProp={props.myProp}/>
    </div>
  );
};

export default Modal2;
