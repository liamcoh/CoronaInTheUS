import React from 'react'
import '../App.css'
import deleteIcon from '../Assets/delete-button.svg'
const { v4: uuidv4 } = require('uuid');

export default function History({queue, addQueue}) {
    
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
            style={{color: ele.color, fontWeight: ele.weight, textAlign: 'left', fontSize: '22px' }}>
                <p>
                    <span style = {{ borderRight: "2px solid black", width: '40px' , marginRight: '25px', paddingRight: '25px' }}>state:{ele.name}</span>
                    <span style = {{ borderRight: "2px solid black", width: '40px' , marginRight: '25px', paddingRight: '25px' }}>date:{ele.date}</span>
                    <span style = {{ borderRight: "2px solid black", width: '40px' , marginRight: '25px', paddingRight: '25px' }}>pos:{ele.pos}</span>
                    <span>neg:{ele.neg}</span>
                    <button style={{ width: '5%', height: '5%', float: 'right' }} className='button' onClick={() => removeLine(ele)}><img className='img' src={deleteIcon} alt='delete'></img></button>
                </p>
            </div>)})

    return (
        <div>
            {items}
        </div>
    )
  }