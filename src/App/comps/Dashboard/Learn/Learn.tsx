import React from 'react'
import './Learn.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import GameElem from './GameElem/GameElem';
import GuessTranslationByLettersGame from './Games/GuessTranslationByLettersGame/GuessTranslationByLettersGame';
import GuessGamewordByLettersGame from './Games/GuessGamewordByLettersGame/GuessGamewordByLettersGame';



type Props = {}

export default function Learn({ }: Props) {

  const allWordsFromFirebase = useSelector(state => state.allWordsFromFirebase)
  const baseIsNotEmpty = Object.keys(allWordsFromFirebase).length

  const [inguessgamewordbylettersgame, setinguessgamewordbylettersgame] = useState(false)
  const [inguesstranslatebylettersgame, setinguesstranslatebylettersgame] = useState(false)

  function StartGameMenu() {

    return (

      <div className='Learn__gamesList'>

        <GameElem
          title='Напиши перевод правильно'
          description={baseIsNotEmpty ? 'Выпадает случайное слово из базы, вы пишете перевод этого слова' : 'Пожалуйста, добавьте слова и переводы в базу для начала игры'}
          startgame={() => setinguesstranslatebylettersgame(!inguesstranslatebylettersgame)}
          available={baseIsNotEmpty}
        />

        <GameElem
          title='Напиши слово правильно'
          description={baseIsNotEmpty ? 'Выпадает случайный перевод слова из базы, вы пишете это слово на основном языке' : 'Пожалуйста, добавьте слова и переводы в базу для начала игры'}
          startgame={() => setinguessgamewordbylettersgame(!inguessgamewordbylettersgame)}
          available={baseIsNotEmpty}
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
