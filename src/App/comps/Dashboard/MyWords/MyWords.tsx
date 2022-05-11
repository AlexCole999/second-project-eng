import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'

type Props = {}

export default function MyWords({ }: Props) {


  const [state, setstate] = useState([])

  const dispatch = useDispatch();

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const words = useSelector(state => state.wordsFromFirebase);

  async function somefunc() {

    let data = (await getDoc(doc(db, "users", user, 'data', 'words'))).data();
    dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: data });


    console.log(words, Object.keys(words))
  }
  return (
    <div>
      MyWords
      <button onClick={somefunc}></button>
    </div>
  )
}