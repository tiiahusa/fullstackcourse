import { useState, useEffect } from "react";
import type { Diary } from "./types";
import { getAllDiarys, createDiary } from './services/diaryService';

const App = () => {
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState<Diary>();
  const [error, setError] = useState('');

  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

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
      }
    }).catch(error => {
      setError(error.message);
    }
  )}

  return (
    <div>
      <p style={{ color: 'red' }}>{error}</p>
      <form onSubmit={diaryCreation}>
        <p>
          date:
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </p>
        <p>
          visibility:
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </p>
        <p>
          weather:
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </p>
        <p>
          comment:
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </p>
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