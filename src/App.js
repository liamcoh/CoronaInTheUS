import React, {useEffect, useCallback, useState} from "react"
import StateList from './Components/StatesList'
import DatePicker from "react-datepicker";

function App() {
  const [date, setDate] = useState(new Date())
  const [state, setState] = useState('TX')
  const [states, setStates] = useState([])
  const [positive, setPos] = useState(0)
  const [negative, setNeg] = useState(0)
  const minDate = new Date(2020, 2, 6)

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

  useEffect((() => {
    fetch(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          data.forEach(ele => {
            let strDate = ele.date.toString()
            if(parseInt(strDate.substring(0,4)) === date.getFullYear()){
              if(parseInt(strDate.substring(4,6)) === (date.getMonth()+1)){
                if(parseInt(strDate.substring(6,8)) === date.getUTCDate()){
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
        <DatePicker selected={date} onChange={setDate} minDate={minDate} />
        <StateList set={setState} list={states} />
        <h1>state: {state.toString()}</h1>
        <h1>date: {date.getMonth()+1}/{date.getUTCDate()}</h1>
        <h1>positive: {positive}</h1>
        <h1>negative: {negative}</h1>
      </div>
  )
}

export default App
