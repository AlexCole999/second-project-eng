import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'

type Props = {}

export default function MyWords({ }: Props) {



  const [state, setstate] = useState([])
  const [inputstate, setinputstate] = useState('')
  const dispatch = useDispatch();

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const words = useSelector(state => state.wordsFromFirebase);

  useEffect(firebaseWordsRequest, [])

  async function getBases() {
    const q = collection(db, "users", user, 'bases');

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  async function firebaseWordsRequest() {

    let data = (await getDoc(doc(db, "users", user, 'data', 'words'))).data();
    dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: data });

    [...Object.keys(words)].map(x => console.log(words[x]?.word, words[x].translates.map(x => x.translate)));

    setstate([...Object.keys(words)]
      .map(x =>
        <div>
          <div>
            {words[x]?.word}
          </div>
          <div>
            {words[x].translates
              .map(x =>
                <span>
                  {x.translate}<span style={{ fontSize: '8px' }}>{x.language.split('-')[1]}</span> |
                </span>)
            }</div>
        </div>));
    console.log(state)
  }

  function addNewBase() {
    setDoc(doc(db, "users", user, 'bases', inputstate), {})
      .then(x => console.log('done'))
  }

  return (
    <div>
      <div>MyWords</div>
      <div><input type="text" onChange={(e) => setinputstate(e.target.value)} /></div>
      <button onClick={addNewBase}>addbase</button>
      <button onClick={getBases}>baseslist</button>

      <div>{state}</div>
      <button onClick={firebaseWordsRequest}></button>
    </div>
  )
}