import React from 'react'
import { useSelector } from 'react-redux'
import './MyWordsElem.scss'
import { FaTimesCircle } from "react-icons/fa";
import capitalizeFirstLetter from './../../../../functions/capitalizeFirstLetter';

type Props = {
  element: any
}

export default function MyWordsElem({ element }: Props) {

  const fullWordsList = useSelector(state => state.allWordsFromFirebase);

  return (

    <div className='MyWords__elem'>

      <div className='MyWords__elemMainWord'>

        <div>
          {capitalizeFirstLetter(fullWordsList[element]?.word)}
        </div>

      </div>

      <div>

        {
          fullWordsList[element]
            .translates
            .map(
              translate =>

                <div className='MyWords__elemTranslateRow' key={translate.translate}>

                  <div>

                    {
                      fullWordsList[element]?.gameword == translate.translate
                        ?
                        <div className='MyWords__elemTranslateWord MyWords__elemTranslateWord_gameword'>
                          {capitalizeFirstLetter(translate.translate)}
                        </div>
                        :
                        <div className='MyWords__elemTranslateWord'>
                          {capitalizeFirstLetter(translate.translate)}
                        </div>
                    }

                    <div className='MyWords__elemTranslateLanguage'>
                      {translate.language.split('-')[1]}
                    </div>

                  </div>

                  <FaTimesCircle
                    className='MyWords__elemDeleteButton'
                    onClick={() => console.log('someaction')}
                  >
                  </FaTimesCircle>

                </div>

            )
        }

      </div>

    </div>

  )

}