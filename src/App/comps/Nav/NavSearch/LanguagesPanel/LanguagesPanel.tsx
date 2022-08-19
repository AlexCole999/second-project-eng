import React from 'react'
import './LanguagesPanel.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { FiChevronsRight, FiRotateCw } from "react-icons/fi";
import yandexDictionaryRequest from './../../../../Api/yandexDictionary/yandexDictionaryRequest';
import languageFlagCheck from './../../../../functions/languageFlagCheck';

type Props = {}

const languageList = ['en-ru',
  'de-ru',
  'fr-ru',
  'es-ru',
  'it-ru',
  'nl-ru',
  'pl-ru',
  'bg-ru']

export default function LanguagesPanel({ inputsearch }) {

  const dispatch = useDispatch();

  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const mainWord = inputsearch?.current?.value

  const languageListTrigger = useRef(null);
  const languagesList = useRef(null);

  const [selectedLanguageFlag, setSelectedLanguageFlag] = useState(languageFlagCheck(selectedLanguage))
  const [reversedTranslateDirection, setReversedTranslateDirection] = useState(false)

  function openCloseLanguagesListTrigger(): void {
    languagesList.current.classList.toggle('NavSearch__languagesList_opened');
    languageListTrigger.current.classList.toggle('NavSearch__languagesListTrigger_opened');
  }

  function selectLanguage(e) {

    const correctClassList = e.target.classList.value == 'NavSearch__languageListElemFlag' || e.target.classList.value == 'NavSearch__languageListElemText'

    if (correctClassList) {

      const languageString = e.target.parentElement.childNodes[1].outerText;
      localStorage.setItem('language', languageString)
      setSelectedLanguageFlag(languageFlagCheck(languageString))

      const newLanguage = reversedTranslateDirection
        ? e.target.parentElement.childNodes[1].outerText.split('-').reverse().join('-')
        : e.target.parentElement.childNodes[1].outerText;

      dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: newLanguage })

      if (mainWord) {
        yandexDictionaryRequest(newLanguage, mainWord)
          .then(response => {
            dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
          })
      }

    }
  }

  function changeTranslateDirectionTrigger(e) {

    let newLanguage = selectedLanguage.split('-').reverse().join('-')
    setReversedTranslateDirection(!reversedTranslateDirection)
    localStorage.setItem('reversedTranslateDirection', reversedTranslateDirection == true ? "false" : 'true')

    dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: newLanguage });
    e.target.parentElement.classList.toggle('NavSearch__reverseButtonSelectedLanguage_reversed');

    if (mainWord) {
      yandexDictionaryRequest(newLanguage, mainWord)
        .then(response => {
          dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
          console.log(response.data.def)
        })
    }

  }

  useEffect(() => {

    if (localStorage.getItem('reversedTranslateDirection') == 'true') {

      const newLanguage = selectedLanguage.split('-').reverse().join('-')
      dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: newLanguage });
      setReversedTranslateDirection(true)

    }

  }, [])

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

  return (

    <div className="NavSearch__languages">

      <div className="NavSearch__selectedLanguage">

        <div className="NavSearch__languageListElemFlag_selected">
          <img src={selectedLanguageFlag} alt="" className="NavSearch__languageListElemFlag" />
        </div>

        <div>
          {selectedLanguage}
        </div>

        <div className="NavSearch__reverseButtonSelectedLanguage"
          onClick={changeTranslateDirectionTrigger}>
          <FiRotateCw />
        </div>

      </div>

      <div className="NavSearch__languagesListTrigger" onClick={openCloseLanguagesListTrigger} ref={languageListTrigger}>
        <FiChevronsRight size={20} />
      </div>

      <div className="NavSearch__languagesList" ref={languagesList} onClick={selectLanguage}>

        {
          languageList
            .map(
              language =>
                <LanguageListElem flagsrc={languageFlagCheck(language)} text={language} />
            )
        }

      </div>

    </div>

  )

}