import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import './GuessGamewordByLettersGame.scss'
import { AiFillCheckCircle, AiFillCheckSquare, AiFillPlaySquare } from "react-icons/ai";
import { FaTimesCircle } from 'react-icons/fa';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig';

type Props = {}

export default function GuessGamewordByLettersGame({ endgame }) {

  const localStorageUserData = JSON.parse(localStorage.getItem('user'));

  const base = useSelector(state => state.allWordsFromFirebase)
  const user = useSelector(state => state.user?.data?.email || localStorageUserData?.email || 'guest');

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
    if (event.nativeEvent.key == "Enter") { gamechecked ? startNewGame() : (setgamechecked(true), sendStatistics()) }
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

  async function sendStatistics() {

    setgamechecked(true);

    const statistics = await getDoc(doc(db, "users", user, 'data', 'statistics'));
    const currentStatistics = statistics.data()

    if (currentStatistics == undefined) {
      await setDoc(doc(db, "users", user, 'data', 'statistics'), { GuessGamewordByLettersGame: { gamesCount: 1, correctGamesCount: selectedWord == input ? 1 : 0 } });
    }

    if (currentStatistics !== undefined) {
      const nextGamesCount = currentStatistics.GuessGamewordByLettersGame.gamesCount + 1;
      const nextCorrectGamesCount = currentStatistics.GuessGamewordByLettersGame.correctGamesCount + (selectedWord == input ? 1 : 0);
      await setDoc(doc(db, "users", user, 'data', 'statistics'), { ...currentStatistics, GuessGamewordByLettersGame: { gamesCount: nextGamesCount, correctGamesCount: nextCorrectGamesCount } });
    }

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

        <div className='GuessGamewordByLettersGame__guessword'>

          {
            selectedWord
              .split('')
              .map((letter, i) =>

                gamechecked
                  ? <div className='GuessGamewordByLettersGame__guesswordLetterBox' style={{ backgroundColor: letter == input[i] ? 'green' : 'red' }} key={i}>
                    <div className='GuessGamewordByLettersGame__guesswordLetter'>{letter}</div>
                  </div>

                  : <div className='GuessGamewordByLettersGame__guesswordLetterBox' key={i}>
                    <div className='GuessGamewordByLettersGame__guesswordLetter'>{input[i]}</div>
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
              : <AiFillCheckSquare className='GuessGamewordByLettersGame__buttonsElem'
                onClick={() => sendStatistics()} />
          }

        </div>

        <div className='GuessGamewordByLettersGame__endGameButton' onClick={endgame} >
          <AiOutlinePoweroff className='GuessGamewordByLettersGame__endGameButtonIcon' />
        </div>

      </div>

    </div >

  )

}