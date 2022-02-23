import React from 'react'
import './Dashboard.scss'

type Props = { name?: string }

export default function Dashboard({ name }: Props) {
  return (
    <div className='Dashboard'>Dashboard{name}</div>
  )
}
