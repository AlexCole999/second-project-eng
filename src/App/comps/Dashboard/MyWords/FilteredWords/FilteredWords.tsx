import React from 'react'
import './FilteredWords.scss'
import MyWordsElem from './MyWordsElem/MyWordsElem';

type Props = { filteredWords: any }

export default function FilteredWords({ filteredWords }: Props) {

  return (

    <div className='MyWords__words'>

      {
        filteredWords
          .map(
            mainWord =>
              <MyWordsElem
                word={mainWord}
                key={mainWord}
              />
          )
      }

    </div>

  )

}