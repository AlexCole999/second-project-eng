import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ResultColumn from './ResultColumn/ResultColumn';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../API/firebase/firebaseConfig'
import './DeepSearch.scss';

type Props = {}

export default function DeepSearch({ }: Props) {

  const dispatch = useDispatch()

  const results = useSelector(state => state.yandexDictionaryTranslates.data);
  const user = useSelector(state => state.user?.data?.email || 'guest');

  useEffect(() => {
    getDoc(doc(db, "users", user, 'data', 'words'))
      .then(data => {
        dispatch({
          type: "ADD_DATA_FROM_FIREBASE",
          payload: data.data()
        });
      });
  }, [])

  return (
    <div className='DeepSearch'>
      DeepSearch
      <div className='DeepSearch__results'>
        {
          results == undefined
            ? "none"
            : results.map(resultColumn =>
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
