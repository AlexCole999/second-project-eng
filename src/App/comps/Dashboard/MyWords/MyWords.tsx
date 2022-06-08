import React from 'react'
import './MyWords.scss'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'

type Props = {}

export default function MyWords({ }: Props) {

  const dispatch = useDispatch();

  const [regexp, setregexp] = useState([])
  const [inputstate, setinputstate] = useState('')

  const selectedBase = useRef(null);
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
    console.log('useEffectDone')

  }, [])

  async function addNewBase() {

    await setDoc(doc(db, "users", user, 'bases', inputstate), {});
    const querySnapshot = await getDocs(collection(db, "users", user, 'bases'));

    const basesListArray = [];
    querySnapshot.forEach(basename => basesListArray.push(basename.id));

    dispatch({ type: "GET_BASES_LIST", payload: basesListArray });

  }

  return (
    <div className='MyWords'>
      <div className='MyWords__title'>
        MyWords
      </div>
      <div className='MyWords__baseMenu'>
        <div>
          Bases
        </div>
        <select
          ref={selectedBase}>
          {
            basesList
              .map(x =>
                <option>
                  {x}
                </option>)
          }
        </select>
        <input type="text" onChange={(e) => setinputstate(e.target.value)} />
        <button onClick={addNewBase}>addbase</button>
        <button onClick={() => console.log(selectedBase.current.selectedOptions[0].text)}>view</button>
        <button onClick={() => console.log(basesList)}>baseslist</button>
      </div>
      <div style={{ border: '1px solid black', padding: '5px', margin: "5px 0px" }}>
        <div>Фильтр</div>
        <input type="text" placeholder='фильтр' onChange={(e) => setregexp(new RegExp(e.target.value))} />
        <button onClick={() => console.log([...Object.keys(words)].filter(x => words[x].word.match(regexp)))}>display filtered</button>
      </div >
      {< div > {
        [...Object.keys(words).filter(x => words[x].word.match(regexp))]
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

