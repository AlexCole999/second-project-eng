import React from 'react'
import './ResultRow.scss'
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig'
import { useSelector } from 'react-redux';

let database = db;

type Props = {
  translate: string
}

export default function ResultRow({ translate }: Props) {

  const word = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text);

  function setWordToFirebase() {
    setDoc(doc(database, "users", "user", "appendedwords", 'blabla111'), {
      word: '2222',
      translate: '13333'
    })
      .then(() => console.log('done'))
  }

  return (
    <div className='DeepSearch__resultRow'>
      <div>
        {translate}
      </div>
      <div>
        <button className='DeepSearch__resultRowAppendButton'
          onClick={() => console.log(word, translate)}
        >
        </button>
      </div>
    </div>
  )
}