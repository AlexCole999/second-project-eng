import React from 'react'
import './BaseStatistics.scss'
import { useSelector } from 'react-redux';

type Props = {}

export default function BaseStatistics({ }: Props) {

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)

  const wordsCount = Object.keys(allWordsFromFirebase).length
  let translatesCount = 0;
  let gameWordsCount = 0;

  Object.keys(allWordsFromFirebase).forEach(
    x => {
      translatesCount += allWordsFromFirebase[x].translates.length;
      gameWordsCount += 'gameword' in allWordsFromFirebase[x] ? 1 : 0
    }
  )

  return (

    <div className='Statistics__BaseStatistics'>

      <div>Статистика базы</div><br />

      <div>Слов в игре: {gameWordsCount}</div>
      <div>Слов в словаре: {wordsCount}</div>
      <div>Переводов в словаре: {translatesCount}</div>

    </div>

  )

}