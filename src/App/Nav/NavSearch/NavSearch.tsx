import React from 'react';
import './NavSearch.scss';
import { useState, useRef } from 'react';
import { FiChevronsRight } from "react-icons/fi";
import yandexDictionaryKey from '../../../API/yandexDictionaryKey';
import debounce from './../../../functions/debounce';


type Props = {}

export default function NavSearch({ }: Props) {

  const [selectedLanguage, setSelectedLanguage] = useState('ru-es')

  const languageList = useRef(null);
  const languageListTrigger = useRef(null);

  const languages = [
    "bg-ru", "cs-ru", "de-ru", "en-ru",
    "es-ru", "fr-ru", "it-ru", "nl-ru",
    "pl-ru", "pt-ru", "sv-ru", "tr-ru",
    "uk-ru", "zh-ru"]

  function openCloseLanguagesTrigger(): void {
    languageList.current.classList.toggle('NavSearch__languagesList_opened');
    languageListTrigger.current.classList.toggle('NavSearch__languagesListTrigger_opened');
  }

  const debouncedYandexDictionaryRequest = debounce(yandexDictionaryRequest, 500)

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
      <div className="NavSearch__searchedWords">
        {languages.map(x =>
          <div className="NavSearch__languageListElem">
            {x}
          </div>)}
      </div>
      <input placeholder="..."
        type="input"
        onChange={
          (e) => {
            debouncedYandexDictionaryRequest(e.target.value);
          }} />
      <div className="NavSearch__languages">
        <div className="NavSearch__selectedLanguage">
          {selectedLanguage}
        </div>
        <div className="NavSearch__languagesListTrigger" onClick={openCloseLanguagesTrigger} ref={languageListTrigger}>
          <FiChevronsRight size={20} />
        </div>
        <div className="NavSearch__languagesList" ref={languageList}>
          {languages.map(x =>
            <div className="NavSearch__languageListElem">
              {x}
            </div>)}
        </div>
      </div>
    </div>
  )
}
