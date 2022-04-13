import React from 'react'
import './NavUser.scss'

type Props = {}

export default function NavUser({ }: Props) {
  return (
    <div className="NavUser">
      <div className="NavUser__photo"></div>
      <div className="NavUser__name">Leonid</div>
    </div>
  )
}