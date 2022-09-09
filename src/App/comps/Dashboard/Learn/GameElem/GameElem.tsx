import React from 'react'
import './GameElem.scss'
import { AiFillPlaySquare } from "react-icons/ai";

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
            <AiFillPlaySquare size={50} />
          </button>
          : <button className='Learn__gameStartButton' style={{ backgroundColor: 'grey', cursor: 'not-allowed' }}>
            <AiFillPlaySquare size={50} />
          </button>
      }

    </div>

  )

}