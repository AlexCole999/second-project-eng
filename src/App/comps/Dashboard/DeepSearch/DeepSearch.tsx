import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ResultColumn from './ResultColumn/ResultColumn';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../API/firebase/firebaseConfig'
import './DeepSearch.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import capitalizeFirstLetter from './../../../functions/capitalizeFirstLetter';
import yandexDictionaryRequest from './../../../Api/yandexDictionary/yandexDictionaryRequest';

type Props = {}

export default function DeepSearch({ }: Props) {

  const params = useParams()

  const dispatch = useDispatch()

  const wordsFromYandexDictionary = useSelector(state => state.yandexDictionaryTranslates.data);
  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const user = useSelector(state => state.user?.data?.email || 'guest');

  useEffect(() => {
    getDoc(doc(db, "users", user, 'data', 'words')).then(data => {
      dispatch({
        type: "ADD_DATA_FROM_FIREBASE",
        payload: data.data()
      });
    });
    if (params.word) {
      let yandexDictionaryKey = '\dict.1.1.20210811T164421Z.dc92c34aa55f8bde.11d283af044e951db1e180d89d183eafd3dac943'
      let requestLanguage = allWordsFromFirebase[params?.word]?.translates[0]?.language || 'en-ru'
      let requestWord = params?.word !== undefined ? params?.word : 0
      axios.get(
        'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
        + '?key='
        + yandexDictionaryKey
        + '&lang='
        + requestLanguage
        + '&text='
        + requestWord)
        .then(response => {
          dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
        })
    }
  }, [])

  return (

    <div className='DeepSearch'>

      <div className='DeepSearch__mainword'>
        {
          wordsFromYandexDictionary[0]?.text
            ? capitalizeFirstLetter(wordsFromYandexDictionary[0]?.text)
            : 'Нет слова'
        }
      </div>

      <div className='DeepSearch__results'>

        {
          wordsFromYandexDictionary.length
            ? (wordsFromYandexDictionary == undefined
              ? "none"
              : wordsFromYandexDictionary.map(resultColumn =>
                <ResultColumn
                  pos={resultColumn.pos}
                  translates={resultColumn.tr}
                  key={resultColumn.pos}
                />
              ))
            :
            <div className='DeepSearch__noresultstext'>
              Слово не найдено или строка поиска пуста
            </div>
        }

      </div>

    </div >
  )
}
