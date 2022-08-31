import React from 'react'
import { useState } from 'react'
import './Learn.scss'
import GameElem from './GameElem/GameElem';
import GuessTranslationByLettersGame from './Games/GuessTranslationByLettersGame/GuessTranslationByLettersGame';
import GuessGamewordByLettersGame from './Games/GuessGamewordByLettersGame/GuessGamewordByLettersGame';



type Props = {}

export default function Learn({ }: Props) {

  const [inguessgamewordbylettersgame, setinguessgamewordbylettersgame] = useState(false)
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
          title='Напиши слово правильно'
          description='Выпадает случайный перевод слова из базы, вы пишете это слово на основном языке'
          startgame={() => setinguessgamewordbylettersgame(!inguessgamewordbylettersgame)}
        />

      </div>

    )

  }

  return (

    <div className='Learn'>

      {
        inguesstranslatebylettersgame ? <GuessTranslationByLettersGame endgame={() => setinguesstranslatebylettersgame(!inguesstranslatebylettersgame)} />
          : inguessgamewordbylettersgame ? <GuessGamewordByLettersGame endgame={() => setinguessgamewordbylettersgame(!inguessgamewordbylettersgame)} />
            : <StartGameMenu />
      }

    </div>

  )

}
