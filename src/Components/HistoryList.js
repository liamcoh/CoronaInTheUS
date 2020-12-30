import React from 'react'
const { v4: uuidv4 } = require('uuid');

export default function History(queue) {
    
    const items = []

    queue.queue.forEach(ele => {
        items.push(<div
            key={uuidv4()} 
            style={{color: ele.color, fontWeight: ele.weight}}>
                <p>
                    <span style = {{ borderRight: "2px solid black" }}>state:{ele.name}</span>
                    <span style = {{ borderRight: "2px solid black" }}>date:{ele.date}</span>
                    <span style = {{ borderRight: "2px solid black" }}>pos:{ele.pos}</span>
                    <span style = {{ borderRight: "2px solid black" }}>neg:{ele.neg}</span>
                </p>
            </div>)})

    return (
        <div>
            {items}
        </div>
    )
  }