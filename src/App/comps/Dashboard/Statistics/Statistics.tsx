import React, { useState, useEffect } from 'react'
import './Statistics.scss'
import { useSelector } from 'react-redux';
import { db } from '../../../API/firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import BaseStatistics from './BaseStatistics/BaseStatistics';

type Props = {}

export default function Statistics({ }: Props) {

  const localStorageUserData = JSON.parse(localStorage.getItem('user'));

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const user = useSelector(state => state.user?.data?.email || localStorageUserData?.email || 'guest');

  const [gamestatistics, setgamestatistics] = useState({})

  function getStatisticsFromFirebase() {
    getDoc(doc(db, "users", user, 'data', 'statistics')).then(x => setgamestatistics(x.data()))
  }

  useEffect(() => {
    getStatisticsFromFirebase();
  }, [])

  return (

    <div className='Statistics'>

      <BaseStatistics />

      <div>

        <div>Статистика игр</div><br />

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