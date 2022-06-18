import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ResultColumn from './ResultColumn/ResultColumn';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../API/firebase/firebaseConfig'
import './DeepSearch.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Props = {}

export default function DeepSearch({ }: Props) {

  const params = useParams()

  const dispatch = useDispatch()

  const wordsFromYandexDictionary = useSelector(state => state.yandexDictionaryTranslates.data);
  const user = useSelector(state => state.user?.data?.email || 'guest');
  const selectedLanguage = useSelector(state => state.selectedLanguage)


  useEffect(() => {
    getDoc(doc(db, "users", user, 'data', 'words')).then(data => {
      dispatch({
        type: "ADD_DATA_FROM_FIREBASE",
        payload: data.data()
      });
    });
    if (params) {
      axios.get(
        'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
        + '?key='
        + '\dict.1.1.20210811T164421Z.dc92c34aa55f8bde.11d283af044e951db1e180d89d183eafd3dac943'
        + '&lang='
        + selectedLanguage
        + '&text='
        + params?.word)
        .then(response => {
          dispatch({ type: "GET_TRANSLATES_FROM_YANDEX_DICTIONARY", payload: response.data.def });
        })
    }
  }, [])

  return (

    <div className='DeepSearch'>

      <div className='DeepSearch__results'>

        {
          wordsFromYandexDictionary == undefined
            ? "none"
            : wordsFromYandexDictionary.map(resultColumn =>
              <ResultColumn
                pos={resultColumn.pos}
                translates={resultColumn.tr}
                key={resultColumn.pos}
              />
            )
        }

      </div>

    </div >
  )
}
