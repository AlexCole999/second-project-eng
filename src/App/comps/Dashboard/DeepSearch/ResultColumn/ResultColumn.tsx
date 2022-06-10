import React from 'react'
import './ResultColumn.scss'
import ResultRow from './ResultRow/ResultRow';
import capitalizeFirstLetter from './../../../../functions/capitalizeFirstLetter';

type Props = {
  pos: string,
  translates: Array<any>
}

export default function ResultColumn({ pos, translates }: Props) {

  return (
    <div className='DeepSearch__resultColumn'>
      <div className='DeepSearch__resultColumnPos'>
        <div>
          {capitalizeFirstLetter(pos)}
        </div>
      </div>
      {
        translates.map(translate =>
          <ResultRow
            translate={translate.text}
            examples={translate.ex || []}
            sameWords={translate.mean || []}
            synonyms={translate.syn || []}
            frequency={translate.fr || ''}
            key={translate.text}
          />)
      }
    </div>
  )
}