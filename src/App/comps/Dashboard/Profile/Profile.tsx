import React from 'react'
import { useSelector } from 'react-redux';

type Props = {}

export default function Profile({ }: Props) {

  const userdata = useSelector(state => state.user?.data)

  return (
    <div>
      Profile
      <div>
        <div><img style={{ width: '52px', height: '52px', borderRadius: '50%' }} src={userdata?.photoURL}></img></div>
        <div>Имя пользователя:{userdata?.displayName || 'загрузка...'}</div>
        <div>Email:{userdata?.email || 'загрузка...'}</div>
        <div>Профиль создан:{userdata?.metadata?.creationTime || 'загрузка...'}</div>
        <div>Уникальный идендификатор:{userdata?.uid || 'загрузка...'}</div>
        <button onClick={() => console.log(userdata)}></button>
      </div>
    </div>
  )
}
