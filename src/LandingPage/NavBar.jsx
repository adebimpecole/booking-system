import React, {useContext} from 'react'
import "./LandingPage.sass";
import { Link, useNavigate } from 'react-router-dom'

import { Context } from "../Utilities/Context";


const NavBar = () => {
  let {
    user,
    setuser,
    id,
    setid,
    booking,
    setBooking,
    cancel,
      setCancel,
    confirmBooking,
    setConfirmBooking,
    bookingObj,
    setBookingObj,
  } = useContext(Context);

  return (
    <div className='navigation'>
      <div className='leftnav'>Logo</div>
      <div className='rightnav'>
        <span className='action_button' onClick={()=>setBooking(true)}> Book Reservation</span>
        <span className='action_button' onClick={()=>setCancel(true)}>Cancel Reservation</span>
      </div>
    </div>
  )
}

export default NavBar