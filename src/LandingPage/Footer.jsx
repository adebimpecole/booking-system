import React, {useContext} from "react";
import "./Footer.sass";

import { Context } from "../Utilities/Context";

const Footer = () => {
  const {
    user,
    setuser,
    id,
    setid,
    setBooking,
    setCancel,
    confirmBooking,
    setConfirmBooking,
    bookingObj,
    setBookingObj,
  } = useContext(Context);
  return (
    <div className="footer">
      <div className="real_footer">
        <ul className="section_one">
          <li>Logo</li>
        </ul>
        <ul className="section_two">
          <li className="section_head">Reservation</li>
          <div>
            <li className="section_item" onClick={() => setBooking(true)}>
              Book Reservation
            </li>
            <li className="section_item" onClick={() => setCancel(true)}>
              Cancel Reservation
            </li>
          </div>
        </ul>
        <ul className="section_four">
          <li className="section_head">Opening hours</li>
          <li className="section_item">Weekdays : 8:00am - 10:00pm</li>
          <li className="section_item">Weekends : 8:00am - 11:00pm</li>
        </ul>
        <ul className="section_four">
          <li className="section_head">Contact</li>
          <li className="section_item">
            <img
              src="https://res.cloudinary.com/dddotdmjo/image/upload/v1705270712/twitter_1_pfx0ib.svg"
              alt="icon"
            />
            <img
              src="https://res.cloudinary.com/dddotdmjo/image/upload/v1705270711/square-facebook_1_k2lfrf.svg"
              alt="icon"
            />
            <img
              src="https://res.cloudinary.com/dddotdmjo/image/upload/v1705270710/instagram_1_whwp7b.svg"
              alt="icon"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
