import React, {useContext} from 'react'

import { Context } from '../Utilities/Context'
import SideNav from './SideNav'
import "./Dashboard.sass"
import TopNav from './TopNav'
import Home from './Home'
import Tables from './Tables'
import Settings from './Settings'
import Reservations from './Reservations'

const Dashboard = () => {
  const { user, setuser, id, setid, errorMessage, successMessage, page, setpage } = useContext(Context);

  return (
        <div className='dashboard'>
          <SideNav/>
          <div className='set_up_div'>
            <TopNav/>
            {(() => {
              switch (page) {
                case "Home":
                  return <Home/>;
                case "Tables":
                  return <Tables/>;
                case "Reservations":
                  return <Reservations/>;
                case "Settings":
                  return <Settings/>;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
  )
}

export default Dashboard
