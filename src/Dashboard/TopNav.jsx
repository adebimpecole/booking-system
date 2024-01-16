import React, { useContext, useState, useRef } from "react";

import { Context } from "../Utilities/Context";
import bell from "../assets/alarm.svg";
import "./Nav.sass";

const TopNav = () => {
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

  const [value, setValue] = useState("");
  const termRef = useRef("");

  const handleSearch = (event) => {
    setValue(event.target.value);
    if (event.target.value == "") {
      termRef.current = "";
    }
  };
  return (
    <div className="topnav">
      <span>
        {page}
      </span>
      <span className="right_side">
        <span></span>
        <img src={bell} className="bell" />
        <span className="profile_name">{user.charAt(0)}</span>
      </span>
    </div>
  );
};

export default TopNav;
