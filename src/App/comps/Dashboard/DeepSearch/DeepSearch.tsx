import React from 'react'
import './DeepSearch.scss';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../../API/firebase/firebaseConfig'
import ResultColumn from './ResultColumn/ResultColumn';
import capitalizeFirstLetter from './../../../functions/capitalizeFirstLetter';
import yandexDictionaryRequest from './../../../Api/yandexDictionary/yandexDictionaryRequest';

type Props = {}

export default function DeepSearch({ }: Props) {

  const localStorageUserData = JSON.parse(localStorage.getItem('user'));

  const params = useParams()

  const dispatch = useDispatch()

  const wordsFromYandexDictionary = useSelector(state => state.yandexDictionaryTranslates.data);
  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const user = useSelector(state => state.user?.data?.email || localStorageUserData?.email || 'guest');

  useEffect(() => {

    getDoc(doc(db, "users", user, 'data', 'words')).then(data => {
      dispatch({
        type: "ADD_DATA_FROM_FIREBASE",
        payload: data.data()
      });
    });

    if (params.word) {
      let requestLanguage = allWordsFromFirebase[params?.word]?.translates[0]?.language || 'en-ru'
      let requestWord = params?.word !== undefined ? params?.word : 0
      yandexDictionaryRequest(requestLanguage, requestWord)
        .then(response => {
          dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
          dispatch({ type: "CHANGE_SELECTED_LANGUAGE", payload: requestLanguage })
        })
    }

  }, [])

  function SearchedWord() {

    return (

      <div className='DeepSearch__searchedword'>
        {
          wordsFromYandexDictionary[0]?.text
            ? capitalizeFirstLetter(wordsFromYandexDictionary[0]?.text)
            : 'Нет слова'
        }
      </div>

    )

  }

  return (

    <div className='DeepSearch'>

      <SearchedWord />

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
