import React from 'react';
import { useState } from 'react';
import yandexDictionaryKey from '../../../API/yandexDictionaryKey';
import debounce from './../../../functions/debounce';
import './NavSearch.scss';

type Props = {}

export default function NavSearch({ }: Props) {

  const [language, setlanguage] = useState('en-ru')

  const debouncedRequest = debounce(yandexDictionaryRequest, 500)

  function yandexDictionaryRequest(input: string): void {
    if (input.match(/\w+$/)) {
      fetch
        ('https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
          + '?key='
          + yandexDictionaryKey
          + '&lang='
          + language
          + '&text='
          + input)
        .then(x => x.json())
        .then(x => console.log(x));
    }
  }
  return (
    <div className="NavSearch">
      <input placeholder="..."
        type="input"
        onChange={
          (e) => {
            debouncedRequest(e.target.value);
          }} />
      <div className="languange">ENG</div>
    </div>
  )
}
