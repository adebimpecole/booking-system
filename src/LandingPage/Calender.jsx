import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import "./Booking.sass"

const Calender = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className='calender'>
            <LocalizationProvider dateAdapter={AdapterDayjs} style={{width: '4800px'}}>
                <DemoContainer components={['DatePicker']} style={{width: '4800px'}}>
                    <DatePicker  style={{width: '4800px'}}/>
                </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <TimePicker
                        
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
};

export default Calender;
