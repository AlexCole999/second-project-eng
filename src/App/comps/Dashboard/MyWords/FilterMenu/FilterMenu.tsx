import React from 'react'
import './FilterMenu.scss'

const FilterMenu = ({ setregexp }) => {

  return (

    <div className='MyWords__filterMenu'>

      <div className='MyWords__filterMenuTitle'>
        Быстрый поиск
      </div>

      <div>
        <input
          type="text"
          placeholder='Часть искомого слова...'
          onChange={
            (e) =>
              setregexp(new RegExp((e.target.value).toLowerCase()))
          }
        />
      </div>

    </div >

  )

}
export default React.memo(FilterMenu)
