import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'

type Props = {}

export default function MyWords({ }: Props) {

  const dispatch = useDispatch();

  const [state, setstate] = useState([])
  const [inputstate, setinputstate] = useState('')

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const words = useSelector(state => state.wordsFromFirebase);
  const basesList = useSelector(state => state.basesList?.data);

  useEffect(async () => {

    const basesListArray = [];
    const data = (await getDoc(doc(db, "users", user, 'data', 'words'))).data();
    const querySnapshot = await getDocs(collection(db, "users", user, 'bases'));
    querySnapshot.forEach(basename => basesListArray.push(basename.id));
    dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: data });
    dispatch({ type: "GET_BASES_LIST", payload: basesListArray });

  }, [])

  async function addNewBase() {

    await setDoc(doc(db, "users", user, 'bases', inputstate), {});
    const querySnapshot = await getDocs(collection(db, "users", user, 'bases'));

    const basesListArray = [];
    querySnapshot.forEach(basename => basesListArray.push(basename.id));

    dispatch({ type: "GET_BASES_LIST", payload: basesListArray });

  }

  return (
    <div>
      <div style={{ marginBottom: '5px' }}>MyWords</div>
      <div style={{ border: '1px solid black', padding: '5px' }}>
        <div>Bases</div>
        <select style={{ width: '150px' }}>{basesList.map(x => <option>{x}</option>)}</select>
        <input type="text" onChange={(e) => setinputstate(e.target.value)} />
        <button onClick={addNewBase}>addbase</button>
        <button onClick={() => console.log(basesList)}>baseslist</button>
      </div>
      <div style={{ border: '1px solid black', padding: '5px', margin: "5px 0px" }}>
        <div>Фильтр</div>
        <input type="text" placeholder='фильтр' onChange={(e) => setstate(new RegExp(e.target.value))} />
        <button onClick={() => console.log([...Object.keys(words)].filter(x => words[x].word.match(state)))}>display filtered</button>
        <button onClick={() => console.log(state)}>display regexp</button>
      </div >
      {< div > {
        [...Object.keys(words)]
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
          )
      }
      </div >}
    </div >
  )
}

