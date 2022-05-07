import React from 'react'
import { useSelector } from 'react-redux';
import './DeepSearch.scss';
import ResultColumn from './ResultColumn/ResultColumn';

type Props = {}

export default function DeepSearch({ }: Props) {

  const results = useSelector(state => state.yandexDictionaryTranslates.data);



  return (
    <div className='DeepSearch'>
      DeepSearch
      <div className='DeepSearch__results'>
        {results == undefined
          ? "none"
          : results.map(resultColumn =>
            <ResultColumn pos={resultColumn.pos} translates={resultColumn.tr} />
          )}
      </div>
    </div >
  )
}
