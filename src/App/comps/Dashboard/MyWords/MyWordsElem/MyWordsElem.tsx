import React from 'react'
import './MyWordsElem.scss'
import capitalizeFirstLetter from './../../../../functions/capitalizeFirstLetter';
import { db } from '../../../../API/firebase/firebaseConfig'
import { useSelector } from 'react-redux';
import { getDoc, setDoc, doc } from 'firebase/firestore';

type Props = {
  fullWordsList: any,
  element: any,
  selectedbase: any
}

export default function MyWordsElem({ fullWordsList, element, selectedbase }: Props) {



  const user = useSelector(state => state.user?.data?.email || 'guest');
  const selectedLanguage = useSelector(state => state.selectedLanguage)

  async function addTranslateToCustomFirebase(tr) { // функция добавления слова в базу

    let oldWords = (await getDoc(doc(db, "users", user, 'bases', selectedbase))); // запрашиваем данные о словах пользователя с сервера

    let newbase = oldWords.data(); // копируем полученные данные в новый объект, его мы будем изменять для отправки изменений на сервер
    let newbasewords = newbase; // создаем новый объект на базе уже существующего, его мы будем изменять и отправлять изменения на сервер

    if (!newbasewords[fullWordsList[element]?.word]) { // если объект не содержит нашего слова, тогда:
      newbasewords[fullWordsList[element]?.word] = {} // создаем новое поле, называем его словом, которое переводим, закидываем туда пустой объект 
      newbasewords[fullWordsList[element]?.word]['word'] = fullWordsList[element]?.word // в новосозданном пустом объекте создаем поле с названием 'word', закидываем туда слово, которое переводим
      newbasewords[fullWordsList[element]?.word]['translates'] = [
        { language: selectedLanguage, translate: tr.translate }
      ] // в новосозданном пустом объекте создаем поле с названием 'translates', закидываем туда новый массив, в массив кидаем новый объект, в объекте прокидываем поле с языковой парой перевода и поле со значение перевода
    }

    newbasewords[fullWordsList[element]?.word]['translates'] = [ // если в запрошенных данных есть поле с нашим словом,то идем в поле с его переводами
      ...newbasewords[fullWordsList[element]?.word]['translates'] // разворачиваем все старые объекты с переводами в начало нового массива, при этом --->>>
        .filter(x => x.translate !== tr.translate), // --->>> фильтруем старые переводы, выкидывая из них тот, который хотим добавить (это нужно для устранения дубликатов объектов с одинаковыми переводами)
      { language: selectedLanguage, translate: tr.translate } // добавляем в конец отфильтрованного массива объект с нашим новым переводом 
    ]

    setDoc(doc(db, "users", user, 'bases', selectedbase), newbase).then(x => console.log('appended')); // сформированный и измененный объект newbase отправляем на сервер в качестве новых данных

  }

  return (
    <div className='MyWords__elem'>
      <div className='MyWords__elemMainWord'>
        <div>
          {capitalizeFirstLetter(fullWordsList[element]?.word)}
        </div>
      </div>
      <div>
        {
          fullWordsList[element]
            .translates
            .map(
              translate =>
                <div className='MyWords__elemTranslateRow' key={translate.translate}>
                  <div>
                    <div className='MyWords__elemTranslateWord'>
                      {capitalizeFirstLetter(translate.translate)}
                    </div>
                    <div className='MyWords__elemTranslateLanguage'>
                      {translate.language.split('-')[1]}
                    </div>
                  </div>
                  <button
                    className='MyWords__elemAppendButton'
                    onClick={async () => addTranslateToCustomFirebase(translate)}
                  >
                  </button>
                </div>
            )
        }
      </div>
    </div>
  )
}