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
import ElemMainWord from './ElemMainWord/ElemMainWord';
import DeleteWordButton from './DeleteWordButton/DeleteWordButton';

type Props = {
  word: any
}

export default function MyWordsElem({ word }: Props) {

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase);

  return (

    <div className='MyWords__elem'>

      <DeleteWordButton word={word} />

      <ElemMainWord word={word} />

      <TransitionGroup>

        {allWordsFromFirebase[word].translates.map(translateElem =>
          <CSSTransition key={translateElem.translate} timeout={500} classNames="item">
            <ElemTranslateRow translateElem={translateElem} word={word} />
          </CSSTransition>
        )}

      </TransitionGroup>

    </div>

  )

}