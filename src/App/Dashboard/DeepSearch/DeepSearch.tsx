import React from 'react'
import { useSelector } from 'react-redux';


type Props = {}

export default function DeepSearch({ }: Props) {
  const some = useSelector(state => state.yandexDictionaryTranslates.data?.def)
  return (
    <div onClick={() => some.map(x => console.log(x))}>

      DeepSearch
      {some == undefined ? "none" : some.map(x => x.text)}
    </div>
  )
}
