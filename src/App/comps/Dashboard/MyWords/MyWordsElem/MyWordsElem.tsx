import React from 'react'
import './MyWordsElem.scss'

type Props = {}

export default function MyWordsElem({ }: Props) {
  return (
    <div className='MyWords__elem'>
      <div className='MyWords__elemMainWord'>
        {words[x]?.word}
      </div>
      <div>
        {
          words[x]
            .translates
            .map(x =>
              <div>
                <div className='MyWords__elemTranslateWord'>
                  {x.translate}
                </div>
                <div className='MyWords__elemTranslateLanguage'>
                  {x.language.split('-')[1]}
                </div>
              </div>)
        }
      </div>
    </div>
  )
}