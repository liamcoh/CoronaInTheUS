import React from 'react'
import '../App.css'
import ClockBox from './ClockBox'

export default React.memo(({ clock, viewClock, toggleViewClock }) => {

    return (
        <div className='header'>
          <h1>הקורונה במדינת ארה"ב</h1>
          <p>מאגר נתונים עדכני לחיפוש</p>
          <div className='navbar'>
            <button className='button' onClick={toggleViewClock}>הצג שעה</button>
            {viewClock && <ClockBox time={clock} />}
          </div>
        </div>
    )
  })