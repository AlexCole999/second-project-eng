import React from 'react'
import './ResultRow.scss'
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig'
import { useSelector } from 'react-redux';

let database = db;

type Props = {
  translate: string,
  fulltranslate: any
}

export default function ResultRow({ translate, fulltranslate }: Props) {

  const word = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  async function setWordToFirebase() {
    const oldbase = (await getDoc(doc(database, "users", user))).data();
    let newbase = oldbase;
    let newbasewords = newbase.words;

    newbasewords[word]
      ? newbasewords[word]['translates'] = [...new Set([...newbasewords[word]['translates'], translate])]
      : (newbasewords[word] = {}, newbasewords[word]['word'] = word, newbasewords[word]['translates'] = [translate])

    setDoc(doc(database, "users", user), newbase);
    console.log(newbase)
  }

  async function getWordToFirebase() {
    let data = (await getDoc(doc(database, "users", user))).data()
    console.log(data)
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