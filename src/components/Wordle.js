import React, { useState,useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Result from './Result';

export default function Wordle({solution}) {
const {turn,guesses,correct,currentGuess,handleKeyUp,usedkeys} = useWordle(solution)
const [showResult,setShowResult]=useState(false)

useEffect(()=>{
    window.addEventListener('keyup',handleKeyUp)
    if(correct)
      {
        setTimeout(()=>setShowResult(true),2000)
        window.removeEventListener('keyup',handleKeyUp)
      }
      if(turn>5)
        {
          setTimeout(()=>setShowResult(true),2000)
          window.removeEventListener('keyup',handleKeyUp)
        }
    return () => window.removeEventListener('keyup',handleKeyUp)
},[handleKeyUp,correct,turn])

useEffect(()=>{
  console.log(turn ,guesses,correct)

},[turn,guesses,correct])
console.log(solution)
  return (
  <div>
    
   
    <Grid turn={turn} guesses={guesses} currentGuess={currentGuess}/>
    <Keypad usedkeys={usedkeys}/>
    {showResult && <Result turn={turn} correct={correct} solution={solution} />}
  </div>
    
  )
}
