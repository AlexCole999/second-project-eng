import React from 'react';
import { useState } from 'react';
import yandexDictionaryKey from '../../../API/yandexDictionaryKey';
import debounce from './../../../functions/debounce';
import './NavSearch.scss';

type Props = {}

export default function NavSearch({ }: Props) {

  const languages = [
    "bg-ru", "cs-ru", "de-ru", "en-ru",
    "es-ru", "fr-ru", "it-ru", "nl-ru",
    "pl-ru", "pt-ru", "sv-ru", "tr-ru",
    "uk-ru", "zh-ru"]

  const [selectedLanguage, setSelectedLanguage] = useState('ru-es')

  const debouncedRequest = debounce(yandexDictionaryRequest, 500)

  function yandexDictionaryRequest(input: string): void {
    if (input.match(/[a-zA-Zа-яА-Я]+$/)) {
      fetch
        ('https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
          + '?key='
          + yandexDictionaryKey
          + '&lang='
          + selectedLanguage
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
      <div className="NavSearch__languages">
        <div className="NavSearch__selectedLanguage">
          {selectedLanguage}
        </div>
        <div className="NavSearch__languageList">
          {languages.map(x => <div className="NavSearch__languageListElem">{x}</div>)}
        </div>
      </div>
    </div>
  )
}
