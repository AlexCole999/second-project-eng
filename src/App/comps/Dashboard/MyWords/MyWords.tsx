import React from 'react'
import './MyWords.scss'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, doc, setDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from './../../../API/firebase/firebaseConfig'
import MyWordsElem from './MyWordsElem/MyWordsElem';

type Props = {}

export default function MyWords({ }: Props) {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const fullWordsList = useSelector(state => state.wordsFromFirebase);
  const basesList = useSelector(state => state.basesList?.data);

  const [regexp, setregexp] = useState([])
  const [selectedbase, setselectedbase] = useState('')
  const [newbasename, setnewbasename] = useState('')

  const basemenu = useRef(null);
  const selectedBaseColumn = useRef(null);

  const filteredWordsArray = [...Object.keys(fullWordsList).filter(x => fullWordsList[x].word.toLowerCase().match(regexp))];

  useEffect(async () => {

    const basesListArray = [];
    const data = (await getDoc(doc(db, "users", user, 'data', 'words'))).data();
    const querySnapshot = await getDocs(collection(db, "users", user, 'bases'));
    querySnapshot.forEach(basename => basesListArray.push(basename.id));
    dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: data });
    dispatch({ type: "GET_BASES_LIST", payload: basesListArray });
    setselectedbase(basesListArray[0]);
    console.log('useEffectDone')

  }, [])

  async function addNewBase() {

    await setDoc(doc(db, "users", user, 'bases', newbasename), {});
    const querySnapshot = await getDocs(collection(db, "users", user, 'bases'));

    const basesListArray = [];
    querySnapshot.forEach(basename => basesListArray.push(basename.id));

    dispatch({ type: "GET_BASES_LIST", payload: basesListArray });

    basemenu.current.append(document.createElement("div"), `База ${newbasename} успешно создана`);

  }

  return (
    <div className='MyWords'>
      <div className='MyWords__title'>
        MyWords
      </div>
      <div
        ref={basemenu}
        className='MyWords__baseMenu'>
        <div>
          Базы слов
        </div>
        Добавлять слова в базу:
        <select
          onChange={(e) => setselectedbase(e.target.value)}
          ref={selectedBaseColumn}>
          {
            basesList
              .map(x =>
                <option key={x} value={x}>
                  {x}
                </option>)
          }
        </select>
        <br />
        Создать новую базу:
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
          Создать
        </button>
      </div>
      <div className='MyWords__wordsFilterMenu'>
        <div>
          Фильтр
        </div>
        <input
          type="text"
          placeholder='Часть искомого словаююю'
          onChange={
            (e) =>
              setregexp(new RegExp(e.target.value))
          }
        />
      </div >
      <div className='MyWords__words'>
        {
          filteredWordsArray
            .map(
              mainWord =>
                <MyWordsElem
                  fullWordsList={fullWordsList}
                  selectedbase={selectedbase}
                  element={mainWord}
                  key={mainWord}
                />
            )
        }
      </div>
    </div >
  )
}

