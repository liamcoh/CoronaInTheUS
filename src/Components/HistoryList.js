import React from 'react'
import '../App.css';
const { v4: uuidv4 } = require('uuid');

export default function History(queue) {
    
    const items = []

    queue.queue.forEach(ele => {
        items.push(<div className = "footer-texts" key={uuidv4()} style={{color: ele.color, fontWeight: ele.weight}}>
            <span>state:{ele.name}</span><span>date:{ele.date}</span><span>pos:{ele.pos}</span><span>neg:{ele.neg}</span>
            </div>)})

    return (
        <div>
            {items}
        </div>
    )
  }