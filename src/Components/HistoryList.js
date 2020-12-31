import React from 'react'
import '../App.css'
import deleteIcon from '../Assets/delete-button.svg'
const { v4: uuidv4 } = require('uuid');

export default function History({queue, addQueue}) {
    
    const items = []

    function removeLine(ele){
        addQueue(prev => {
            let tmp = [...prev]
            tmp.splice(queue.indexOf(ele), 1)
            return tmp
        })
    }
    
    queue.forEach(ele => {
        let key = uuidv4()
        items.push(<div
            key={key} 
            style={{color: ele.color, fontWeight: ele.weight}}>
                <p>
                    <span style = {{ borderRight: "2px solid black" }}>state:{ele.name}</span>
                    <span style = {{ borderRight: "2px solid black" }}>date:{ele.date}</span>
                    <span style = {{ borderRight: "2px solid black" }}>pos:{ele.pos}</span>
                    <span style = {{ borderRight: "2px solid black" }}>neg:{ele.neg}</span>
                    <button className='button' onClick={() => removeLine(ele)}><img className='img' src={deleteIcon} alt='delete'></img></button>
                </p>
            </div>)})

    return (
        <div>
            {items}
        </div>
    )
  }