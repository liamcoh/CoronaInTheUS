import React from 'react'
import '../App.css'

export default function ClockBox({time}) {

    let timeFormat = ('0' + time.getDate()).slice(-2) + '.'
             + ('0' + (time.getMonth())).slice(-2) + '.'
             + time.getFullYear() + ' ' + 
             ('0' + time.getHours()).slice(-2) + ':' 
             + ('0' + time.getMinutes()).slice(-2) + ':' 
             + ('0' + time.getSeconds()).slice(-2);

    return (
        <div className='clockPanel'>
            <div>שעה נוכחית</div>
            <hr style={{ padding: '0' }}></hr>
            <div className='timeFormat' style={{ direction: 'ltr' }}>{timeFormat}</div>
        </div>
    )
  }