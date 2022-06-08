import React from 'react'
import './MyWordsElem.scss'
import { useSelector } from 'react-redux';
import capitalizeFirstLetter from './../../../../functions/capitalizeFirstLetter';
type Props = {
  fullWordsList: any,
  element: any,
  selectedbase: any
}

export default function MyWordsElem({ fullWordsList, element, selectedbase }: Props) {

  const basesList = useSelector(state => state.basesList?.data);

  return (
    <div className='MyWords__elem'>
      <div className='MyWords__elemMainWord'>
        <div>
          {capitalizeFirstLetter(fullWordsList[element]?.word)}
        </div>
      </div>
      <div>
        {
          fullWordsList[element]
            .translates
            .map(
              translate =>
                <div className='MyWords__elemTranslateRow' key={translate.translate}>
                  <div>
                    <div className='MyWords__elemTranslateWord'>
                      {capitalizeFirstLetter(translate.translate)}
                    </div>
                    <div className='MyWords__elemTranslateLanguage'>
                      {translate.language.split('-')[1]}
                    </div>
                  </div>
                  <button
                    className='MyWords__elemAppendButton'
                    onClick={() => { console.log(fullWordsList[element]?.word, translate.translate, selectedbase) }}
                  >
                  </button>
                </div>
            )
        }
      </div>
    </div>
  )
}