import './NavElem.scss'
import React from 'react'

export default function NavElem(props) {

  return (

    <div className="Nav__elem">

      <div className="Nav__elemicon">
        {props.icon}
      </div>

      <div className="Nav__elemtext">
        {props.text}
      </div>

    </div>

  )

}