import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import './GuessTranslationByLettersGame.scss'
import { AiFillCheckCircle, AiFillCheckSquare, AiFillPlaySquare } from "react-icons/ai";
import { FaTimesCircle } from 'react-icons/fa';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig';

type Props = {}

export default function GuessTranslationByLettersGame({ endgame }) {

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
      ? (base[selectedWord]?.gameword == input ? 'green' : 'red')
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

    const statistics = await getDoc(doc(db, "users", user, 'data', 'statistics'));
    const currentStatistics = statistics.data()

    if (currentStatistics == undefined) {
      await setDoc(doc(db, "users", user, 'data', 'statistics'), { GuessTranslationByLettersGame: { gamesCount: 1, correctGamesCount: selectedWord == input ? 1 : 0 } });
    }

    if (currentStatistics['GuessTranslationByLettersGame'] == undefined) {
      await setDoc(doc(db, "users", user, 'data', 'statistics'), { ...currentStatistics, GuessTranslationByLettersGame: { gamesCount: 1, correctGamesCount: base[selectedWord]?.gameword == input ? 1 : 0 } });
    }

    if (currentStatistics !== undefined) {
      const nextGamesCount = currentStatistics.GuessTranslationByLettersGame.gamesCount + 1;
      const nextCorrectGamesCount = currentStatistics.GuessTranslationByLettersGame.correctGamesCount + (base[selectedWord]?.gameword == input ? 1 : 0);
      await setDoc(doc(db, "users", user, 'data', 'statistics'), { ...currentStatistics, GuessTranslationByLettersGame: { gamesCount: nextGamesCount, correctGamesCount: nextCorrectGamesCount } });
    }

  }

  useEffect(startNewGame, [])

  return (

    <div className='GuessTranslationByLettersGame'>

      <div className='GuessTranslationByLettersGame__body'>

        <div className='GuessTranslationByLettersGame__gameword'>

          {selectedWord}

          {
            gamechecked
              ? (base[selectedWord]?.gameword == input
                ? <AiFillCheckCircle className='GuessTranslationByLettersGame__resultGameIcon' style={{ color: 'green' }} />
                : <FaTimesCircle className='GuessTranslationByLettersGame__resultGameIcon' style={{ color: 'red' }} />
              )
              : ''
          }

        </div>

        <div className='GuessTranslationByLettersGame__translate'>

          {
            base[selectedWord]
              ?.gameword
              .split('')
              .map((letter, i) =>

                gamechecked
                  ? <div className='GuessTranslationByLettersGame__translateLetterBox' style={{ backgroundColor: letter == input[i] ? 'green' : 'red' }} key={i}>
                    <div className='GuessTranslationByLettersGame__translateLetter'>{letter}</div>
                  </div>

                  : <div className='GuessTranslationByLettersGame__translateLetterBox' key={i}>
                    <div className='GuessTranslationByLettersGame__translateLetter'>{input[i]}</div>
                  </div>

              )
          }

        </div>

        <div className='GuessTranslationByLettersGame__inputMenu'>

          <input className='GuessTranslationByLettersGame__input'
            placeholder='...'
            type="text"
            ref={inputtranslate}
            style={{ borderColor: inputBorderColor }}
            onChange={setLowerCaseInput}
            onKeyDown={checkInputEnterKeyDown}
          />

        </div>

        <div className='GuessTranslationByLettersGame__buttons'>
          {
            !gamechecked
              ? <AiFillPlaySquare className='GuessTranslationByLettersGame__buttonsElem_disabled' />
              : <AiFillPlaySquare className='GuessTranslationByLettersGame__buttonsElem' onClick={startNewGame} />

          }


          {
            gamechecked
              ? <AiFillCheckSquare className='GuessTranslationByLettersGame__buttonsElem_disabled' />
              : <AiFillCheckSquare className='GuessTranslationByLettersGame__buttonsElem' onClick={() => { sendStatistics(); setgamechecked(true) }} />
          }

        </div>

        <div className='GuessTranslationByLettersGame__endGameButton' onClick={endgame} >
          <AiOutlinePoweroff className='GuessTranslationByLettersGame__endGameButtonIcon' />
        </div>

      </div>

    </div >

  )

}