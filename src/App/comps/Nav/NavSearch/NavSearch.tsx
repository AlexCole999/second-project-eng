import './NavSearch.scss';
import React from 'react';
import { useState, useRef } from 'react';
import debounce from './../../../functions/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronsRight, FiRotateCw } from "react-icons/fi";
import yandexDictionaryRequest from './../../../Api/yandexDictionary/yandexDictionaryRequest';
import { AiOutlineClose } from "react-icons/ai";
import SearchedMainWord from './SearchedMainWord/SearchedMainWord';

import us from '../../../source/flags/us.svg';
import de from '../../../source/flags/de.svg';
import fr from '../../../source/flags/fr.svg';
import es from '../../../source/flags/es.svg';
import it from '../../../source/flags/it.svg';
import nl from '../../../source/flags/nl.svg';
import pl from '../../../source/flags/pl.svg';
import bg from '../../../source/flags/bg.svg';
import cz from '../../../source/flags/cz.svg';

type Props = {}

export default function NavSearch({ }: Props) {


  const dispatch = useDispatch();

  const [selectedLanguageFlag, setSelectedLanguageFlag] = useState(<img src={us} alt="" className="NavSearch__languageListElemFlag" />)
  const [reversedTranslateDirection, setReversedTranslateDirection] = useState(false)
  const [inputstate, setinputstate] = useState('')

  const selectedLanguage = useSelector(state => state.selectedLanguage)

  const inputsearch = useRef(null);
  const languageListTrigger = useRef(null);
  const languagesList = useRef(null);

  function openCloseLanguagesListTrigger(): void {
    languagesList.current.classList.toggle('NavSearch__languagesList_opened');
    languageListTrigger.current.classList.toggle('NavSearch__languagesListTrigger_opened');
  }

  function yandexDictionaryInputRequest() {
    yandexDictionaryRequest(selectedLanguage, inputsearch.current.value)
      .then(response => {
        dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
      })
  }

  const debouncedYandexDictionaryInputRequest = debounce(yandexDictionaryInputRequest, 500)

  function selectLanguage(e) {

    const flagCheckString = e.target.parentElement.childNodes[1].outerText;
    setSelectedLanguageFlag(languageFlagCheck(flagCheckString))

    const newLanguage = reversedTranslateDirection
      ? e.target.parentElement.childNodes[1].outerText.split('-').reverse().join('-')
      : e.target.parentElement.childNodes[1].outerText;

    dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: newLanguage })

    yandexDictionaryRequest(newLanguage, inputsearch.current.value)
      .then(response => {
        dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
      })

  }

  const languageFlagCheck = (language) => {

    return language == 'de-ru'
      ? (<img src={de} alt="" className="NavSearch__languageListElemFlag" />)
      : language == 'fr-ru'
        ? (<img src={fr} alt="" className="NavSearch__languageListElemFlag" />)
        : language == 'es-ru'
          ? (<img src={es} alt="" className="NavSearch__languageListElemFlag" />)
          : language == 'it-ru'
            ? (<img src={it} alt="" className="NavSearch__languageListElemFlag" />)
            : language == 'nl-ru'
              ? (<img src={nl} alt="" className="NavSearch__languageListElemFlag" />)
              : language == 'pl-ru'
                ? (<img src={pl} alt="" className="NavSearch__languageListElemFlag" />)
                : language == 'bg-ru'
                  ? (<img src={bg} alt="" className="NavSearch__languageListElemFlag" />)
                  : language == 'cs-ru'
                    ? (<img src={cz} alt="" className="NavSearch__languageListElemFlag" />)
                    : language == 'en-ru'
                      ? (<img src={us} alt="" className="NavSearch__languageListElemFlag" />)
                      : ""

  }



  return (

    <div className="NavSearch">

      <div className='NavSearch__inputElem'>
        <input placeholder="..." type="input"
          ref={inputsearch}
          onChange={(e) => {

            if (e.target.value.match(/[a-zA-Zа-яА-Я]+$/)) {
              debouncedYandexDictionaryInputRequest();
            }
            if (e.target.value == 0) {
              dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: {} });
            }
            setinputstate(e.target.value)

          }} />

        {inputstate
          ? (<div className='NavSearch__inputDeleteButton'
            onClick={() => {

              dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: {} });
              inputsearch.current.value = "";
              setinputstate('');

            }}
          >
            <AiOutlineClose className='NavSearch__inputDeleteButtonIcon' />
          </div>)
          : ''}

      </div>

      <SearchedMainWord />

      <div className="NavSearch__languages">

        <div className="NavSearch__selectedLanguage">

          <div className="NavSearch__languageListElemFlag_selected">
            {selectedLanguageFlag}
          </div>

          <div>
            {selectedLanguage}
          </div>

          <div className="NavSearch__reverseButtonSelectedLanguage"
            onClick={(e) => {

              let newLanguage = selectedLanguage.split('-').reverse().join('-')
              setReversedTranslateDirection(!reversedTranslateDirection)
              dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: newLanguage });
              e.target.parentElement.classList.toggle('NavSearch__reverseButtonSelectedLanguage_reversed');
              yandexDictionaryRequest(newLanguage, inputsearch.current.value)
                .then(response => {
                  dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
                })
            }}>
            <FiRotateCw />
          </div>

        </div>

        <div className="NavSearch__languagesListTrigger" onClick={openCloseLanguagesListTrigger} ref={languageListTrigger}>
          <FiChevronsRight size={20} />
        </div>

        <div className="NavSearch__languagesList" ref={languagesList} onClick={selectLanguage}>

          <LanguageListElem flagsrc={us} text='en-ru' />
          <LanguageListElem flagsrc={de} text='de-ru' />
          <LanguageListElem flagsrc={fr} text='fr-ru' />
          <LanguageListElem flagsrc={es} text='es-ru' />
          <LanguageListElem flagsrc={it} text='it-ru' />
          <LanguageListElem flagsrc={nl} text='nl-ru' />
          <LanguageListElem flagsrc={pl} text='pl-ru' />
          <LanguageListElem flagsrc={bg} text='bg-ru' />
          <LanguageListElem flagsrc={cz} text='cz-ru' />

        </div>

      </div>

    </div>
  )

  function LanguageListElem({ flagsrc, text }) {
    return (
      <div className="NavSearch__languageListElem">
        <img src={flagsrc} alt="" className="NavSearch__languageListElemFlag" />
        <div className="NavSearch__languageListElemText">
          {text}
        </div>
      </div>
    )
  }

}

