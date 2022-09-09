import React from 'react'
import './GameElem.scss'

type Props = {}

export default function GameElem({ title, description, startgame, available }) {

  return (

    <div className='Learn__gameElem'>

      <div className='Learn__gameTitle'>
        {title}
      </div>

      <div className='Learn__gameDescription' >
        {description}
      </div>

      {
        available
          ? <button className='Learn__gameStartButton' onClick={startgame}>
            ИГРАТЬ
          </button>
          : <button className='Learn__gameStartButton' style={{ backgroundColor: 'grey', cursor: 'not-allowed' }}>
            ИГРАТЬ
          </button>
      }

    </div>

  )

}