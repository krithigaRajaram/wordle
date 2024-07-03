import { useState,useEffect } from 'react';
import './App.css';
import Wordle from './components/Wordle';




function App() {

  const [solution,setSolution]=useState(null);
  useEffect(()=>{
  fetch("https://solution-jr7b.onrender.com/solution")
  .then(res=>res.json())
  .then(data=> {
    const randomSolution= data[Math.floor(Math.random()*data.length)]
    console.log(randomSolution);
    setSolution(randomSolution.name)
  })
  },[setSolution])
  


  return (
    <div className="App">
     <h2>Wordle</h2>
     <p>Guess the word!</p>
     {solution && <Wordle solution={solution} />}
     
     
    </div>
  );
}

export default App;
