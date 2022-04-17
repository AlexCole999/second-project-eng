import React from 'react';
import './NavSearch.scss';
import { useState, useRef } from 'react';
import { FiChevronsRight } from "react-icons/fi";
import yandexDictionaryKey from '../../../API/yandexDictionaryKey';
import ReactCountryFlag from "react-country-flag"
import debounce from './../../../functions/debounce';


type Props = {}

export default function NavSearch({ }: Props) {

  const [selectedLanguage, setSelectedLanguage] = useState('en-ru')

  const languagesList = useRef(null);
  const languageListTrigger = useRef(null);

  const languages = ["cs-ru", "pt-ru", "sv-ru", "tr-ru", "uk-ru", "zh-ru"]

  function openCloseLanguagesTrigger(): void {
    languagesList.current.classList.toggle('NavSearch__languagesList_opened');
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
        someresults
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
        <div className="NavSearch__languagesList"
          ref={languagesList}
          onClick={
            (e) => {
              let countryFlag = e.target.parentElement.childNodes[0];
              let language = e.target.parentElement.childNodes[1].outerText;
              console.log(e.target.parentElement.childNodes);
              setSelectedLanguage(language);
            }
          }
        >
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="US" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              en-ru
            </div>
          </div>
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="DE" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              de-ru
            </div>
          </div>
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="FR" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              fr-ru
            </div>
          </div>
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="ES" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              es-ru
            </div>
          </div>
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="IT" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              it-ru
            </div>
          </div>
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="NL" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              nl-ru
            </div>
          </div>
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="PL" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              pl-ru
            </div>
          </div>
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="BG" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              bg-ru
            </div>
          </div>
          <div className="NavSearch__languageListElem">
            <ReactCountryFlag className="NavSearch__languageListElemFlag" countryCode="CZ" style={{ width: '35px', height: '35px' }} svg />
            <div className="NavSearch__languageListElemText">
              cs-ru
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
