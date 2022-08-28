import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import './GuessTranslateGame.scss'

type Props = {}

export default function GuessTranslateGame({ endgame }) {

  const base = useSelector(state => state.allWordsFromFirebase)
  const gamebase = Object.keys(base).filter(x => base[x]?.gameword)
  const [changedWord, setchangedWord] = useState('')
  const [input, setinput] = useState('')
  const [gamechecked, setgamechecked] = useState(false)

  const [wordinbase, setwordinbase] = useState('')
  const [wordininput, setwordininput] = useState('')

  const inputtranslate = useRef()

  function getRandomWordGromBase() {
    return gamebase[Math.ceil(Math.random() * gamebase.length - 1)]
  }

  return (

    <div className='GuessTranslateGame'>

      <div className='GuessTranslateGame__body'>

        <button className='GuessTranslateGame__getNewWordButton' onClick={() => {
          setchangedWord(getRandomWordGromBase());
          setgamechecked(false);
          setinput('')
          inputtranslate.current.value = '';

        }
        }>
          НОВОЕ СЛОВО
        </button>

        <div className='GuessTranslateGame__gameword'>
          {changedWord.toUpperCase()}
        </div>


        <div className='GuessTranslateGame__translate'>

          {
            base[changedWord]
              ?.gameword
              .split('')
              .map((x, i) =>
                gamechecked
                  ?
                  (x == input[i]
                    ? <div className='GuessTranslateGame__translateLetterBox'>
                      <div className='GuessTranslateGame__translateLetter'>{x}</div>
                    </div>
                    : <div className='GuessTranslateGame__translateLetterBox' style={{ backgroundColor: 'red' }} onClick={() => { console.log(x == input[i], x, input[i]) }}>
                      <div className='GuessTranslateGame__translateLetter'>{x}</div>
                    </div>
                  )
                  : <div className='GuessTranslateGame__translateLetterBox'>
                    <div className='GuessTranslateGame__translateLetter'>{input[i]}</div>
                  </div>
              )
          }

        </div>

        <input className='GuessTranslateGame__input' type="text" ref={inputtranslate}
          onChange={() => setinput(inputtranslate.current.value)}
        />



        <button className='GuessTranslateGame__getNewWordButton'
          onClick={() => {
            console.log(inputtranslate.current.value, base[changedWord]?.gameword, base[changedWord]?.gameword == inputtranslate.current.value);
            setgamechecked(true)
          }}>
          ПРОВЕРИТЬ
        </button>

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

    </div >

  )

}