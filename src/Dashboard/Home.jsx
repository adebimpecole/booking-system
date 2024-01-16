import React, { useContext } from 'react'
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
  } from "react-table";
import { Context } from '../Utilities/Context'
import "./Home.sass"

import pending from "../assets/pending_actions.svg"
import complete from "../assets/check-all.svg"
import no from "../assets/no_backpack.svg"
import all from "../assets/all_inbox.svg"
import table1 from "../assets/one.svg"
import MiniTable from './MiniTable';

const Home = () => {
    const { user, setuser, id, setid, errorMessage, successMessage, page, setpage } = useContext(Context);

    return (
        <div className='home'>
            <div className='real_content'>
                <h1 className='dash_header'>{user}</h1>
                <div className='info_cards'>
                    <div className='each_card'>
                        <img src={pending} alt='card_icon' />
                        <div className='card_dets'>
                            <span className='card_title'>Pending <br/> Reservations</span>
                            <span className='card_no'>500</span>
                        </div>
                    </div>
                    <div className='each_card'>
                        <img src={no} alt='card_icon' />
                        <div className='card_dets'>
                            <span className='card_title'>Cancelled <br/> Reservations</span>
                            <span className='card_no'>120</span>
                        </div>
                    </div>
                    <div className='each_card'>
                        <img src={complete} alt='card_icon' />
                        <div className='card_dets'>
                            <span className='card_title'> Completed <br/> Reservations</span>
                            <span className='card_no'>38500</span>
                        </div>
                    </div>
                    <div className='each_card'>
                        <img src={all} alt='card_icon' />
                        <div className='card_dets'>
                            <span className='card_title'>Total <br/> Reservations</span>
                            <span className='card_no'>39000</span>
                        </div>
                    </div>
                </div>
                <div className='chart_n_table'>
                    <div className='recent_charts'>
                        <div className='chart_header'>Recent reservations <span className='view_all' onClick = {()=>setpage("Reservations")}>View All</span></div>
                        <div className='the_chart'>
                            <MiniTable/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home