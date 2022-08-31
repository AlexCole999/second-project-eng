import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import './GuessGamewordByLettersGame.scss'
import { AiFillCheckCircle, AiFillCheckSquare, AiFillPlaySquare } from "react-icons/ai";
import { FaTimesCircle } from 'react-icons/fa';

type Props = {}

export default function GuessGamewordByLettersGame({ endgame }) {

  const base = useSelector(state => state.allWordsFromFirebase)

  const gamebase = Object.keys(base).filter(x => base[x]?.gameword)

  const [selectedWord, setselectedword] = useState('')
  const [input, setinput] = useState('')
  const [gamechecked, setgamechecked] = useState(false)

  const inputtranslate = useRef()

  const inputBorderColor =
    gamechecked
      ? (selectedWord == input ? 'green' : 'red')
      : 'black'

  function setLowerCaseInput(event) { setinput(event.target.value.toLowerCase()) }

  function checkInputEnterKeyDown(event) {
    if (event.nativeEvent.key == "Enter") { gamechecked ? startNewGame() : setgamechecked(true) }
  }

  function getRandomWordFromBase() {
    return gamebase[Math.ceil(Math.random() * gamebase.length - 1)]
  }

  function startNewGame() {
    setselectedword(getRandomWordFromBase());
    setgamechecked(false);
    setinput('')
    inputtranslate.current.value = '';
  }

  useEffect(startNewGame, [])

  return (

    <div className='GuessGamewordByLettersGame'>

      <div className='GuessGamewordByLettersGame__body'>

        <div className='GuessGamewordByLettersGame__gameword'>

          {base[selectedWord]?.gameword}

          {
            gamechecked
              ? (selectedWord == input
                ? <AiFillCheckCircle className='GuessGamewordByLettersGame__resultGameIcon' style={{ color: 'green' }} />
                : <FaTimesCircle className='GuessGamewordByLettersGame__resultGameIcon' style={{ color: 'red' }} />
              )
              : ''
          }

        </div>

        <div className='GuessGamewordByLettersGame__translate'>

          {
            selectedWord
              .split('')
              .map((letter, i) =>

                gamechecked
                  ? <div className='GuessGamewordByLettersGame__translateLetterBox' style={{ backgroundColor: letter == input[i] ? 'green' : 'red' }} key={i}>
                    <div className='GuessGamewordByLettersGame__translateLetter'>{letter}</div>
                  </div>

                  : <div className='GuessGamewordByLettersGame__translateLetterBox' key={i}>
                    <div className='GuessGamewordByLettersGame__translateLetter'>{input[i]}</div>
                  </div>

              )
          }

        </div>

        <div className='GuessGamewordByLettersGame__inputMenu'>

          <input className='GuessGamewordByLettersGame__input'
            placeholder='...'
            type="text"
            ref={inputtranslate}
            style={{ borderColor: inputBorderColor }}
            onChange={setLowerCaseInput}
            onKeyDown={checkInputEnterKeyDown}
          />

        </div>

        <div className='GuessGamewordByLettersGame__buttons'>
          {
            !gamechecked
              ? <AiFillPlaySquare className='GuessGamewordByLettersGame__buttonsElem_disabled' />
              : <AiFillPlaySquare className='GuessGamewordByLettersGame__buttonsElem' onClick={startNewGame} />

          }


          {
            gamechecked
              ? <AiFillCheckSquare className='GuessGamewordByLettersGame__buttonsElem_disabled' />
              : <AiFillCheckSquare className='GuessGamewordByLettersGame__buttonsElem' onClick={() => { setgamechecked(true) }} />
          }

        </div>

        <button className='GuessGamewordByLettersGame__endGameButton' onClick={endgame}>
          STOP
        </button>

      </div>

    </div >

  )

}