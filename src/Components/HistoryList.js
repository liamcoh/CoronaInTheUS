import React from 'react'
const { v4: uuidv4 } = require('uuid');

export default function History(queue) {
    
    const items = []

    queue.queue.forEach(ele => {
        items.push(<h1 key={uuidv4()}>state:{ele.name}, date:{ele.date}, pos:{ele.pos}, neg:{ele.neg}</h1>)
    });

    return (
        <div>{items}</div>
    )
  }