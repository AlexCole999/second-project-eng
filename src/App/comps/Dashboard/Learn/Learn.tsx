import React from 'react'
import { useState } from 'react'
import './Learn.scss'
import GuessTranslateGame from './Games/GuessTranslateGame/GuessTranslateGame';
import GuessWordGame from './Games/GuessWordGame/GuessWordGame';
import GameElem from './GameElem/GameElem';

type Props = {}

export default function Learn({ }: Props) {

  const [inguesswordgame, setinguesswordgame] = useState(false)
  const [inguesstranslategame, setinguesstranslategame] = useState(false)

  function StartGameMenu() {

    return (

      <div className='Learn__gamesList'>

        <GameElem
          title='Отгадай перевод'
          description='Выпадает случайное слово из базы, вы угадываете перевод этого слова'
          startgame={() => setinguesstranslategame(!inguesstranslategame)}
        />

        <GameElem
          title='Отгадай слово'
          description='Выпадает случайный перевод из базы, вы угадываете это слово на основном языке'
          startgame={() => setinguesswordgame(!inguesswordgame)}
        />

      </div>

    )

  }

  return (

    <div className='Learn'>

      {
        inguesswordgame ? <GuessWordGame endgame={() => setinguesswordgame(!inguesswordgame)} />
          : inguesstranslategame ? <GuessTranslateGame endgame={() => setinguesstranslategame(!inguesstranslategame)} />
            : <StartGameMenu />
      }

    </div>

  )

}
