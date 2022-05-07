import React from 'react'
import './ResultRow.scss'
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig'

type Props = {
  text: string
}

let database = db;

export default function ResultRow({ text }: Props) {

  function setWordToFirebase(e) {
    setDoc(doc(database, "users", "user", "appendedwords", 'blabla111'), {
      word: '2222',
      translate: '13333'
    })
      .then(x => console.log('done'))
  }

  return (
    <div className='DeepSearch__resultRow'>
      <div onClick={(e) => { setWordToFirebase(e) }}>
        {text}
      </div>
      <div>
        <button className='DeepSearch__resultRowAppendButton'
          onClick={() => { console.log('clicked') }}
        ></button>
      </div>
    </div>
  )
}