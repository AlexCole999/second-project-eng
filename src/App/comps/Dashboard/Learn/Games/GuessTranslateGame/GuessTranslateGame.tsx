import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './GuessTranslateGame.scss'

type Props = {}

export default function GuessTranslateGame({ endgame }) {

  const base = useSelector(state => state.allWordsFromFirebase)
  const gamebase = Object.keys(base).filter(x => base[x]?.gameword)
  const [changedWord, setchangedWord] = useState('')
  const [wordinbase, setwordinbase] = useState('')
  const [wordininput, setwordininput] = useState('')

  function getRandomWordGromBase() {
    return gamebase[Math.ceil(Math.random() * gamebase.length - 1)]
  }

  return (

    <div className='GuessTranslateGame'>

      <div className='GuessTranslateGame__body'>

        <button className='GuessTranslateGame__getNewWordButton' onClick={() => { setchangedWord(getRandomWordGromBase()) }}>
          НОВОЕ СЛОВО
        </button>

        <div className='GuessTranslateGame__gameword'>
          {
            changedWord
              .toUpperCase()
              .split('')
              .map(
                x =>
                  <span className='GuessTranslateGame__gamewordLetter'>
                    {x}
                  </span>)
          }
        </div>


        <div className='GuessTranslateGame__translate'>

          {base[changedWord]
            ?.gameword
            .toUpperCase()
            .split('')
            .map(x =>
              <div className='GuessTranslateGame__translateLetterBox'>
                <div className='GuessTranslateGame__translateLetter'>{x}</div>
              </div>
            )}

        </div>


        {/* <div>

          {
            wordinbase
              .split('')
              .map((elem, index) =>
                elem == wordininput[index]
                  ? <span style={{ color: 'green' }}>{wordininput[index]}</span>
                  : <span style={{ color: 'red' }} >{wordininput[index]}</span>
              )
          }

        </div> */}

        <button className='GuessTranslateGame__endGameButton' onClick={endgame}>
          STOP
        </button>

      </div>

    </div>

  )

}