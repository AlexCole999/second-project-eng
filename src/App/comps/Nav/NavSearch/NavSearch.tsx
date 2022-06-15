import './NavSearch.scss';
import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FiChevronsRight, FiRotateCw } from "react-icons/fi";
import yandexDictionaryKey from './../../../api/yandexDictionary/yandexDictionaryKey';
import debounce from './../../../functions/debounce';

import us from './flags/us.svg';
import de from './flags/de.svg';
import fr from './flags/fr.svg';
import es from './flags/es.svg';
import it from './flags/it.svg';
import nl from './flags/nl.svg';
import pl from './flags/pl.svg';
import bg from './flags/bg.svg';
import cz from './flags/cz.svg';

type Props = {}

export default function NavSearch({ }: Props) {

  const dispatch = useDispatch();

  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const mainResult = useSelector(state => state.yandexDictionaryTranslates.data[0])
  const [selectedLanguageFlag, setSelectedLanguageFlag] = useState(<img src={us} alt="" className="NavSearch__languageListElemFlag" />)

  const languageListTrigger = useRef(null);
  const languagesList = useRef(null);

  function openCloseLanguagesTrigger(): void {
    languagesList.current.classList.toggle('NavSearch__languagesList_opened');
    languageListTrigger.current.classList.toggle('NavSearch__languagesListTrigger_opened');
  }

  function yandexDictionaryRequest(input: string): void {

    if (input.match(/[a-zA-Zа-яА-Я]+$/)) {

      axios.get(
        'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
        + '?key='
        + yandexDictionaryKey
        + '&lang='
        + selectedLanguage
        + '&text='
        + input)
        .then(response => {
          dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
        })

    }

  }

  const debouncedYandexDictionaryRequest = debounce(yandexDictionaryRequest, 500)

  function selectLanguage(e) {

    const language = e.target.parentElement.childNodes[1].outerText;

    dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: language })

    languageFlagCheck(language)

  }

  function languageFlagCheck(language) {

    language == 'de-ru'
      ? setSelectedLanguageFlag(<img src={de} alt="" className="NavSearch__languageListElemFlag" />)
      : language == 'fr-ru'
        ? setSelectedLanguageFlag(<img src={fr} alt="" className="NavSearch__languageListElemFlag" />)
        : language == 'es-ru'
          ? setSelectedLanguageFlag(<img src={es} alt="" className="NavSearch__languageListElemFlag" />)
          : language == 'it-ru'
            ? setSelectedLanguageFlag(<img src={it} alt="" className="NavSearch__languageListElemFlag" />)
            : language == 'nl-ru'
              ? setSelectedLanguageFlag(<img src={nl} alt="" className="NavSearch__languageListElemFlag" />)
              : language == 'pl-ru'
                ? setSelectedLanguageFlag(<img src={pl} alt="" className="NavSearch__languageListElemFlag" />)
                : language == 'bg-ru'
                  ? setSelectedLanguageFlag(<img src={bg} alt="" className="NavSearch__languageListElemFlag" />)
                  : language == 'cs-ru'
                    ? setSelectedLanguageFlag(<img src={cz} alt="" className="NavSearch__languageListElemFlag" />)
                    : language == 'en-ru'
                      ? setSelectedLanguageFlag(<img src={us} alt="" className="NavSearch__languageListElemFlag" />)
                      : ""

  }

  return (

    <div className="NavSearch">

      <input placeholder="..."
        type="input"
        onChange={
          (e) => {
            debouncedYandexDictionaryRequest(e.target.value);
          }} />

      <div className="NavSearch__searchedMainWord">
        <div>
          {mainResult?.tr[0]?.text.toUpperCase()}
        </div>
      </div>

      <div className="NavSearch__languages">

        <div className="NavSearch__selectedLanguage">

          <div className="NavSearch__languageListElemFlag_selected">
            {selectedLanguageFlag}
          </div>

          <div>
            {selectedLanguage}
          </div>

          <div className="NavSearch__reverseButtonSelectedLanguage"
            onClick={
              (e) => {
                dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: selectedLanguage.split('-').reverse().join('-') });
                e.target.parentElement.classList.toggle('NavSearch__reverseButtonSelectedLanguage_reversed');
              }
            }>
            <FiRotateCw />
          </div>

        </div>

        <div className="NavSearch__languagesListTrigger"
          onClick={openCloseLanguagesTrigger}
          ref={languageListTrigger}>
          <FiChevronsRight size={20} />
        </div>

        <div className="NavSearch__languagesList"
          ref={languagesList}
          onClick={selectLanguage}>

          <div className="NavSearch__languageListElem">
            <img src={us} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              en-ru
            </div>
          </div>

          <div className="NavSearch__languageListElem">
            <img src={de} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              de-ru
            </div>
          </div>

          <div className="NavSearch__languageListElem">
            <img src={fr} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              fr-ru
            </div>
          </div>

          <div className="NavSearch__languageListElem">
            <img src={es} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              es-ru
            </div>
          </div>

          <div className="NavSearch__languageListElem">
            <img src={it} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              it-ru
            </div>
          </div>

          <div className="NavSearch__languageListElem">
            <img src={nl} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              nl-ru
            </div>
          </div>

          <div className="NavSearch__languageListElem">
            <img src={pl} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              pl-ru
            </div>
          </div>

          <div className="NavSearch__languageListElem">
            <img src={bg} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              bg-ru
            </div>
          </div>

          <div className="NavSearch__languageListElem">
            <img src={cz} alt="" className="NavSearch__languageListElemFlag" />
            <div className="NavSearch__languageListElemText">
              cs-ru
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
