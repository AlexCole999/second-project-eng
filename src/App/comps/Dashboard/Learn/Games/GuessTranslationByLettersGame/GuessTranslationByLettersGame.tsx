import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import './GuessTranslationByLettersGame.scss'
import { AiFillCheckCircle, AiFillCheckSquare, AiFillPlaySquare } from "react-icons/ai";
import { FaTimesCircle } from 'react-icons/fa';

type Props = {}

export default function GuessTranslationByLettersGame({ endgame }) {

  const base = useSelector(state => state.allWordsFromFirebase)

  const gamebase = Object.keys(base).filter(x => base[x]?.gameword)

  const [selectedWord, setselectedword] = useState('')
  const [input, setinput] = useState('')
  const [gamechecked, setgamechecked] = useState(false)

  const inputtranslate = useRef()

  function getRandomWordGromBase() {
    return gamebase[Math.ceil(Math.random() * gamebase.length - 1)]
  }

  function startNewGame() {
    setselectedword(getRandomWordGromBase());
    setgamechecked(false);
    setinput('')
    inputtranslate.current.value = '';
  }

  useEffect(startNewGame, [])

  return (

    <div className='GuessTranslateGame'>

      <div className='GuessTranslateGame__body'>

        <div className='GuessTranslateGame__gameword'>

          {selectedWord.toUpperCase()}

          {
            gamechecked
              ? (base[selectedWord]?.gameword == inputtranslate.current.value
                ? <AiFillCheckCircle className='GuessTranslateGame__resultGameIcon' style={{ color: 'green' }} />
                : <FaTimesCircle className='GuessTranslateGame__resultGameIcon' style={{ color: 'red' }} />
              )
              : ''
          }

        </div>


        <div className='GuessTranslateGame__translate'>

          {
            base[selectedWord]
              ?.gameword
              .split('')
              .map((letter, i) =>

                gamechecked
                  ? <div className='GuessTranslateGame__translateLetterBox' style={{ backgroundColor: letter == input[i] ? 'green' : 'red' }}>
                    <div className='GuessTranslateGame__translateLetter'>{letter}</div>
                  </div>

                  : <div className='GuessTranslateGame__translateLetterBox'>
                    <div className='GuessTranslateGame__translateLetter'>{input[i]}</div>
                  </div>

              )
          }

        </div>

        <div className='GuessTranslateGame__inputMenu'>

          <input className='GuessTranslateGame__input' type="text"
            ref={inputtranslate}
            style={{
              border: `4px solid 
              ${gamechecked
                  ? (
                    base[selectedWord]?.gameword == inputtranslate?.current?.value
                      ? 'green'
                      : 'red')
                  : 'black'
                }`
            }}
            onChange={() => setinput(inputtranslate.current.value)}
          />

        </div>

        <div className='GuessTranslateGame__topButtons'>

          <AiFillPlaySquare className='GuessTranslateGame__topButtonsElem' onClick={startNewGame} />

          {
            selectedWord
              ? <AiFillCheckSquare className='GuessTranslateGame__topButtonsElem' onClick={() => { setgamechecked(true) }} />
              : ''
          }

        </div>

        <button className='GuessTranslateGame__endGameButton' onClick={endgame}>
          STOP
        </button>

      </div>

    </div >

  )

}