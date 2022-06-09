import React from 'react'
import './ResultRow.scss'
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig'
import { useSelector } from 'react-redux';

type Props = {
  translate: string,
  examples: any,
  mean: any,
  synonym: any,
  frequency: number
}

export default function ResultRow({ translate, examples, mean, synonym, frequency }: Props) {

  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const word = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  async function addTranslateToFirebase() { // функция добавления слова в базу

    let oldWords = (await getDoc(doc(db, "users", user, 'data', 'words'))); // запрашиваем данные о словах пользователя с сервера

    if (oldWords.data() == undefined) {  // если добавленных слов по этому пользователю нет
      await setDoc(doc(db, "users", user, 'data', 'words'), {}); //создаем пустой объект по этому пути
      oldWords = (await getDoc(doc(db, "users", user, 'data', 'words'))); // заново запрашиваем отправленные данные с сервера
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

    setDoc(doc(db, "users", user, 'data', 'words'), newbase).then(x => console.log('appended')); // сформированный и измененный объект newbase отправляем на сервер в качестве новых данных

  }

  return (
    <div className='DeepSearch__resultRow'>
      <div style={{ marginBottom: '5px' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
          {`${translate[0].toUpperCase()}${translate.slice(1)}`}
        </div>
        <div style={{ marginBottom: '5px' }}>Встречается: {frequency}/10
        </div>
        <div style={{ marginBottom: '5px' }}>
          {synonym.length ? 'Синонимы:' : ''}
          {synonym.map(x =>
            <div style={{ fontStyle: 'italic', fontSize: '0.8em' }}>
              {x.text}
            </div>)}
        </div>
        <div style={{ marginBottom: '5px' }}>{mean.length ? 'Похожие слова:' : ''}
          {mean.map(x => <div style={{ fontStyle: 'italic', fontSize: '0.8em' }}>
            {x.text}
          </div>)}
        </div>
        <div>
          {examples.length ? 'Примеры использования:' : ''}
          {examples.map(x => <div style={{ fontStyle: 'italic', fontSize: '0.8em' }}>
            {x.text} - {x.tr[0].text}</div>)}
        </div>
        <hr />
      </div>
      <div>
        <button className='DeepSearch__resultRowAppendButton'
          onClick={addTranslateToFirebase}
        >
        </button>
      </div>
    </div>
  )
}