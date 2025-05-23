import { useState, useEffect } from "react";
import type { Diary } from "./types";
import { getAllDiarys, createDiary } from './services/diaryService';

const App = () => {
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState<Diary>();
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today);
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const visibilities = ['great', 'good', 'ok', 'poor'];
  const weathers = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];

  useEffect(() => {
    getAllDiarys().then(data => {
      setDiarys(data)
    })
  }, [newDiary]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const clearFields = () => {
    setDate(today);
    setComment('');
    setVisibility('');
    setWeather('');
  }
  
  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({ 
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }).then(data => {
      console.log(data)
      if(data != undefined) {
        setDiarys(diarys.concat(data))
        setNewDiary(data)
        clearFields()
      }
    }).catch(error => {
      setError(error.message);
    }
  )}

  return (
    <div>
      <p style={{ color: 'red' }}>{error}</p>
      <form onSubmit={diaryCreation}>
        <div>
          <label><b>date: </b></label>
          <input
            value={date} type="date"
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label><b>visibility: </b></label>
          {visibilities.map(val => (
            <div key={val}>
              <input type="radio" name="visibility" value={val} onChange={() => setVisibility(val)} id={val} checked={visibility === val}/>
              <label htmlFor={val}>{val}</label>
            </div>
          ))}
        </div>
        <div>
          <label><b>weather: </b></label>
          {weathers.map(val => (
            <div key={val}>
              <input type="radio" name="weather" value={val} onChange={() => setWeather(val)} id={val} checked={weather === val}/>
              <label htmlFor={val}>{val}</label>
            </div>
          ))}
        </div>
        <div>
          <label><b>comment: </b></label>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
      <div>
        <h1>Diary entries</h1>
        {diarys.map(diary => (
          <div key={diary.id}>
           <h3>{diary.date}</h3>
           <p>visibility: {diary.visibility}</p>
           <p>weather: {diary.weather}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App;