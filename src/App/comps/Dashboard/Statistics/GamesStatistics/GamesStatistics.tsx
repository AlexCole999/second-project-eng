import React, { useState, useEffect } from 'react'
import './GamesStatistics.scss'
import { useSelector } from 'react-redux';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../API/firebase/firebaseConfig';

type Props = {}

export default function GamesStatistics({ }: Props) {

  const localStorageUserData = JSON.parse(localStorage.getItem('user'));

  const user = useSelector(state => state.user?.data?.email || localStorageUserData?.email || 'guest');

  const [gamestatistics, setgamestatistics] = useState({})

  function getGamesStatisticsFromFirebase() {
    getDoc(doc(db, "users", user, 'data', 'statistics')).then(x => setgamestatistics(x.data()))
  }

  useEffect(() => { getGamesStatisticsFromFirebase(); }, [])

  return (

    <div className='Statistics__GameStatistics'>

      <div>Статистика игр</div><br />

      <div>Напиши перевод правильно:</div>
      <div>Всего сыграно: {gamestatistics?.GuessTranslationByLettersGame?.gamesCount}</div>
      <div>Верно отгадано: {gamestatistics?.GuessTranslationByLettersGame?.correctGamesCount}</div>
      <br />

      <div>Напиши слово правильно:</div>
      <div>Всего сыграно: {gamestatistics?.GuessGamewordByLettersGame?.gamesCount}</div>
      <div>Верно отгадано: {gamestatistics?.GuessGamewordByLettersGame?.correctGamesCount}</div>
      <br />


    </div>

  )

}