import React, { useContext, useState } from "react";

import { Context } from "../Utilities/Context";

import food2 from "../assets/food2.jpg";

const Profile = () => {
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

  const [editTab, setEditTab] = useState(false);

  return (
    <div className="set_profile">
      <div className="section_header">Profile Information</div>
      <span className="settings_info">
        Your restaurants profile and information
      </span>
      <div className="set_section">
        <div className="setting_tab">
          <div className="tab_title">Restaurant Information</div>
          <div className={`profile_edit_two ${editTab ? "hide" : "show"}`}>
            <div className="each_section">
              <div className="set_Title">Restaurant name:</div>
              <div className="set_body">{user}</div>
            </div>
            <div className="each_section">
              <div className="set_Title">Email:</div>
              <div className="set_body">example1@gmsil.com</div>
            </div>
            <div className="each_section">
              <div className="set_Title">Password:</div>
              <div className="set_body">******</div>
            </div>
            <div className="each_section">
              <div className="set_Title">Opening hours:</div>
              <div className="set_body">{user}</div>
            </div>
          </div>
          <div className={`profile_edit_two ${editTab ? "show" : "hide"}`}>
            <div className="each_section">
              <div className="set_Title">Restaurant name:</div>
              <input type="text" />
            </div>
            <div className="each_section">
              <div className="set_Title">Email:</div>
              <input type="text" />
            </div>
            <div className="each_section">
              <div className="set_Title">Password:</div>
              <input type="text" />
            </div>
            <div className="each_section">
              <div className="set_Title">Opening hours:</div>
              <input type="text" />
            </div>
            <div className="each_section">
              <div className="set_Title">Logo:</div>
              <div className="set_logo">
                <img
                  src={food2}
                  alt="profile picture"
                  className="the_picture"
                />
                <div className="upload">Upload image</div>
              </div>
            </div>
          </div>
          {editTab ? (
            <div className="button_div">
              <div className="change_button save_button" onClick={() => setEditTab(true)}>
                Save
              </div>
              <div className="change_button" onClick={() => setEditTab(false)}>
                Cancel
              </div>
            </div>
          ) : (
            <div className="change_button" onClick={() => setEditTab(true)}>
              Edit Profile information
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
