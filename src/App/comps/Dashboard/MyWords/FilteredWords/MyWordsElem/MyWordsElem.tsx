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
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ElemTranslateRow from './ElemTranslateRow/ElemTranslateRow';

type Props = {
  word: any
}

export default function MyWordsElem({ word }: Props) {

  const history = useNavigate()

  const dispatch = useDispatch()

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  return (

    <div className='MyWords__elem'>

      <DeleteWordButton />

      <ElemMainWord />

      <TransitionGroup>

        {allWordsFromFirebase[word].translates.map(translateElem =>
          <CSSTransition key={translateElem.translate} timeout={500} classNames="item">
            <ElemTranslateRow translateElem={translateElem} word={word} />
          </CSSTransition>
        )}

      </TransitionGroup>

    </div>

  )

  function DeleteWordButton() {

    function deleteAllTranslatesFromFirebase() {

      const newBase = createNewBase.baseWithDeletedWord(allWordsFromFirebase, word);

      setDoc(doc(db, "users", user, 'data', 'words'), newBase)
        .then(() => {
          console.log(`Слово "${capitalizeFirstLetter(word)}" удалено из базы слов"`);
          dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
        });

    }

    return (

      <div className='MyWords__elemDeleteAllButtonBody'>
        <FaTimes className='MyWords__elemDeleteAllButton'
          onClick={deleteAllTranslatesFromFirebase}
        />
      </div>

    )

  }

  function ElemMainWord() {

    return (

      <div className='MyWords__elemMainWord'>

        <div onClick={() => history(`../DeepSearch/${allWordsFromFirebase[word]?.word}`)}>

          {capitalizeFirstLetter(allWordsFromFirebase[word]?.word)}

          <div className='MyWords__elemTranslateLanguage'>
            {allWordsFromFirebase[word].translates[0].language.split('-')[0]}
          </div>

        </div>

      </div>

    )

  }

}