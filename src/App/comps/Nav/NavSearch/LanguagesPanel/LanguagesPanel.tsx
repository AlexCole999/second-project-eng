import React from 'react'
import './LanguagesPanel.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { FiChevronsRight, FiRotateCw } from "react-icons/fi";
import yandexDictionaryRequest from './../../../../Api/yandexDictionary/yandexDictionaryRequest';

import us from '../../../../source/flags/us.svg'
import de from '../../../../source/flags/de.svg';
import fr from '../../../../source/flags/fr.svg';
import es from '../../../../source/flags/es.svg';
import it from '../../../../source/flags/it.svg';
import nl from '../../../../source/flags/nl.svg';
import pl from '../../../../source/flags/pl.svg';
import bg from '../../../../source/flags/bg.svg';

type Props = {}

export default function LanguagesPanel() {

  const dispatch = useDispatch();

  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const mainWord = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text)

  const languageListTrigger = useRef(null);
  const languagesList = useRef(null);

  const [selectedLanguageFlag, setSelectedLanguageFlag] = useState(<img src={us} alt="" className="NavSearch__languageListElemFlag" />)
  const [reversedTranslateDirection, setReversedTranslateDirection] = useState(false)

  function openCloseLanguagesListTrigger(): void {
    languagesList.current.classList.toggle('NavSearch__languagesList_opened');
    languageListTrigger.current.classList.toggle('NavSearch__languagesListTrigger_opened');
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
                  : language == 'en-ru'
                    ? (<img src={us} alt="" className="NavSearch__languageListElemFlag" />)
                    : ""

  }

  function selectLanguage(e) {

    const flagCheckString = e.target.parentElement.childNodes[1].outerText;
    setSelectedLanguageFlag(languageFlagCheck(flagCheckString))

    const newLanguage = reversedTranslateDirection
      ? e.target.parentElement.childNodes[1].outerText.split('-').reverse().join('-')
      : e.target.parentElement.childNodes[1].outerText;

    dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: newLanguage })

    yandexDictionaryRequest(newLanguage, mainWord)
      .then(response => {
        dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
      })

  }

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

  return (<div className="NavSearch__languages">

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
          yandexDictionaryRequest(newLanguage, mainWord)
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

    </div>

  </div>)
}