import React from 'react'
import './ResultRow.scss'
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig'
import { useSelector } from 'react-redux';
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";
import capitalizeFirstLetter from './../../../../../functions/capitalizeFirstLetter';


type Props = {
  translate: string,
  examples: any,
  sameWords: any,
  synonyms: any,
  frequency: number
}

export default function ResultRow({ translate, examples, sameWords, synonyms, frequency }: Props) {

  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const word = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  async function addTranslateToFirebase() { // функция добавления слова в базу

    let oldWords = (await getDoc(doc(db, "users", user, 'data', 'words'))); // запрашиваем данные о словах пользователя с сервера
    if (oldWords.data() == undefined) {  // если добавленных слов по этому пользователю нет
      await setDoc(doc(db, "users", user, 'data', 'words'), {}); //создаем пустой объект по этому пути
      oldWords = (await getDoc(doc(db, "users", user, 'data', 'words'))); // заново запрашиваем отправленные данные с сервера
    }

    let newbasewords = oldWords.data(); // копируем полученные данные в новый объект, его мы будем изменять для отправки изменений на сервер
    if (!newbasewords[word]) { // если объект не содержит нашего слова, тогда:
      newbasewords[word] = {} // создаем новое поле, называем его словом, которое переводим, закидываем туда пустой объект 
      newbasewords[word]['word'] = word // в новосозданном пустом объекте создаем поле с названием 'word', закидываем туда слово, которое переводим
      newbasewords[word]['translates'] = [{ language: selectedLanguage, translate: translate }] // в новосозданном пустом объекте создаем поле с названием 'translates', закидываем туда новый массив, в массив кидаем новый объект, в объекте прокидываем поле с языковой парой перевода и поле со значение перевода
    }
    newbasewords[word]['translates'] = [...newbasewords[word]['translates'] // разворачиваем все старые объекты с переводами в начало нового массива, при этом --->>>
      .filter(
        x => x.translate !== translate   // --->>> фильтруем старые переводы, выкидывая из них тот, который хотим добавить (это нужно для устранения дубликатов объектов с одинаковыми переводами)
      ),
    { language: selectedLanguage, translate: translate } // добавляем в конец отфильтрованного массива объект с нашим новым переводом 
    ]

    setDoc(
      doc(
        db, "users", user, 'data', 'words'),
      newbasewords)
      .then(
        x => console.log('appended')
      ); // сформированный и измененный объект newbase отправляем на сервер в качестве новых данных

  }

  async function setWordGame() {

    const allWords = await getDoc(doc(db, "users", user, 'data', 'words'));
    allWords = allWords.data();

    const theword = allWords[word];
    theword['game'] = translate

    console.log({ ...allWords, theword })

  }

  return (
    <div className='DeepSearch__resultRow'>
      <div>
        <div className='DeepSearch__resultRowMainWord'>
          {capitalizeFirstLetter(translate)}
        </div>
        <div className='DeepSearch__resultRowFrequency'>
          Встречается: {frequency}/10
        </div>
        <div className='DeepSearch__resultRowSynonymsList'>
          {synonyms.length ? 'Синонимы:' : ''}
          {
            synonyms
              .map(
                synonym =>
                  <div className='DeepSearch__resultRowSynonymsListElem'>
                    {synonym.text}
                  </div>)
          }
        </div>
        <div className='DeepSearch__resultRowSameWordsList'>
          {sameWords.length ? 'Похожие слова:' : ''}
          {
            sameWords
              .map(
                sameWord =>
                  <div className='DeepSearch__resultRowSameWordsListElem'>
                    {sameWord.text}
                  </div>)
          }
        </div>
        <div className='DeepSearch__resultRowExamplesList'>
          {examples.length ? 'Примеры использования:' : ''}
          {
            examples
              .map(
                example =>
                  <div className='DeepSearch__resultRowExamplesListElem'>
                    {example.text} - {example.tr[0].text}
                  </div>)
          }
        </div>
        <hr />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AiFillCheckCircle className='DeepSearch__resultRowAppendButton'
          onClick={addTranslateToFirebase}
        >
        </AiFillCheckCircle>
        <AiFillPlayCircle className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_playbase'
          onClick={setWordGame}
        >
        </AiFillPlayCircle>
      </div>
    </div>
  )
}