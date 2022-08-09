import React from 'react'
import { setDoc, doc } from 'firebase/firestore';
import createNewBase from './../../../../../../functions/createNewBase';
import { db } from '../../../../../../API/firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import capitalizeFirstLetter from './../../../../../../functions/capitalizeFirstLetter';
import { FaTimesCircle } from 'react-icons/fa';
import './ElemTranslateRow.scss'

type Props = { translateElem: any, word: any }

export default function ElemTranslateRow({ translateElem, word }: Props) {

  const dispatch = useDispatch()

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const selectedLanguage = useSelector(state => state.selectedLanguage);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  function deleteTranslateFromFirebase(translate) {

    const newBase = createNewBase.baseWithDeletedTranslateForWord(allWordsFromFirebase, word, translate)

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        allWordsFromFirebase[word]['translates'].length > 1
          ? console.log(`Слово "${capitalizeFirstLetter(translate)}" удалено из переводов слова "${capitalizeFirstLetter(word)}"`)
          : console.log(`Слово "${capitalizeFirstLetter(word)}" удалено из базы слов"`)
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  function setGameWord(translate) {

    const newBase = createNewBase.baseWithNewGameWord(allWordsFromFirebase, selectedLanguage, word, translate);

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Теперь в слове "${capitalizeFirstLetter(word)}" во время игры вы будете угадывать слово "${capitalizeFirstLetter(translate)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  return (

    <div className='MyWords__elemTranslateRow' >

      <div>

        {
          allWordsFromFirebase[word]?.gameword == translateElem.translate
            ?
            <div className='MyWords__elemTranslateWord MyWords__elemTranslateWord_gameword'>
              {capitalizeFirstLetter(translateElem.translate)}
            </div>
            :
            <div className='MyWords__elemTranslateWord'
              onClick={() => setGameWord(translateElem.translate)}
            >
              {capitalizeFirstLetter(translateElem.translate)}
            </div>
        }

        <div className='MyWords__elemTranslateLanguage'>
          {translateElem.language.split('-')[1]}
        </div>

      </div>

      <FaTimesCircle
        className='MyWords__elemDeleteButton'
        onClick={
          () => {
            deleteTranslateFromFirebase(translateElem.translate)
          }
        }
      >
      </FaTimesCircle>

    </div>

  )
}