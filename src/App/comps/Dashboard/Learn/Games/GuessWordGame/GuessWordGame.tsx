import React, { useState } from 'react'
import './GuessWordGame.scss'

type Props = {}

export default function GuessWordGame({ endgame }) {

  const [wordinbase, setwordinbase] = useState('')
  const [wordininput, setwordininput] = useState('')

  return (

    <div>

      <input type="text" onChange={(e) => setwordinbase(e.target.value)} placeholder='wordinbase' />
      <input type="text" onChange={(e) => setwordininput(e.target.value)} placeholder='wordininput' />

      <div>
        {
          wordinbase
            .split('')
            .map((elem, index) =>
              elem == wordininput[index]
                ? <span style={{ color: 'green' }}>{wordininput[index]}</span>
                : <span style={{ color: 'red' }} >{wordininput[index]}</span>
            )
        }
      </div>

      <button
        style={{ width: '200px', height: '50px', backgroundColor: 'red', borderRadius: '15px', color: 'white', border: 'none', margin: '15px 0px 15px 0px', fontSize: '1.2em', fontWeight: 'bold' }}
        onClick={endgame}
      >
        ЗАКОНЧИТЬ
      </button>

    </div>

  )

}