import React, { useState, useEffect } from 'react'
import './Statistics.scss'
import { useSelector } from 'react-redux';

type Props = {}

export default function Statistics({ }: Props) {
  console.log('render')

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)

  const wordsCount = Object.keys(allWordsFromFirebase).length
  const [translatesCount, settranslatesCount] = useState(0)
  const [gameWordsCount, setgameWordsCount] = useState(0)

  function translatesCounter() {
    let translatesCount = 0;
    Object.keys(allWordsFromFirebase).forEach(x => translatesCount += allWordsFromFirebase[x].translates.length)
    settranslatesCount(translatesCount)
  }

  function gameWordsCounter() {
    let gameWordsCount = 0;
    Object.keys(allWordsFromFirebase).forEach(x => gameWordsCount += 'gameword' in allWordsFromFirebase[x] ? 1 : 0)
    setgameWordsCount(gameWordsCount)
  }

  useEffect(() => {
    translatesCounter()
    gameWordsCounter()
  })

  return (

    <div className='Statistics'>

      <div>Слов в игре: {gameWordsCount}</div>
      <div>Слов в словаре: {wordsCount}</div>
      <div>Переводов в словаре: {translatesCount}</div>

    </div>

  )

}