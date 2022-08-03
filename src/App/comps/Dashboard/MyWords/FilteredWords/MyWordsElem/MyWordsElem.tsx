import React from 'react'
import './MyWordsElem.scss'
import { useSelector, useDispatch } from 'react-redux'
import { FaTimesCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import capitalizeFirstLetter from '../../../../../functions/capitalizeFirstLetter';
import { db } from '../../../../../API/firebase/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import createNewBase from '../../../../../functions/createNewBase';

type Props = {
  word: any
}

export default function MyWordsElem({ word }: Props) {

  const history = useNavigate()

  const dispatch = useDispatch()

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase);
  const selectedLanguage = useSelector(state => state.selectedLanguage);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  function deleteAllTranslatesFromFirebase() {

    const newBase = createNewBase.baseWithDeletedWord(allWordsFromFirebase, word);

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(word)}" удалено из базы слов"`);
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

  return (

    <div className='MyWords__elem'>

      <div className='MyWords__elemDeleteAllButtonBody'>
        <FaTimes
          className='MyWords__elemDeleteAllButton'
          onClick={deleteAllTranslatesFromFirebase}
        />
      </div>

      <div className='MyWords__elemMainWord'>
        <div
          onClick={() => history(`../DeepSearch/${allWordsFromFirebase[word]?.word}`)}>

          {capitalizeFirstLetter(allWordsFromFirebase[word]?.word)}

          <div className='MyWords__elemTranslateLanguage'>
            {allWordsFromFirebase[word].translates[0].language.split('-')[0]}
          </div>

        </div>

      </div>

      <div>

        {
          allWordsFromFirebase[word]
            .translates
            .map(
              translateElem =>

                <div className='MyWords__elemTranslateRow' key={translateElem.translate}>

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

      </div>

    </div>

  )

}