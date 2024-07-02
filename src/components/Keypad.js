import React, {useState, useEffect } from 'react'

export default function Keypad({usedkeys}) {
    const [letters,setLetters]=useState(null)
    useEffect(()=>{
        fetch('http://localhost:8000/letters')
        .then(res=>res.json())
        .then(data=>{
            setLetters(data)
        })

    },[])
  return (
    <div className="keypad">
    {letters && letters.map(l => {
        const color=usedkeys[l.key]
      return (
        <div key={l.key} className={color}>{l.key}</div>
      )
    })}
  </div>
  )
}
