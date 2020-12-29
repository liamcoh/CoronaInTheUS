import React from 'react'

export default React.memo(({ set, list }) => {

    const items = []

    list.forEach(ele => {
        items.push(<option key={ele} value={ele}>{ele}</option>)
    });

    return (
        <select name="States" id="states" onChange={(e) => set(e.target.value)}>{items}</select>
    )
  })