import React, { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import LandingPage from "./LandingPage/LandingPage";
import SignUp from "./Authentication/SignUp";
import { Context } from "./Utilities/Context";

const Login = lazy(() => import("./Authentication/Login"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const SetUp = lazy(() => import("./Authentication/SetUp"));
const Booking = lazy(() => import("./LandingPage/Booking"));
const Siginup = lazy(() => import("./Authentication/SignUp"));
const Modal2 = lazy(() => import("./LandingPage/Modal2"));

function App() {
  let [page, setpage] = useState("Home");
  let [view, setview] = useState("Profile");

  let [user, setuser] = useState(null);
  let [id, setid] = useState(null);
  let [booking, setBooking] = useState(false);
  let [cancel, setCancel] = useState(false);
  let [confirmBooking, setConfirmBooking] = useState(false);
  let [bookingObj, setBookingObj] = useState({});

  let providerValue = useMemo(
    () => ({
      user,
      setuser,
      id,
      setid,
      page,
      setpage,
      view,
      setview,
      booking,
      setBooking,
      cancel,
      setCancel,
      confirmBooking,
      setConfirmBooking,
      bookingObj,
      setBookingObj,
    }),
    [
      user,
      setuser,
      id,
      setid,
      page,
      setpage,
      view,
      setview,
      booking,
      setBooking,
      cancel,
      setCancel,
      confirmBooking,
      setConfirmBooking,
      bookingObj,
      setBookingObj,
    ]
  );

  // Save user to localStorage as a JSON string
  useEffect(() => {
    if (user == null || user == 0 || user == undefined) {
      console.log("catch");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("booking", JSON.stringify(booking));
      localStorage.setItem("cancel", JSON.stringify(cancel));
      localStorage.setItem("confirm_booking", JSON.stringify(confirmBooking));
      localStorage.setItem("booking_obj", JSON.stringify(bookingObj));
    }
  }, [user]);

  // Retrieve user from localStorage and parse it to an object
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedId = localStorage.getItem("id");
    const storedBook = localStorage.getItem("booking");
    const storedCancel = localStorage.getItem("cancel");
    const storedConfirm = localStorage.getItem("confirm_booking");
    const storedObj = localStorage.getItem("booking_obj");

    if (storedUser) {
      setuser(JSON.parse(storedUser));
    }
    if (storedId) {
      setid(JSON.parse(storedId));
    }
    if (storedBook) {
      setid(JSON.parse(storedBook));
    }
    if (storedCancel) {
      setid(JSON.parse(storedCancel));
    }
    if (storedConfirm) {
      setid(JSON.parse(storedConfirm));
    }
    if (storedObj) {
      setid(JSON.parse(storedObj));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <>
          <Context.Provider value={providerValue}>
            <Routes>
              <Route exact path="*" element={<LandingPage />} />
              <Route
                exact
                path="/login"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/dash"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/signup"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Siginup />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/setup"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <SetUp />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/booknext"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Booking />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/bookconfirm"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Modal2 />
                  </Suspense>
                }
              />
              {/* <Route
                exact
                path="/cancel"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Modal3 />
                  </Suspense>
                }
              /> */}
            </Routes>
          </Context.Provider>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
