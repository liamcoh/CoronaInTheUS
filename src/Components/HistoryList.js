import React from 'react'
import '../App.css'
import deleteIcon from '../Assets/delete-button.svg'
const { v4: uuidv4 } = require('uuid');

export default React.memo(({queue, addQueue}) => {
    
    const items = []

    function removeLine(ele){
        let tmp = [...queue]
        tmp.splice(queue.indexOf(ele), 1)
        addQueue(tmp)
    }
    
    queue.forEach(ele => {
        let key = uuidv4()
        items.push(<div
            key={key} 
            style={{display: 'flex', color: ele.color, fontWeight: ele.weight, textAlign: 'right', fontSize: '16px' }}>
                <div style={{ flex: '1',borderLeft: "2px solid black", marginLeft: '25px', paddingLeft: '25px'  }}>מדינה:{ele.name}</div>
                <div style={{ flex: '1',borderLeft: "2px solid black", marginLeft: '25px', paddingLeft: '25px'  }}>תאריך:{ele.date}</div>
                <div style={{ flex: '1',borderLeft: "2px solid black", marginLeft: '25px', paddingLeft: '25px'  }}>חיוביים:{ele.pos}</div>
                <div style={{ flex: '1' }}>שליליים:{ele.neg}</div>
                <button style={{ width: '5%', height: '5%', float: 'left' }} className='button' onClick={() => removeLine(ele)}><img className='img' src={deleteIcon} alt='delete'></img></button>
            </div>)})

    return (
        <div>
            {items}
        </div>
    )
  })