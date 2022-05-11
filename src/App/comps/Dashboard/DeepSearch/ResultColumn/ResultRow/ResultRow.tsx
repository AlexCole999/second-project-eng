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

  async function setWordToFirebase() { // функция добавления слова в базу

    let oldWords = (await getDoc(doc(database, "users", user, 'data', 'words'))); // запрашиваем данные о словах пользователя с сервера

    if (oldWords.data() == undefined) {  // если добавленных слов по этому пользователю нет
      await setDoc(doc(database, "users", user, 'data', 'words'), {}); //создаем пустой объект по этому пути
      oldWords = (await getDoc(doc(database, "users", user, 'data', 'words'))); // заново запрашиваем отправленные данные с сервера
    }

    let newbase = oldWords.data(); // копируем полученные данные в новый объект, его мы будем изменять для отправки изменений на сервер
    let newbasewords = newbase; // создаем новый объект на базе уже существующего, его мы будем изменять и отправлять изменения на сервер

    if (!newbasewords[word]) { // если объект не содержит нашего слова, тогда:
      newbasewords[word] = {} // создаем новое поле, называем его словом, которое переводим, закидываем туда пустой объект 
      newbasewords[word]['word'] = word // в новосозданном пустом объекте создаем поле с названием 'word', закидываем туда слово, которое переводим
      newbasewords[word]['translates'] = [
        { language: selectedLanguage, translate: translate }
      ] // в новосозданном пустом объекте создаем поле с названием 'translates', закидываем туда новый массив, в массив кидаем новый объект, в объекте прокидываем поле с языковой парой перевода и поле со значение перевода
    }

    newbasewords[word]['translates'] = [ // если в запрошенных данных есть поле с нашим словом,то идем в поле с его переводами
      ...newbasewords[word]['translates'] // разворачиваем все старые объекты с переводами в начало нового массива, при этом --->>>
        .filter(x => x.translate !== translate), // --->>> фильтруем старые переводы, выкидывая из них тот, который хотим добавить (это нужно для устранения дубликатов объектов с одинаковыми переводами)
      { language: selectedLanguage, translate: translate } // добавляем в конец отфильтрованного массива объект с нашим новым переводом 
    ]

    setDoc(doc(database, "users", user, 'data', 'words'), newbase); // сформированный и измененный объект newbase отправляем на сервер в качестве новых данных

  }

  async function getWordToFirebase() {

    let data = (await getDoc(doc(database, "users", user, 'data', 'words'))).data();

    console.log(data);

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