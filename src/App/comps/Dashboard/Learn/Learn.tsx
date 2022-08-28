import React from 'react'
import { useState } from 'react'
import './Learn.scss'
import GuessTranslateByLettersGame from './Games/GuessTranslateByLettersGame/GuessTranslateByLettersGame';
import GuessWordGame from './Games/GuessWordGame/GuessWordGame';
import GameElem from './GameElem/GameElem';

type Props = {}

export default function Learn({ }: Props) {

  const [inguesswordgame, setinguesswordgame] = useState(false)
  const [inguesstranslatebylettersgame, setinguesstranslatebylettersgame] = useState(false)

  function StartGameMenu() {

    return (

      <div className='Learn__gamesList'>

        <GameElem
          title='Напиши перевод правильно'
          description='Выпадает случайное слово из базы, вы пишете перевод этого слова'
          startgame={() => setinguesstranslatebylettersgame(!inguesstranslatebylettersgame)}
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
          : inguesstranslatebylettersgame ? <GuessTranslateByLettersGame endgame={() => setinguesstranslatebylettersgame(!inguesstranslatebylettersgame)} />
            : <StartGameMenu />
      }

    </div>

  )

}
