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
        : "not none"}
    </div>
  )
}
