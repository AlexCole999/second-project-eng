import React from 'react'
import './ResultRow.scss'
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig'
import { useSelector } from 'react-redux';

let database = db;

type Props = {
  translate: string
}

export default function ResultRow({ translate }: Props) {

  const word = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  function setWordToFirebase() {

    const words = {}
    words[word] = { word: word, translate: translate }

    setDoc(doc(database, "users", user), {
      words
    })
      .then(() => console.log('done'))
  }
  function getWordToFirebase() {
    getDoc(doc(database, "users", user))
      .then((x) => console.log(x.data().words[word] ? 'est' : 'net'))
  }

  return (
    <div className='DeepSearch__resultRow'>
      <div>
        {translate}
      </div>
      <div>
        <button className='DeepSearch__resultRowAppendButton'
          onClick={setWordToFirebase}
        >
        </button>
        <button className='DeepSearch__resultRowAppendButton'
          onClick={getWordToFirebase}
        >
        </button>
      </div>
    </div>
  )
}