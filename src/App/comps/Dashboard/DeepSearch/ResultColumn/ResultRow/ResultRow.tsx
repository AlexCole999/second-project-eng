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

  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const word = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  async function setWordToFirebase() {

    let oldbase = (await getDoc(doc(database, "users", user))); // запрашиваем данные

    if (oldbase.data() == undefined) {  // если данных по этому пользователю нет
      await setDoc(doc(database, "users", user), { words: {} }); //создаем стандартный объект с полем words, устанавливаем его как стандартные данные
      oldbase = (await getDoc(doc(database, "users", user))); // заново запрашиваем эти данные
    }

    let newbase = oldbase.data(); // копируем полученные данные в новый объект
    let newbasewords = newbase['words']; // создаем переменную для доступа к полю words

    newbasewords[word] // если поле не пустое, тогда:
      ? newbasewords[word]['translates'] = [...new Set([...newbasewords[word]['translates'].filter(x => x.translate !== translate), { language: selectedLanguage, translate: translate }])]
      : (newbasewords[word] = {}, newbasewords[word]['word'] = word, newbasewords[word]['translates'] = [{ language: selectedLanguage, translate: translate }])

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