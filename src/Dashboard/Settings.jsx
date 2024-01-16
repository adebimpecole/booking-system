import React, { useContext } from "react";
import SettingsNav from "./SettingsNav";

import { Context } from "../Utilities/Context";


import "./Settings.sass";
import Profile from "./Profile";
import SetTables from "./SetTables";

const Settings = () => {
  const {
    user,
    setuser,
    id,
    setid,
    errorMessage,
    successMessage,
    page,
    setpage,
    view,
  } = useContext(Context);
  return (
    <div className="settings_container">
      <div className="the_settings">
        <div className="settings_heading">{user}</div>
        <SettingsNav />
        <div className="settings_frame">
        {(() => {
              switch (view) {
                case "Profile":
                  return <Profile/>;
                case "Tables":
                  return <SetTables/>;
                case "Settings":
                  return ;
                default:
                  return null;
              }
            })()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
