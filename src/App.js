import React, {useEffect, useState} from "react"
import Header from './Components/Header'
import StateList from './Components/StatesList'
import History from './Components/HistoryList'
import DatePicker from "react-datepicker"
import toggleIcon from './Assets/print-button.svg'
import "react-datepicker/dist/react-datepicker.css";
import './App.css'

const { max_history, green, red } = require('./config');


function App() {

  // States
  const [date, setDate] = useState(new Date(Date.now() - 86400000))
  const [state, setState] = useState('TX')
  const [states, setStates] = useState([])
  const [historyQueue, setQueue] = useState([])
  const [viewHistory, setViewHistory] = useState(true)
  const [clock, setClock] = useState(new Date())
  const [viewClock, setViewClock] = useState(false)

  // Variables
  const minDate = new Date(2020, 2, 6)
  var maxDate = new Date()


  // Run once:
  // --------------------------------

  // Retrieve all the states from API
  useEffect(() => {
    fetch(`https://api.covidtracking.com/v1/states/info.json`)
        .then(response => response.json())
        .then(
          (data) => {
            let arr = [state] // Set TX as first state
            data.forEach(ele => { // Retrieve all states
              arr.push(ele.state)
            });
            
            arr.splice(arr.indexOf(state, 1), 1) // Remove duplicate TX
            setStates(arr)

            search() // Initial data row
          },
          (error) => {
            let arr = ['Failed to Fetch states']
            setStates(arr)
            console.log("Failed to fetch states names: " + error.toString())
          })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Set interval per sec for clock
  React.useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  // Page bacground
  useEffect(() => { 
    document.body.style.backgroundColor = '#f1f1f1' 
  }, [])

  // --------------------------------



  // Fetch data for State and Date
  function search() {
    fetch(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
        .then(response => response.json())
        .then(
          (data) => {
            data.forEach(ele => {
              let strDate = ele.date.toString()

              // Compare Dates
              if(parseInt(strDate.substring(0,4)) === date.getFullYear()){
                if(parseInt(strDate.substring(4,6)) === (date.getMonth()+1)){
                  if(parseInt(strDate.substring(6,8)) === date.getUTCDate()){

                    let tmp = [...historyQueue]
                    let color = 'green'
                    let bold = 'normal'
                    let prec = ele.positiveIncrease / (ele.positiveIncrease + ele.negativeIncrease)
                    
                    // Determine Danger Zone
                    if (prec < green) 
                      color = 'green'
                    else if (prec >= green && prec < red) 
                      color = 'orange'
                    else { 
                      color = 'red'; 
                      bold = 'bold' 
                    }
                    
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
          }
        ).catch(error => {
          let tmp = [...historyQueue]
          tmp.push({
            name: state.toString(),
            date: (date.getMonth()+1).toString() + '/' + date.getUTCDate().toString(),
            pos: 'Fetch Error',
            neg: 'Fetch Error',
            color: 'red',
            weight: 'normal'
          })

          if(tmp.length > max_history) tmp.shift()

          setQueue(tmp)
        })
  }


  return (
      <div dir='rtl'>
        <Header clock={clock} viewClock={viewClock} toggleViewClock={() => { setViewClock(!viewClock) }} />

        <div className='row'>
          <div className='rightcolumn'>
            <div className='card'>

              <p style={{  
                padding: '5px',
                textAlign: 'center', 
                fontWeight: 'bold' }}>
                  בחר תאריך ומדינה</p>

              <div style ={{ padding: '5px', textAlign: 'center' }}>
                <div style ={{ padding: '5px' }}><StateList set={setState} list={states} /></div>
                <DatePicker
                    className='date-input-field'
                    dateFormat="dd/MM/yyyy"
                    selected={date} 
                    onChange={setDate} 
                    minDate={minDate} 
                    maxDate={maxDate}
                    popperPlacement="left"
                    showPopperArrow={false} />
              </div>

              <div style={{ 
                padding: '5px',
                textAlign: 'center' }}>
                  <button onClick={search}>חפש</button>
                  </div>

              <div style={{ 
                padding: '5px',
                height: '20%', 
                width: '20%' }}>
                  <button onClick={() => { setViewHistory(!viewHistory) }}>
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
