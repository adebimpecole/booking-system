import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  getDoc,
} from "firebase/firestore";

import emailjs from "@emailjs/browser";

import "./Auth.sass";
import { Context } from "../Utilities/Context";

const SignUp = () => {
  const db = getFirestore();

  const navigate = useNavigate();

  let { user, setuser, id, setid } = useContext(Context);
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => emailjs.init("pJ4MU-Zgp_kAYRle9"), []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const serviceId = "service_t7s80jb";
    const templateId = "template_9x7vdmp";

    try {
      // Create a new account with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const the_user = userCredential.user;
      const userId = the_user.uid;

      // Add the restaurants name to Firestore
      const usersCollectionRef = collection(db, "restaurant");
      await addDoc(usersCollectionRef, {
        restaurant_name: restaurantName,
        userId: userId,
        email: email,
        password: password,
      });
      setuser(restaurantName);
      setid(userId);
      navigate("/setup");

      await emailjs.send(serviceId, templateId, {
        email: email,
        link: `http://localhost:5173/?id=${userId}`,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // Handle registration errors
    }
  };

  return (
    <div className="Signup">
      <div className="the_image">
        <div className="img_container"></div>
      </div>
      <div className="form_container">
        <h2 className="form_name">Welcome to ....!</h2>
        <form>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Restaurant Name"
            className="logged"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Restaurant Email"
            className="logged"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="logged"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="logged"
          />
          <input
            type="submit"
            value="SIGN UP"
            className="button"
            onClick={onSubmit}
          />
          <div className="account">
            Already have an account?{" "}
            <Link to="/login" className="login_link">
              {" "}
              LOGIN
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
