import React from 'react'
import { useSelector } from 'react-redux';

type Props = {}

export default function Profile({ }: Props) {

  const userdata = useSelector(state => state.user?.data)

  return (
    <div>
      Profile
      <div><img style={{ width: '52px', height: '52px', borderRadius: '50%' }} src={userdata?.photoURL}></img></div>
      <div style={{ display: 'flex', flexDirection: 'column', border: '3px solid black', marginTop: '10px', padding: '10px', borderRadius: '8px', maxWidth: '600px' }}>

        <div>
          <b>Имя пользователя:</b>
          {userdata?.displayName || 'загрузка...'}
        </div>
        <div>
          <b>Email:</b>
          {userdata?.email || 'загрузка...'}
        </div>
        <div>
          <b>Профиль создан:</b>
          {new Date(Number(userdata?.metadata?.createdAt)).toString() || 'загрузка...'}
        </div>
        <div>
          <b>Последний вход:</b>
          {new Date(Number(userdata?.metadata?.lastLoginAt)).toString() || 'загрузка...'}
        </div>
        <div>
          <b>Уникальный идендификатор:</b>
          {userdata?.uid || 'загрузка...'}
        </div>
      </div>
    </div>
  )
}
