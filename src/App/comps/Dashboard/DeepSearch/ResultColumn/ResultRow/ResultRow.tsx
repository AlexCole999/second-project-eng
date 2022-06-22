import React from 'react'
import './ResultRow.scss'
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig'
import { useSelector, useDispatch } from 'react-redux';
import { AiFillCheckCircle, AiFillPlayCircle } from "react-icons/ai";
import axios from 'axios';
import capitalizeFirstLetter from './../../../../../functions/capitalizeFirstLetter';

type Props = {
  translate: string,
  examples: any,
  sameWords: any,
  synonyms: any,
  frequency: number
}

export default function ResultRow({ translate, examples, sameWords, synonyms, frequency }: Props) {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user?.data?.email || 'guest');
  const word = useSelector(state => state.yandexDictionaryTranslates?.data[0]?.text);
  const selectedLanguage = useSelector(state => state.selectedLanguage)
  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase || []);

  const isAppendedTranslate = allWordsFromFirebase[word]?.translates.some(x => x.translate == translate);
  const isGameWord = allWordsFromFirebase[word]?.gameword == translate;

  function yandexDictionaryRequest(word) {
    let yandexDictionaryKey = '\dict.1.1.20210811T164421Z.dc92c34aa55f8bde.11d283af044e951db1e180d89d183eafd3dac943'
    let requestLanguage = 'en-ru'
    return axios.get(
      'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
      + '?key='
      + yandexDictionaryKey
      + '&lang='
      + requestLanguage
      + '&text='
      + word)
  }

  function addTranslateToFirebase() {

    const currentBaseWords = JSON.parse(JSON.stringify(allWordsFromFirebase));
    let newBaseWords = currentBaseWords;

    newBaseWords[word] = currentBaseWords[word]
      ? {
        ...currentBaseWords[word],
        translates: [...currentBaseWords[word]['translates'].filter(x => x.translate !== translate), { language: selectedLanguage, translate: translate }]
      }
      : {
        word: word,
        translates: [{ language: selectedLanguage, translate: translate }]
      };

    setDoc(doc(db, "users", user, 'data', 'words'), newBaseWords)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(translate)}" добавлено в переводы слова "${capitalizeFirstLetter(word)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBaseWords });
      });

  }

  function setGameWord() {

    const currentBaseWords = JSON.parse(JSON.stringify(allWordsFromFirebase));
    let newBaseWords = currentBaseWords;

    newBaseWords[word] = currentBaseWords[word]
      ? {
        ...currentBaseWords[word],
        gameword: translate
      }
      : {
        word: word,
        translates: [{ language: selectedLanguage, translate: translate }],
        gameword: translate
      };


    setDoc(doc(db, "users", user, 'data', 'words'), newBaseWords)
      .then(() => {
        console.log(`Теперь в слове "${capitalizeFirstLetter(word)}" во время игры вы будете угадывать слово "${capitalizeFirstLetter(translate)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBaseWords });
      });

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

          {synonyms
            .map(
              synonym =>
                <div key={synonym.text} className='DeepSearch__resultRowSynonymsListElem'>
                  {capitalizeFirstLetter(synonym.text)}
                </div>
            )
          }

        </div>

        <div className='DeepSearch__resultRowSameWordsList'>

          {sameWords.length ? 'Похожие слова:' : ''}

          {sameWords
            .map(
              sameWord =>
                <div key={sameWord.text} className='DeepSearch__resultRowSameWordsListElem'
                  onClick={
                    () => {
                      yandexDictionaryRequest(sameWord.text)
                        .then(response => {
                          dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
                        })
                    }}             >
                  {capitalizeFirstLetter(sameWord.text)}
                </div>)
          }

        </div>

        <div className='DeepSearch__resultRowExamplesList'>

          {examples.length ? 'Примеры использования:' : ''}

          {examples
            .map(
              example =>
                <div key={example.text} className='DeepSearch__resultRowExamplesListElem'>
                  {capitalizeFirstLetter(example.text)} - {example.tr[0].text}
                </div>)
          }

        </div>

        <hr />

      </div>

      <div className='DeepSearch__resultRowButtonMenu'>

        {
          isAppendedTranslate
            ? <AiFillCheckCircle className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_appended'
              onClick={addTranslateToFirebase}
            >
            </AiFillCheckCircle>
            : <AiFillCheckCircle className='DeepSearch__resultRowAppendButton'
              onClick={addTranslateToFirebase}
            >
            </AiFillCheckCircle>
        }

        {
          isGameWord
            ? <AiFillPlayCircle className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_playbaseAppended'
              onClick={setGameWord}
            >
            </AiFillPlayCircle>
            : <AiFillPlayCircle className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_playbase'
              onClick={setGameWord}
            >
            </AiFillPlayCircle>
        }

      </div>

    </div>

  )
}