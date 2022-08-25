import React, { useState, useEffect } from 'react'
import './Statistics.scss'
import { useSelector } from 'react-redux';

type Props = {}

export default function Statistics({ }: Props) {
  console.log('render')

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)

  const wordsCount = Object.keys(allWordsFromFirebase).length
  const [translatesCount, settranslatesCount] = useState(0)

  function translatesCounter() {
    let translatesCount = 0;
    Object.keys(allWordsFromFirebase).forEach(x => translatesCount += allWordsFromFirebase[x].translates.length)
    settranslatesCount(translatesCount)
  }



  useEffect(() => { translatesCounter() })

  return (
    <div className='Statistics'>

      <div>Количество слов в словаре: {wordsCount}</div>
      <div>Количество переводов в словаре: {translatesCount}</div>

    </div>
  )
}