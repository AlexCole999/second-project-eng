import React from 'react'
import { useState } from 'react'
import './Learn.scss'
import { useSelector } from 'react-redux';

type Props = {}

export default function Learn({ }: Props) {

  const [inguesswordgame, setinguesswordgame] = useState(false)
  const [inguesstranslategame, setinguesstranslategame] = useState(false)

  const StartGameMenu = () => {

    return (

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

        <div style={{ fontStyle: 'italic' }}>
          <div style={{ textAlign: 'center' }}>
            <b style={{ fontSize: '2.3em', textDecoration: 'underline' }}>Отгадай перевод</b><br />
            <div style={{ fontSize: '1.3em' }}>Выпадает случайное слово из базы, вы угадываете перевод этого слова</div>
          </div>
        </div>

        <button
          style={{ width: '220px', height: '60px', backgroundColor: 'green', borderRadius: '15px', color: 'white', border: 'none', margin: '15px 0px 15px 0px', fontSize: '1.2em', fontWeight: 'bold' }}
          onClick={() => setinguesstranslategame(!inguesstranslategame)}
        >
          ИГРАТЬ
        </button>

        <div style={{ fontStyle: 'italic' }}>
          <div style={{ textAlign: 'center' }}>
            <b style={{ fontSize: '2.3em', textDecoration: 'underline' }}>Отгадай слово</b><br />
            <div style={{ fontSize: '1.3em' }}>Выпадает случайный перевод из базы, вы угадываете это слово на основном языке</div>
          </div>
        </div>

        <button
          style={{ width: '220px', height: '60px', backgroundColor: 'green', borderRadius: '15px', color: 'white', border: 'none', margin: '15px 0px 15px 0px', fontSize: '1.2em', fontWeight: 'bold' }}
          onClick={() => setinguesswordgame(!inguesswordgame)}
        >
          ИГРАТЬ
        </button>

      </div>

    )

  }

  const GuessWordGame = () => {

    const base = useSelector(state => state.allWordsFromFirebase)
    const gamebase = Object.keys(base).filter(x => base[x]?.gameword)
    const [changedWord, setchangedWord] = useState('НЕИЗВЕСТНО')
    const [wordinbase, setwordinbase] = useState('')
    const [wordininput, setwordininput] = useState('')

    return (

      <div>

        <input type="text" onChange={(e) => setwordinbase(e.target.value)} placeholder='wordinbase' />
        <input type="text" onChange={(e) => setwordininput(e.target.value)} placeholder='wordininput' />
        <br />

        <button style={{ width: '50px', height: '25px' }} onClick={() => { console.log(gamebase); setchangedWord(gamebase[Math.ceil(Math.random() * gamebase.length - 1)]) }}></button>
        <button style={{ width: '50px', height: '25px' }} onClick={() => { console.log(base[changedWord]); }}></button>
        <br />

        {changedWord.split('').map(x => <span style={{ fontSize: '85px' }}>{x}</span>)}

        <br />

        {<div style={{ display: 'flex' }}>
          {base[changedWord]
            ?.gameword
            .split('')
            .map(x =>
              <div style={{ width: '50px', minHeight: '75px', border: '2px solid black', borderRadius: '15px', fontSize: '85px', marginLeft: '25px' }}>{ }</div>
            )}
        </div>
        }

        <div>
          {
            wordinbase
              .split('')
              .map((elem, index) =>
                elem == wordininput[index]
                  ? <span style={{ color: 'green' }}>{wordininput[index]}</span>
                  : <span style={{ color: 'red' }} >{wordininput[index]}</span>
              )
          }
        </div>

        <button
          style={{ width: '200px', height: '50px', backgroundColor: 'red', borderRadius: '15px', color: 'white', border: 'none', margin: '15px 0px 15px 0px', fontSize: '1.2em', fontWeight: 'bold' }}
          onClick={() => setinguesswordgame(!inguesswordgame)}
        >
          ЗАКОНЧИТЬ
        </button>

      </div>

    )

  }

  const GuessTranslateGame = () => {

    const [wordinbase, setwordinbase] = useState('')
    const [wordininput, setwordininput] = useState('')

    return (

      <div>

        <input type="text" onChange={(e) => setwordinbase(e.target.value)} placeholder='wordinbase' />
        <input type="text" onChange={(e) => setwordininput(e.target.value)} placeholder='wordininput' />

        <div>
          {
            wordinbase
              .split('')
              .map((elem, index) =>
                elem == wordininput[index]
                  ? <span style={{ color: 'green' }}>{wordininput[index]}</span>
                  : <span style={{ color: 'red' }} >{wordininput[index]}</span>
              )
          }
        </div>

        <button
          style={{ width: '200px', height: '50px', backgroundColor: 'red', borderRadius: '15px', color: 'white', border: 'none', margin: '15px 0px 15px 0px', fontSize: '1.2em', fontWeight: 'bold' }}
          onClick={() => setinguesstranslategame(!inguesstranslategame)}
        >
          ЗАКОНЧИТЬ
        </button>

      </div>

    )

  }

  return (

    <div className='Learn'>

      {
        inguesswordgame
          ? <GuessWordGame />
          : inguesstranslategame
            ? <GuessTranslateGame />
            : <StartGameMenu />

      }

    </div>

  )

}
