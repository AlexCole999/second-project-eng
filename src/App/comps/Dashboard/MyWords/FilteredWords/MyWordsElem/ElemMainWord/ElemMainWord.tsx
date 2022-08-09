import React from 'react'
import './ElemMainWord.scss'
import capitalizeFirstLetter from './../../../../../../functions/capitalizeFirstLetter';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

type Props = { word: string }

export default function ElemMainWord({ word }) {

  const history = useNavigate()

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase);

  return (

    <div className='MyWords__elemMainWord'>

      <div onClick={() => history(`../DeepSearch/${allWordsFromFirebase[word]?.word}`)}>

        {capitalizeFirstLetter(allWordsFromFirebase[word]?.word)}

        <div className='MyWords__elemTranslateLanguage'>
          {allWordsFromFirebase[word].translates[0].language.split('-')[0]}
        </div>

      </div>

    </div>

  )

}