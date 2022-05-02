import React from 'react'
import { useSelector } from 'react-redux';


type Props = {}

export default function DeepSearch({ }: Props) {
  const some = useSelector(state => state.yandexDictionaryTranslates.data);
  return (
    <div >

      DeepSearch
      <button onClick={() => {
        console.log(some);
      }
      }>

      </button>
      {some == undefined
        ? "none"
        : some.map(x =>
          <div style={{ border: '1px solid black' }}>
            {x.pos};
            {x.tr.map(x => <div>{x.text}</div>)}
          </div>)}
    </div>
  )
}
