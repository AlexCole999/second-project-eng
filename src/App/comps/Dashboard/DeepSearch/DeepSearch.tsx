import React from 'react'
import { useSelector } from 'react-redux';


type Props = {}

export default function DeepSearch({ }: Props) {
  const some = useSelector(state => state.yandexDictionaryTranslates.data);
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
                  <div>{x.text}</div>
                  <div>
                    <button style={{ marginLeft: '5px', width: '25px', height: '15px', backgroundColor: "green" }}></button>
                    <button disabled style={{ marginLeft: '5px', width: '15px', height: '15px', backgroundColor: "red" }}></button>
                  </div>
                </div>)}
            </div>)}
      </div>
    </div>
  )
}
