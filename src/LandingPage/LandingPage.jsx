import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import "./LandingPage.sass";
import NavBar from "./NavBar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Photos from "./TheSlide";
import Footer from "./Footer";
import Booking from "./Booking";
import Modal from "./Modal";

import { Context } from "../Utilities/Context";
import Modal2 from "./Modal2";
import Modal3 from "./Modal3";

const LandingPage = () => {
  let { booking, setBooking, confirmBooking, cancel, setCancel } =
    useContext(Context);
  const location = useLocation();

  const the_id = new URLSearchParams(location.search).get("id");

  return (
    <div className="landing_page">
      <NavBar />
      <div className="first_section">
        <div className="first_container">
          <h2 className="page_title">Hello Restaurant</h2>
          <div className="intro">
            To ensure a safe and conducive work environment for our employees,
            it's imperative to address ongoing maintenance issues within our
            office space. We've conducted a thorough assessment and identified
            necessary repairs for infrastructure and utilities. We're seeking
            funds to promptly address these maintenance needs, safeguarding the
            workplace's functionality and safety.
          </div>
          <div className="intro_button" onClick={() => setBooking(true)}>
            Book a table
          </div>
        </div>
      </div>
      <div className="second_section">
        <div className="about_us_image">
          <img
            className="image_one"
            src="https://res.cloudinary.com/dddotdmjo/image/upload/v1704905632/two_skkkpl.jpg"
          />
          <img
            className="image_two"
            src="https://res.cloudinary.com/dddotdmjo/image/upload/v1704905635/three_fb08oa.jpg"
          />
        </div>
        <div className="about_us_text">
          <h2 className="second_title">Our Story</h2>
          <div className="intro">
            To ensure a safe and conducive work environment for our employees,
            it's imperative to address ongoing maintenance issues within our
            office space. We've conducted a thorough assessment and identified
            necessary repairs for infrastructure and utilities. We're seeking
            funds to promptly address these maintenance needs, safeguarding the
            workplace's functionality and safety.
          </div>
          <div className="intro_button" onClick={() => setBooking(true)}>
            Book a table
          </div>
        </div>
      </div>
      <div className="third_section">
        <h2 className="third_heading">Featured meals</h2>
        <div className="slideshow">
          <div className="part">
            <img
              src="https://res.cloudinary.com/dddotdmjo/image/upload/v1704905635/slide5_y8jfbv.jpg"
              alt="slideshow_image"
            />
            <div className="part_into">
              <div className="part_title">Grilled Salmon Fillet</div>
              <div className="part_desc">
                Indulge in our perfectly grilled salmon fillet, served with a
                zesty lemon butter sauce and fresh seasonal vegetables.
              </div>
            </div>
          </div>
          <div className="part" style={{ flexDirection: "column-reverse" }}>
            <img
              src="https://res.cloudinary.com/dddotdmjo/image/upload/v1704905635/slide4_hboyes.jpg"
              alt="slideshow_image"
            />
            <div className="part_into">
              <div className="part_title">Signature Truffle Pasta</div>
              <div className="part_desc">
                Al dente pasta delicately coated in a rich truffle-infused cream
                sauce, garnished with Parmesan shavings.
              </div>
            </div>
          </div>
          <div className="part">
            <img
              src="https://res.cloudinary.com/dddotdmjo/image/upload/v1704905628/slide1_luhb1u.jpg"
              alt="slideshow_image"
            />
            <div className="part_into">
              <div className="part_title">Classic Margherita Pizza</div>
              <div className="part_desc">
                Crispy thin crust, vine-ripened tomatoes, creamy mozzarella, and
                aromatic basil—simple yet incredibly delicious.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fourth_section">
        <h2 className="fourth_heading">Gallery</h2>
        <span>
          From sumptuous dishes to the vibrant ambiance, discover the essence of
          our restaurant's story through captivating imagery in our gallery.
        </span>
        <Photos></Photos>
      </div>
      {booking ? <Modal /> : <span></span>}
      {confirmBooking ? <Modal2 myProp={the_id}/> : <span></span>}
      {cancel ? <Modal3 /> : <span></span>}
      <Footer />
    </div>
  );
};

export default LandingPage;
