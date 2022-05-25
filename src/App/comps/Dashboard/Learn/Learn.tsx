import React from 'react'
import { useState } from 'react'


type Props = {}

export default function Learn({ }: Props) {

  const [wordinbase, setwordinbase] = useState('')
  const [wordininput, setwordininput] = useState('')
  const [state, setstate] = useState([])

  return (
    <div>
      Learn
      <input type="text" onChange={(e) => setwordinbase(e.target.value)} placeholder='wordinbase' />
      <input type="text" onChange={(e) => setwordininput(e.target.value)} placeholder='wordininput' />
      <div>
        {wordinbase
          .split('')
          .map((elem, index) =>
            elem == wordininput[index]
              ? <span style={{ color: 'green' }}>{wordininput[index]}</span>
              : <span style={{ color: 'red' }} >{wordininput[index]}</span>
          )}
      </div>
    </div>
  )
}
