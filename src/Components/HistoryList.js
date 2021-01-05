import React from 'react'
import '../App.css'
import deleteIcon from '../Assets/delete-button.svg'
const { v4: uuidv4 } = require('uuid');

export default React.memo(({ queue, addQueue }) => {
    
    const items = []

    function removeLine(ele){
        let tmp = [...queue]
        tmp.splice(queue.indexOf(ele), 1)
        addQueue(tmp)
    }
    
    queue.forEach(ele => {
        let key = uuidv4()
        items.push(<div className='flexBox'
            key={key} 
            style={{ color: ele.color, fontWeight: ele.weight }}>
                <div className='flexItem'>מדינה:{ele.name}</div>
                <div className='flexItem'>תאריך:{ele.date}</div>
                <div className='flexItem'>חיוביים:{ele.pos}</div>
                <div className='flexItem'>שליליים:{ele.neg}</div>
                <button 
                style={{ width: '5%', height: '5%', float: 'left' }} 
                className='button' 
                onClick={() => removeLine(ele)}>
                    <img className='img' src={deleteIcon} alt='delete'></img>
                </button>
            </div>)})

    return (
        <div>
            {items}
        </div>
    )
  })