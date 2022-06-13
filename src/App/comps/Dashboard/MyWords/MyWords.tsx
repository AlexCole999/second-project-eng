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

  const [regexp, setregexp] = useState([])

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const fullWordsList = useSelector(state => state.allWordsFromFirebase);

  const filteredWordsArray = [
    ...Object.keys(fullWordsList)
      .filter(x =>
        fullWordsList[x].word.toLowerCase().match(regexp)
      )
  ];

  useEffect(() => {
    getDoc(doc(db, "users", user, 'data', 'words')).then(data => {
      dispatch({
        type: "ADD_DATA_FROM_FIREBASE",
        payload: data.data()
      });
    });
  }, [])

  return (

    <div className='MyWords'>

      <div className='MyWords__title'>

      </div>

      <div className='MyWords__wordsFilterMenu'>

        <div>
          Фильтр
        </div>

        <div>

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

