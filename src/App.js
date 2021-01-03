import React, {useEffect, useState} from "react"
import StateList from './Components/StatesList'
import History from './Components/HistoryList'
import ClockBox from './Components/ClockBox'
import DatePicker from "react-datepicker"
import './App.css'
const { max_history, green, red } = require('./config');

function App() {

  const [date, setDate] = useState(new Date())
  const [state, setState] = useState('TX')
  const [states, setStates] = useState([])
  const [historyQueue, setQueue] = useState([])
  const [clock, setClock] = useState(new Date())
  const [viewClock, setViewClock] = useState(false)

  const minDate = new Date(2020, 2, 6)
  var maxDate = new Date()

  // Retrieve all the states from API
  useEffect(() => {
    fetch(`https://api.covidtracking.com/v1/states/info.json`)
        .then(response => response.json())
        .then(data => {
            let arr = []
            data.forEach(ele => {
              arr.push(ele.state)
            });

            setStates(arr)
        })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch state status on newly aquired input
  /*useEffect((() => {
    fetch(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
        .then(response => response.json())
        .then(data => {

          data.forEach(ele => {
            let strDate = ele.date.toString()
            if(parseInt(strDate.substring(0,4)) === date.getFullYear()){ // year
              if(parseInt(strDate.substring(4,6)) === (date.getMonth()+1)){ // month
                if(parseInt(strDate.substring(6,8)) === date.getUTCDate()){ // day

                  setQueue(prev => {
                    let tmp = [...prev]
                    let color = 'green'
                    let bold = 'normal'
                    let prec = ele.positiveIncrease / (ele.positiveIncrease + ele.negativeIncrease)
                    if(prec < green) color = 'green'
                    else if (prec >= green && prec < red) color = 'orange'
                    else { color = 'red'; bold = 'bold' }
                    tmp.push({
                      name: state.toString(),
                      date: (date.getMonth()+1).toString() + '/' + date.getUTCDate().toString(),
                      pos: ele.positiveIncrease,
                      neg: ele.negativeIncrease,
                      color: color,
                      weight: bold
                    })

                    if(tmp.length > max_history) tmp.shift()

                    return tmp
                  })
                }
              }
            }
          })
        })
  }), [date, state]) // eslint-disable-line react-hooks/exhaustive-deps*/

  React.useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  useEffect(() => { document.body.style.backgroundColor = 'yellow' }, []) // Page color

  function search() {
    fetch(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
        .then(response => response.json())
        .then(data => {

          data.forEach(ele => {
            let strDate = ele.date.toString()
            if(parseInt(strDate.substring(0,4)) === date.getFullYear()){ // year
              if(parseInt(strDate.substring(4,6)) === (date.getMonth()+1)){ // month
                if(parseInt(strDate.substring(6,8)) === date.getUTCDate()){ // day

                  setQueue(prev => {
                    let tmp = [...prev]
                    let color = 'green'
                    let bold = 'normal'
                    let prec = ele.positiveIncrease / (ele.positiveIncrease + ele.negativeIncrease)
                    if(prec < green) color = 'green'
                    else if (prec >= green && prec < red) color = 'orange'
                    else { color = 'red'; bold = 'bold' }
                    tmp.push({
                      name: state.toString(),
                      date: (date.getMonth()+1).toString() + '/' + date.getUTCDate().toString(),
                      pos: ele.positiveIncrease,
                      neg: ele.negativeIncrease,
                      color: color,
                      weight: bold
                    })

                    if(tmp.length > max_history) tmp.shift()

                    return tmp
                  })
                }
              }
            }
          })
        })
  }


  return (
      <div dir='rtl'>
        <div>
          <button onClick={() => setViewClock(!viewClock)}>הצג שעה</button>
          {viewClock && <ClockBox time={clock} />}
        </div>
        <div><button onClick={search}>חפש</button></div>
        <DatePicker selected={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
        <StateList set={setState} list={states} />
        <History queue={historyQueue} />
      </div>
  )
}

export default App
