import React from 'react'
import './GameElem.scss'

type Props = {}

export default function GameElem({ title, description, startgame }) {

  return (

    <div className='Learn__gameElem'>

      <div className='Learn__gameTitle'>
        {title}
      </div>

      <div className='Learn__gameDescription' >
        {description}
      </div>


      <button className='Learn__gameStartButton' onClick={startgame}>
        ИГРАТЬ
      </button>

    </div>

  )

}