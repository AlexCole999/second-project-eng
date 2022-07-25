import React from 'react'
import './ResultRow.scss'
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../API/firebase/firebaseConfig'
import { useSelector, useDispatch } from 'react-redux';
import { AiFillCheckCircle, AiFillPlayCircle } from "react-icons/ai";
import axios from 'axios';
import capitalizeFirstLetter from './../../../../../functions/capitalizeFirstLetter';
import createNewBase from './../../../../../functions/createNewBase';
import yandexDictionaryRequest from './../../../../../Api/yandexDictionary/yandexDictionaryRequest';


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

  function addTranslateToFirebase() {

    const newBase = createNewBase.baseWithNewTranslateForWord(allWordsFromFirebase, selectedLanguage, word, translate)

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(translate)}" добавлено в переводы слова "${capitalizeFirstLetter(word)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  function deleteTranslateFromFirebase() {

    const newBase = createNewBase.baseWithDeletedTranslateForWord(allWordsFromFirebase, word, translate)

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        allWordsFromFirebase[word]['translates'].length > 1
          ? console.log(`Слово "${capitalizeFirstLetter(translate)}" удалено из переводов слова "${capitalizeFirstLetter(word)}"`)
          : console.log(`Слово "${capitalizeFirstLetter(word)}" удалено из базы слов"`)
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  function setGameWord() {

    const newBase = createNewBase.baseWithNewGameWord(allWordsFromFirebase, selectedLanguage, word, translate);

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Теперь в слове "${capitalizeFirstLetter(word)}" во время игры вы будете угадывать слово "${capitalizeFirstLetter(translate)}"`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
      });

  }

  function deleteGameWord() {

    const newBase = createNewBase.baseWithDeletedGameWord(allWordsFromFirebase, word);

    setDoc(doc(db, "users", user, 'data', 'words'), newBase)
      .then(() => {
        console.log(`Слово "${capitalizeFirstLetter(word)}" удалено из игры`);
        dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: newBase });
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
                      yandexDictionaryRequest(selectedLanguage, sameWord.text)
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
            ? <AiFillCheckCircle className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_translateAppended'
              onClick={deleteTranslateFromFirebase}
            >
            </AiFillCheckCircle>
            : <AiFillCheckCircle className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_translate'
              onClick={addTranslateToFirebase}
            >
            </AiFillCheckCircle>
        }

        {
          isGameWord
            ? <AiFillPlayCircle className='DeepSearch__resultRowAppendButton DeepSearch__resultRowAppendButton_playbaseAppended'
              onClick={deleteGameWord}
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