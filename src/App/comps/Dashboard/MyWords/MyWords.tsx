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
      {[...Object.keys(words)]
        .map(x =>
          <div>
            <div onClick={() => console.log(words)}>
              {words[x]?.word}
            </div>
            <div>
              {words[x]?.translates?.map(x => <div>{x.translate}</div>)}
              <button onClick={() => console.log(words[x]?.translates[0].translate)}></button>
            </div>
          </div>)}

      <button onClick={firebaseWordsRequest}></button>
    </div>
  )
}

// {<div>{[...Object.keys(words)]
//   .map(x =>
//     <div>
//       <div>
//         {words[x]?.word}
//       </div>
//       <div>
//         {words[x].translates
//           .map(x =>
//             <span>
//               {x.translate}<span style={{ fontSize: '8px' }}>{x.language.split('-')[1]}</span> |
//             </span>)
//         }</div>
//     </div>)}
// </div>}