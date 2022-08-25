import React from 'react'
import './MyWordsElem.scss'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ElemTranslateRow from './ElemTranslateRow/ElemTranslateRow';
import ElemMainWord from './ElemMainWord/ElemMainWord';
import TopButtons from './DeleteWordButton/TopButtons';

type Props = {
  word: any
}

export default function MyWordsElem({ word }: Props) {

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase);

  return (

    <div className='MyWords__elem'>

      <TopButtons word={word} />

      <ElemMainWord word={word} />

      <TransitionGroup>

        {
          allWordsFromFirebase[word]
            .translates
            .map(
              translateElem =>
                <CSSTransition key={translateElem.translate} timeout={500} classNames="item">
                  <ElemTranslateRow translateElem={translateElem} word={word} />
                </CSSTransition>
            )
        }

      </TransitionGroup>

    </div>

  )

}