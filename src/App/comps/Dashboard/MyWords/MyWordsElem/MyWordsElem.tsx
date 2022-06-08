import React from 'react'
import './MyWordsElem.scss'

type Props = {
  fullWordsList: any,
  element: any
}

export default function MyWordsElem({ fullWordsList, element }: Props) {
  return (
    <div className='MyWords__elem'>
      <div className='MyWords__elemMainWord'>
        {fullWordsList[element]?.word}
      </div>
      <div>
        {
          fullWordsList[element]
            .translates
            .map(translate =>
              <div key={translate.translate}>
                <div className='MyWords__elemTranslateWord'>
                  {translate.translate}
                </div>
                <div className='MyWords__elemTranslateLanguage'>
                  {translate.language.split('-')[1]}
                </div>
              </div>)
        }
      </div>
    </div>
  )
}