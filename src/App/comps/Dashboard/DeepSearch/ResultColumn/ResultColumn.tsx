import React from 'react'
import './ResultColumn.scss'
import ResultRow from './ResultRow/ResultRow';

type Props = {
  pos: string,
  translates: Array<any>
}

export default function ResultColumn({ pos, translates }: Props) {

  return (
    <div className='DeepSearch__resultColumn'>
      <div className='DeepSearch__resultColumnPos'>
        <div>
          {pos}
        </div>
      </div>
      {translates.map(translate => <ResultRow text={translate.text} key={translate.text} />)}
    </div>
  )
}