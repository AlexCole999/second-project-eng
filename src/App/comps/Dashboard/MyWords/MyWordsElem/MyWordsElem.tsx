import React from 'react'
import './MyWordsElem.scss'
import { useSelector, useDispatch } from 'react-redux'
import { FaTimesCircle } from "react-icons/fa";
import capitalizeFirstLetter from './../../../../functions/capitalizeFirstLetter';
import { db } from '../../../../API/firebase/firebaseConfig'
import { setDoc, doc } from 'firebase/firestore';

type Props = {
  word: any
}

export default function MyWordsElem({ word }: Props) {

  const dispatch = useDispatch()

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  function deleteTranslateFromFirebase(translate) {

    const currentBaseWords = JSON.parse(JSON.stringify(allWordsFromFirebase));
    let newBaseWords = currentBaseWords;

    let translatesArrayLength = currentBaseWords[word]['translates'].length

    if (translatesArrayLength > 1) {

      newBaseWords[word] = {
        ...currentBaseWords[word],
        translates: currentBaseWords[word]['translates'].filter(x => x.translate !== translate)
      }

      setDoc(doc(db, "users", user, 'data', 'words'), newBaseWords)
        .then(() => {
          console.log(`Слово "${capitalizeFirstLetter(translate)}" удалено из переводов слова "${capitalizeFirstLetter(word)}"`);
          dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBaseWords });
        });

    }

    if (translatesArrayLength == 1) {

      delete newBaseWords[word];

      setDoc(doc(db, "users", user, 'data', 'words'), newBaseWords)
        .then(() => {
          console.log(`Слово "${capitalizeFirstLetter(translate)}" удалено из базы слов"`);
          dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBaseWords });
        });

    }

  }

  return (

    <div className='MyWords__elem'>

      <div className='MyWords__elemMainWord'>

        <div>
          {capitalizeFirstLetter(allWordsFromFirebase[word]?.word)}
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
                        <div className='MyWords__elemTranslateWord'>
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