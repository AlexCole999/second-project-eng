import React from 'react'
import './ElemTopButtons.scss'
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../../API/firebase/firebaseConfig';
import createNewBase from '../../../../../../functions/createNewBase';
import capitalizeFirstLetter from '../../../../../../functions/capitalizeFirstLetter';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { AiFillPlayCircle } from "react-icons/ai";

type Props = { word: string }

export default function ElemTopButtons({ word }) {

  const dispatch = useDispatch()

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  function deleteAllTranslatesFromFirebase() {

    const newBase = createNewBase.baseWithDeletedWord(allWordsFromFirebase, word);

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(word)}" удалено из базы слов"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  function deleteGamewordFromFirebase() {

    const newBase = createNewBase.baseWithDeletedGameWord(allWordsFromFirebase, word);

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(word)}" удалено из игры"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  return (

    <div className='MyWords__elemTopButtonsMenu'>

      {
        'gameword' in allWordsFromFirebase[word]
          ? <AiFillPlayCircle className='MyWords__elemDeleteGamewordButton' onClick={deleteGamewordFromFirebase} />
          : <AiFillPlayCircle className='MyWords__elemDeleteGamewordButton_inactive' />
      }

      <FaTimes className='MyWords__elemDeleteAllButton'
        onClick={deleteAllTranslatesFromFirebase}
      />

    </div>

  )

}