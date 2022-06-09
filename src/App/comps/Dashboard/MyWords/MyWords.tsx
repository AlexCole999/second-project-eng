import React from 'react'
import './MyWords.scss'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'
import MyWordsElem from './MyWordsElem/MyWordsElem';


type Props = {}

export default function MyWords({ }: Props) {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const fullWordsList = useSelector(state => state.allWordsFromFirebase);

  const [regexp, setregexp] = useState([])

  const filteredWordsArray = [...Object.keys(fullWordsList).filter(x => fullWordsList[x].word.toLowerCase().match(regexp))];

  useEffect(
    async () => {
      const data = (await getDoc(doc(db, "users", user, 'data', 'words'))).data();
      dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: data });
      console.log('useEffectDone')
    },
    []
  )

  return (
    <div className='MyWords'>
      <div className='MyWords__title'>
        MyWords
      </div>
      <div className='MyWords__wordsFilterMenu'>
        <div>
          Фильтр
        </div>
        <div>
          Слово:
          <input
            type="text"
            placeholder='Часть искомого слова...'
            onChange={
              (e) =>
                setregexp(new RegExp(e.target.value))
            }
          />
        </div>
      </div >

      <div className='MyWords__words'>
        {
          filteredWordsArray
            .map(
              mainWord =>
                <MyWordsElem
                  fullWordsList={fullWordsList}
                  element={mainWord}
                  key={mainWord}
                />
            )
        }
      </div>
    </div >
  )
}

