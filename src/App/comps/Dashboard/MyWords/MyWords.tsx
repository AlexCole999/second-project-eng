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

  console.log(words)

  useEffect(firebaseWordsRequest, [])

  async function getBasesList() {
    const q = collection(db, "users", user, 'bases');

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  async function firebaseWordsRequest() {

    let data = (await getDoc(doc(db, "users", user, 'data', 'words'))).data();
    dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: data });
    console.log('requested')
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
      <button onClick={getBasesList}>baseslist</button>
      <input type="text" placeholder='фильтр' onChange={(e) => setstate(new RegExp(e.target.value))} />
      <button onClick={() => console.log([...Object.keys(words)].filter(x => words[x].word.match(state)))}>display filtered</button>
      <button onClick={() => console.log(state)}>display filtered</button>
      {<div>{[...Object.keys(words)]
        .map(x =>
          <div style={{ border: '1px solid black', padding: '8px' }}>
            <div style={{ fontSize: '26px', fontWeight: 'bold' }}>
              {words[x]?.word}
            </div>
            <div style={{}}>
              {words[x].translates
                .map(x =>
                  <div>
                    <div style={{ fontSize: '20px', fontStyle: 'italic', display: 'inline' }}>{x.translate}</div>
                    <div style={{ fontSize: '8px', display: 'inline' }}>
                      {x.language.split('-')[1]}
                    </div>
                  </div>)}
            </div>
          </div>
        )}
      </div>}

      <button onClick={firebaseWordsRequest}></button>
    </div>
  )
}

