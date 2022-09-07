import React, { useState, useEffect } from 'react'
import './FilteredWords.scss'
import MyWordsElem from './MyWordsElem/MyWordsElem';
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
type Props = { filteredWords: any }

export default function FilteredWords({ filteredWords }: Props) {

  const [showTopBtn, setShowTopBtn] = useState(false);

  function GoTopButton() {
    return (
      <BsFillArrowUpCircleFill
        size={35}
        style={{ position: 'fixed', bottom: '0.5%', right: '1%' }}
        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      />
    )
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (

    <div className='MyWords__words' style={{ position: 'relative' }}>

      {
        filteredWords
          .map(
            mainWord =>
              <MyWordsElem
                word={mainWord}
                key={mainWord}
              />
          )
      }

      {showTopBtn ? <GoTopButton /> : ''}

    </div>

  )

}