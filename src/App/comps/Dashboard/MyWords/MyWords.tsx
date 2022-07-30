import React from 'react'
import './MyWords.scss'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'
import FilteredWords from './FilteredWords/FilteredWords';
import FilterMenu, { MemoizedFilterMenu } from './FilterMenu/FilterMenu';


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

  return (

    <div className='MyWords'>
      <FilterMenu setregexp={setregexp} />
      <FilteredWords filteredWords={filteredWordsArray} />
    </div >

  )

}

