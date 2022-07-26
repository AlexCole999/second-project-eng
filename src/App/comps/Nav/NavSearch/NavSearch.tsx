import './NavSearch.scss';
import React from 'react';
import { useState, useRef } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import debounce from './../../../functions/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../API/firebase/firebaseConfig'
import { FiChevronsRight, FiRotateCw } from "react-icons/fi";
import { AiFillCheckCircle, AiFillPlayCircle } from "react-icons/ai";
import capitalizeFirstLetter from './../../../functions/capitalizeFirstLetter';
import yandexDictionaryRequest from './../../../Api/yandexDictionary/yandexDictionaryRequest';
import createNewBase from '../../../functions/createNewBase';
import { AiOutlineClose } from "react-icons/ai";

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

  let navIsClosed = localStorage.getItem('navIsClosed');

  const dispatch = useDispatch();

  const [selectedLanguageFlag, setSelectedLanguageFlag] = useState(<img src={us} alt="" className="NavSearch__languageListElemFlag" />)
  const [reversedTranslateDirection, setReversedTranslateDirection] = useState(false)
  const [inputstate, setinputstate] = useState('')

  const user = useSelector(state => state.user?.data?.email || 'guest')
  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const mainWord = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text)
  const mainTranslate = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.tr[0]?.text)
  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const wordsFromYandexDictionary = useSelector(state => state.yandexDictionaryTranslates.data)

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

  function addTranslateToFirebase() {

    const newBase = createNewBase.baseWithNewTranslateForWord(allWordsFromFirebase, selectedLanguage, mainWord, mainTranslate)

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(mainTranslate)}" добавлено в переводы слова "${capitalizeFirstLetter(mainWord)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  function deleteTranslateFromFirebase() {

    const newBase = createNewBase.baseWithDeletedTranslateForWord(allWordsFromFirebase, mainWord, mainTranslate)

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        allWordsFromFirebase[mainWord]['translates'].length > 1
          ? console.log(`Слово "${capitalizeFirstLetter(mainTranslate)}" удалено из переводов слова "${capitalizeFirstLetter(mainWord)}"`)
          : console.log(`Слово "${capitalizeFirstLetter(mainWord)}" удалено из базы слов"`)
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  function setGameWord() {

    const newBase = createNewBase.baseWithNewGameWord(allWordsFromFirebase, selectedLanguage, mainWord, mainTranslate);

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Теперь в слове "${capitalizeFirstLetter(mainWord)}" во время игры вы будете угадывать слово "${capitalizeFirstLetter(mainTranslate)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

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

      <div
        className={`NavSearch__searchedMainWord ${navIsClosed == 'true' ? 'NavSearch__searchedMainWord_closed' : ''}`}>

        <div>
          {mainTranslate ? mainTranslate.toUpperCase() : ""}
        </div>

        <div>

          {
            wordsFromYandexDictionary.length
              ? (
                allWordsFromFirebase[mainWord]
                  ?
                  <AiFillCheckCircle size={25} className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_translateAppended'
                    onClick={deleteTranslateFromFirebase}
                  >
                  </AiFillCheckCircle>
                  : <AiFillCheckCircle size={25} className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_translate'
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
                  ? <AiFillPlayCircle size={25} className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_playbaseAppended'
                    onClick={setGameWord}
                  >
                  </AiFillPlayCircle>
                  : <AiFillPlayCircle size={25} className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_playbase'
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

        <div className="NavSearch__languagesListTrigger"
          onClick={openCloseLanguagesListTrigger}
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
