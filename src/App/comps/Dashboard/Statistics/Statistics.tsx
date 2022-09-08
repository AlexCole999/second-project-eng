import React, { useState, useEffect } from 'react'
import './Statistics.scss'
import { useSelector } from 'react-redux';
import { db } from '../../../API/firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

type Props = {}

export default function Statistics({ }: Props) {

  const localStorageUserData = JSON.parse(localStorage.getItem('user'));

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const user = useSelector(state => state.user?.data?.email || localStorageUserData?.email || 'guest');

  const [gamestatistics, setgamestatistics] = useState({})

  const wordsCount = Object.keys(allWordsFromFirebase).length
  let translatesCount = 0;
  let gameWordsCount = 0;

  Object.keys(allWordsFromFirebase).forEach(
    x => {
      translatesCount += allWordsFromFirebase[x].translates.length;
      gameWordsCount += 'gameword' in allWordsFromFirebase[x] ? 1 : 0
    }
  )

  function getStatisticsFromFirebase() {
    getDoc(doc(db, "users", user, 'data', 'statistics')).then(x => setgamestatistics(x.data()))
  }

  useEffect(() => {
    getStatisticsFromFirebase();
  }, [])

  return (

    <div className='Statistics'>

      <div>

        <div>Статистика базы:</div><br />

        <div>Слов в игре: {gameWordsCount}</div>
        <div>Слов в словаре: {wordsCount}</div>
        <div>Переводов в словаре: {translatesCount}</div>

      </div><br />

      <div>

        <div>Статистика игр:</div><br />

        <div>Напиши слово правильно:</div>
        <div>Всего сыграно: {gamestatistics?.GuessGamewordByLettersGame?.gamesCount}</div>
        <div>Верно отгадано: {gamestatistics?.GuessGamewordByLettersGame?.correctGamesCount}</div>
        <br />

        <div>Напиши перевод правильно:</div>
        <div>Всего сыграно: {gamestatistics?.GuessTranslationByLettersGame?.gamesCount}</div>
        <div>Верно отгадано: {gamestatistics?.GuessTranslationByLettersGame?.correctGamesCount}</div>
        <br />

      </div>

    </div>

  )

}