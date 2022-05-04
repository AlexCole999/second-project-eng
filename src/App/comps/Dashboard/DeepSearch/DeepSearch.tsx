import { setDoc, doc } from 'firebase/firestore';
import React from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../../API/firebase/firebaseConfig';

type Props = {}

export default function DeepSearch({ }: Props) {

  const some = useSelector(state => state.yandexDictionaryTranslates.data);

  let database = db;

  function somefunc(e) {
    setDoc(doc(database, "users", "user", "appendedwords", 'blabla'), {
      word: '2',
      translate: '1'
    });
    console.log(e.target.nextElementSibling)
  }

  return (
    <div >

      DeepSearch
      <button onClick={() => {
        console.log(some);
      }
      }>

      </button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {some == undefined
          ? "none"
          : some.map(x =>
            <div style={{ border: '1px solid black', margin: '15px', maxWidth: '250px', padding: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}><div>{x.pos}</div></div>
              {x.tr.map(x =>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div
                    onClick={(e) => { somefunc(e) }}>{x.text}</div>
                  <div>
                    <button
                      style={{
                        marginLeft: '5px', width: '25px', height: '15px', backgroundColor: "green"
                      }}></button>
                  </div>
                </div>)}
            </div>)}
      </div>
    </div >
  )
}
