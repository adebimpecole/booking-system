import React, { useContext } from "react";

import { Context } from "../Utilities/Context";


const SettingsNav = () => {
    const {
      user,
      setuser,
      id,
      setid,
      errorMessage,
      successMessage,
      page,
      setpage,
      view, setview
    } = useContext(Context);
  return (
      <div className="settings_nav">
        <div className="the_container">
              <div
                className={`option ${view === "Profile" ? "active_nav" : ""}`}
                onClick={() => setview("Profile")}
              >
                <span className="ntxt">Profile</span>
              </div>
              <div
                className={`option ${view === "Tables" ? "active_nav" : ""}`}
                key="2"
                onClick={() => setview("Tables")}
              >
                <span className="ntxt">Tables</span>
              </div>
              <div
                className=" option "
                key="3"
              >
                <span className="ntxt">Delete account</span>
              </div>
        </div>
      </div>
  );
};

export default SettingsNav;
