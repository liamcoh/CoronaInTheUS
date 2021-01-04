import React, {useEffect, useState} from "react"
import StateList from './Components/StatesList'
import History from './Components/HistoryList'
import ClockBox from './Components/ClockBox'
import DatePicker from "react-datepicker"
import './App.css'
import toggleIcon from './Assets/print-button.svg'
import "react-datepicker/dist/react-datepicker.css";
const { max_history, green, red } = require('./config');


function App() {

  const [date, setDate] = useState(new Date())
  const [state, setState] = useState('TX')
  const [states, setStates] = useState([])
  const [historyQueue, setQueue] = useState([])
  const [viewHistory, setViewHistory] = useState(true)
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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  useEffect(() => { document.body.style.backgroundColor = '#f1f1f1' }, []) // Page color

  function search() {
    fetch(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
        .then(response => response.json())
        .then(data => {

          data.forEach(ele => {
            let strDate = ele.date.toString()
            if(parseInt(strDate.substring(0,4)) === date.getFullYear()){ // year
              if(parseInt(strDate.substring(4,6)) === (date.getMonth()+1)){ // month
                if(parseInt(strDate.substring(6,8)) === date.getUTCDate()){ // day

                  let tmp = [...historyQueue]
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

                  setQueue(tmp)
                }
              }
            }
          })
        })
  }

  function toggleViewHistory() {
    setViewHistory(!viewHistory)
  }

  function toggleViewClock() {
    setViewClock(!viewClock)
  }


  return (
      <div dir='rtl'>
        <div className='header'>
          <h1>הקורונה במדינת ארה"ב</h1>
          <p>מאגר נתונים עדכני לחיפוש</p>
          <div className='navbar'>
            <button className='button' onClick={toggleViewClock}>הצג שעה</button>
            {viewClock && <ClockBox time={clock} />}
          </div>
        </div>

        <div className='row'>
          <div className='rightcolumn'>
            <div className='card'>
              <p style={{ textAlign: 'center', fontWeight: 'bold' }}>בחר תאריך ומדינה</p>
              <div style ={{ padding: 0 }}><DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={date} 
                    onChange={setDate} 
                    minDate={minDate} 
                    maxDate={maxDate}
                    popperPlacement="left"
                    showPopperArrow={false} />
                  <StateList set={setState} list={states} />
              </div>
              <div style={{ textAlign: 'center' }}><button onClick={search}>חפש</button></div>
              <div style={{ height: '20%', width: '20%' }}><button onClick={toggleViewHistory}>
                <img className='img' src={toggleIcon} alt='view'></img>
                </button>
              </div>
            </div>
          </div>
          <div className='leftcolumn'>
            <div className='card'>
              {viewHistory && <History queue={historyQueue} addQueue={setQueue} />}
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
