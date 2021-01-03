import React from 'react'
import '../App.css'

export default function ClockBox({time}) {

    let timeFormat = time.getDate() + '.' + time.getMonth() + '.' + time.getFullYear() + ' ' + 
        time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        console.log(timeFormat)
    return (
        <div className='clockPanel'>
            <div>שעה נוכחית</div>
            <hr></hr>
            <div className='timeFormat'>{timeFormat}</div>
        </div>
    )
  }