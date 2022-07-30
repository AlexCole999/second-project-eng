import React, { useMemo } from 'react'
import './MyWords.scss'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'
import FilteredWords from './FilteredWords/FilteredWords';


type Props = {}

export default function MyWords({ }: Props) {

  const dispatch = useDispatch();

  const [regexp, setregexp] = useState([])

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const fullWordsList = useSelector(state => state.allWordsFromFirebase);

  const filteredWordsArray = [
    ...Object.keys(fullWordsList)
      .sort()
      .filter(x =>
        fullWordsList[x].word.toLowerCase().match(regexp)
      )
  ];

  const firebaseRequest = () => {
    getDoc(doc(db, "users", user, 'data', 'words')).then(data => {
      dispatch({
        type: "ADD_DATA_FROM_FIREBASE",
        payload: data.data()
      });
    });
  }

  useEffect(() => firebaseRequest(), [])

  const FilterMenu = () => {

    return (

      <div className='MyWords__filterMenu'>

        <div className='MyWords__filterMenuTitle'>
          Быстрый поиск
        </div>

        <div>
          <input
            type="text"
            placeholder='Часть искомого слова...'
            onChange={
              (e) =>
                setregexp(new RegExp((e.target.value).toLowerCase()))
            }
          />
        </div>

      </div >

    )

  }

  const MemoizedFilterMenu = useMemo(() => FilterMenu, [])

  return (

    <div className='MyWords'>
      <MemoizedFilterMenu />
      <FilteredWords filteredWords={filteredWordsArray} />
    </div >

  )
}

