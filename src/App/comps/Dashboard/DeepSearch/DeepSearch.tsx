import { setDoc, doc } from 'firebase/firestore';
import React from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../../API/firebase/firebaseConfig';
import './DeepSearch.scss';

type Props = {}

export default function DeepSearch({ }: Props) {

  const results = useSelector(state => state.yandexDictionaryTranslates.data);

  let database = db;

  function setWordToFirebase(e) {
    setDoc(doc(database, "users", "user", "appendedwords", 'blabla'), {
      word: '2',
      translate: '1'
    });
  }

  return (
    <div className='DeepSearch'>

      DeepSearch

      <div className='DeepSearch__results'>

        {results == undefined
          ? "none"
          : results.map(resultColumn =>
            <div className='DeepSearch__resultColumn'>
              <div className='DeepSearch__resultColumnPos'>
                <div>
                  {resultColumn.pos}
                </div>
              </div>
              
              {resultColumn.tr.map(translate =>
                <div className='DeepSearch__resultRow'>
                  <div onClick={(e) => { setWordToFirebase(e) }}>
                    {translate.text}
                  </div>
                  <div>
                    <button className='DeepSearch__resultRowAppendButton'
                      onClick={() => { console.log('clicked') }}
                    ></button>
                  </div>
                </div>)}
            </div>)}
      </div>
    </div >
  )
}
