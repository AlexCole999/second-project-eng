import './NavSearch.scss';
import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FiChevronsRight, FiRotateCw } from "react-icons/fi";
import debounce from './../../../functions/debounce';
import { AiFillCheckCircle, AiFillPlayCircle } from "react-icons/ai";
import capitalizeFirstLetter from './../../../functions/capitalizeFirstLetter';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../API/firebase/firebaseConfig'

import us from './flags/us.svg';
import de from './flags/de.svg';
import fr from './flags/fr.svg';
import es from './flags/es.svg';
import it from './flags/it.svg';
import nl from './flags/nl.svg';
import pl from './flags/pl.svg';
import bg from './flags/bg.svg';
import cz from './flags/cz.svg';
import yandexDictionaryRequest2 from './../../../Api/yandexDictionary/yandexDictionaryRequest';

type Props = {}

export default function NavSearch({ }: Props) {

  const dispatch = useDispatch();

  const [selectedLanguageFlag, setSelectedLanguageFlag] = useState(<img src={us} alt="" className="NavSearch__languageListElemFlag" />)

  const user = useSelector(state => state.user?.data?.email || 'guest')
  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const mainWord = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text)
  const mainTranslate = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.tr[0]?.text)
  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const wordsFromYandexDictionary = useSelector(state => state.yandexDictionaryTranslates.data)

  const inputsearch = useRef(null);
  const languageListTrigger = useRef(null);
  const languagesList = useRef(null);

  function openCloseLanguagesTrigger(): void {
    languagesList.current.classList.toggle('NavSearch__languagesList_opened');
    languageListTrigger.current.classList.toggle('NavSearch__languagesListTrigger_opened');
  }

  function yandexDictionaryRequest(input: string): void {

    if (input.match(/[a-zA-Zа-яА-Я]+$/)) {

      yandexDictionaryRequest2(selectedLanguage, input)
        .then(response => {
          console.log(response)
          dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
        })

    }

  }

  const debouncedYandexDictionaryRequest = debounce(yandexDictionaryRequest, 500)

  function selectLanguage(e) {

    const newLanguage = e.target.parentElement.childNodes[1].outerText;

    dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: newLanguage })

    setSelectedLanguageFlag(languageFlagCheck(newLanguage))

    yandexDictionaryRequest2(newLanguage, inputsearch.current.value)
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
  function addTranslateToFirebase() {

    const currentBaseWords = JSON.parse(JSON.stringify(allWordsFromFirebase));
    let newBaseWords = currentBaseWords;

    newBaseWords[mainWord] = currentBaseWords[mainWord]
      ? {
        ...currentBaseWords[mainWord],
        translates: [...currentBaseWords[mainWord]['translates'].filter(x => x.translate !== mainTranslate), { language: selectedLanguage, translate: mainTranslate }]
      }
      : {
        word: mainWord,
        translates: [{ language: selectedLanguage, translate: mainTranslate }]
      };

    setDoc(doc(db, "users", user, 'data', 'words'), newBaseWords)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(mainTranslate)}" добавлено в переводы слова "${capitalizeFirstLetter(mainWord)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBaseWords });
      });

  }

  function setGameWord() {

    const currentBaseWords = JSON.parse(JSON.stringify(allWordsFromFirebase));
    let newBaseWords = currentBaseWords;

    newBaseWords[mainWord] = currentBaseWords[mainWord]
      ? {
        ...currentBaseWords[mainWord],
        gameword: mainTranslate
      }
      : {
        word: mainWord,
        translates: [{ language: selectedLanguage, translate: mainTranslate }],
        gameword: mainTranslate
      };


    setDoc(doc(db, "users", user, 'data', 'words'), newBaseWords)
      .then(() => {
        console.log(`Теперь в слове "${capitalizeFirstLetter(mainWord)}" во время игры вы будете угадывать слово "${capitalizeFirstLetter(mainTranslate)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBaseWords });
      });

  }

  return (

    <div className="NavSearch">

      <input placeholder="..."
        type="input"
        ref={inputsearch}
        onChange={
          (e) => {
            debouncedYandexDictionaryRequest(e.target.value);
          }} />

      <div className="NavSearch__searchedMainWord">

        <div>
          {mainTranslate ? mainTranslate.toUpperCase() : ""}
        </div>

        <div>

          {
            wordsFromYandexDictionary.length
              ? (
                allWordsFromFirebase[mainWord]
                  ?
                  <AiFillCheckCircle style={{ width: '25px', height: '25px' }} className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_appended'
                    onClick={addTranslateToFirebase}
                  >
                  </AiFillCheckCircle>
                  : <AiFillCheckCircle style={{ width: '25px', height: '25px' }} className='DeepSearch__resultRowAppendButton'
                    onClick={addTranslateToFirebase}
                  >
                  </AiFillCheckCircle>
              )
              : ""
          }

          {
            wordsFromYandexDictionary.length
              ? (
                allWordsFromFirebase[mainWord]?.gameword == mainTranslate && allWordsFromFirebase[mainWord]?.gameword !== undefined
                  ? <AiFillPlayCircle style={{ width: '25px', height: '25px' }} className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_playbaseAppended'
                    onClick={setGameWord}
                  >
                  </AiFillPlayCircle>
                  : <AiFillPlayCircle style={{ width: '25px', height: '25px' }} className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_playbase'
                    onClick={setGameWord}
                  >
                  </AiFillPlayCircle>
              )
              : ""
          }

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
                let newLanguage = selectedLanguage.split('-').reverse().join('-')
                dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: newLanguage });
                e.target.parentElement.classList.toggle('NavSearch__reverseButtonSelectedLanguage_reversed');
                axios.get(
                  'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
                  + '?key='
                  + yandexDictionaryKey
                  + '&lang='
                  + newLanguage
                  + '&text='
                  + inputsearch.current.value)
                  .then(response => {
                    dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
                  })
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
