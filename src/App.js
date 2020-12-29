import React, {useEffect, useCallback, useState} from "react"
import StateList from './Components/StatesList'
import DatePicker from "react-datepicker";

function App() {

  const [date, setDate] = useState(new Date())
  const [state, setState] = useState('TX')
  const [states, setStates] = useState([])
  const [positive, setPos] = useState("unpublished")
  const [negative, setNeg] = useState("unpublished")

  const minDate = new Date(2020, 2, 6)
  const maxDate = new Date()

  // Retrieve all the states from API
  const getStates = useCallback(() => {
      fetch(`https://api.covidtracking.com/v1/states/info.json`)
          .then(response => response.json())
          .then(data => {
              let arr = []
              data.forEach(ele => {
                arr.push(ele.state)
              });

              setStates(arr)
          })
  }, [])
  useEffect(getStates, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch state status on newly aquired input
  useEffect((() => {
    fetch(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
        .then(response => response.json())
        .then(data => {
          data.forEach(ele => {
            let strDate = ele.date.toString()
            if(parseInt(strDate.substring(0,4)) === date.getFullYear()){ // year
              if(parseInt(strDate.substring(4,6)) === (date.getMonth()+1)){ // month
                if(parseInt(strDate.substring(6,8)) === date.getUTCDate()){ // day
                  setPos(ele.positiveIncrease)
                  setNeg(ele.negativeIncrease)
                }
              }
            }
          })
        })
  }), [date, state]) 


  return (
      <div>
        <DatePicker selected={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
        <StateList set={setState} list={states} />
        <h1>state: {state.toString()}</h1>
        <h1>date: {date.getMonth()+1}/{date.getUTCDate()}</h1>
        <h1>positive: {positive}</h1>
        <h1>negative: {negative}</h1>
      </div>
  )
}

export default App
