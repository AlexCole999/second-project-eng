import React from 'react'
import './SearchedMainWord.scss'
import { useSelector, useDispatch } from 'react-redux';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../API/firebase/firebaseConfig';
import createNewBase from './../../../../functions/createNewBase';
import capitalizeFirstLetter from './../../../../functions/capitalizeFirstLetter';
import { AiFillCheckCircle, AiFillPlayCircle } from "react-icons/ai";

type Props = {}

export default function SearchedMainWord() {

  const dispatch = useDispatch();

  let navIsClosed = localStorage.getItem('navIsClosed');

  const mainTranslate = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.tr[0]?.text)
  const wordsFromYandexDictionary = useSelector(state => state.yandexDictionaryTranslates.data)
  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const mainWord = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text)
  const user = useSelector(state => state.user?.data?.email || 'guest')
  const selectedLanguage = useSelector(state => state.selectedLanguage)

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

  function deleteGameWord() {

    const newBase = createNewBase.baseWithDeletedGameWord(allWordsFromFirebase, mainWord);

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(mainWord)}" удалено из игры`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }
  return (

    <div className={`NavSearch__searchedMainWord ${navIsClosed == 'true' ? 'NavSearch__searchedMainWord_closed' : ''}`}>

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
                  onClick={deleteGameWord}
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

  )

}