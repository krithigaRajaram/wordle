import React from 'react'

export default function Result({turn,correct,solution}) {
  return (
    <div className='modal'>
        {correct && (
        <div>
            <h2>Congrats! You won the game in {turn} turns! :)</h2>
            <p>Solution:{solution}</p>
        </div>
        )}

{!correct && (
        <div>
            <h2> Better luck next time! :) </h2>
            <p>Solution:{solution}</p>
        </div>
        )}
    </div>
  )
}
