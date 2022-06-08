import React from 'react'
import './MyWords.scss'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'

type Props = {}

export default function MyWords({ }: Props) {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const words = useSelector(state => state.wordsFromFirebase);
  const basesList = useSelector(state => state.basesList?.data);

  const [regexp, setregexp] = useState([])
  const [newbasename, setnewbasename] = useState('')

  const selectedBase = useRef(null);


  let filteredWordsArray = [...Object.keys(words).filter(x => words[x].word.match(regexp))];

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

    await setDoc(doc(db, "users", user, 'bases', newbasename), {});
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
          Базы слов
        </div>
        Список баз:
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
        <br />
        Добавить новую базу:
        <br />
        <input
          type="text"
          placeholder='Желаемое имя новой базы...'
          onChange={
            (e) =>
              setnewbasename(e.target.value)
          }
        />
        <button
          onClick={addNewBase}>
          addbase
        </button>
      </div>
      <div className='MyWords__wordsFilterMenu'>
        <div>
          Фильтр
        </div>
        <input
          type="text"
          placeholder='В слове есть буква...'
          onChange={
            (e) =>
              setregexp(new RegExp(e.target.value))
          }
        />
      </div >
      {
        filteredWordsArray
          .map(x =>
            <div className='MyWords__elem'>
              <div className='MyWords__elemMainWord'>
                {words[x]?.word}
              </div>
              <div>
                {
                  words[x]
                    .translates
                    .map(x =>
                      <div>
                        <div className='MyWords__elemTranslateWord'>
                          {x.translate}
                        </div>
                        <div className='MyWords__elemTranslateLanguage'>
                          {x.language.split('-')[1]}
                        </div>
                      </div>)
                }
              </div>
            </div>
          )
      }
    </div >
  )
}

