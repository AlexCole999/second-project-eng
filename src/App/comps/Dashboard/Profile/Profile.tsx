import React from 'react'
import { useSelector } from 'react-redux';
import './Profile.scss';

type Props = {}

export default function Profile({ }: Props) {

  const userdata = useSelector(state => state.user?.data)

  const userCreatedAt = userdata?.metadata?.createdAt || userdata?.createdAt || 'загрузка...'
  const lastLoginAt = userdata?.metadata?.lastLoginAt || userdata?.lastLoginAt || 'загрузка...'

  return (

    <div className='Profile'>

      <div className='Profile__userData'>

        <div>
          <img src={userdata?.photoURL}></img>
        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Имя пользователя:
          </div>

          <div className='Profile__userDataElemText'>
            {userdata?.displayName || 'загрузка...'}
          </div>

        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Email:
          </div>

          <div className='Profile__userDataElemText'>
            {userdata?.email || 'загрузка...'}
          </div>

        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Профиль создан:
          </div>

          <div className='Profile__userDataElemText'>
            {new Date(Number(userCreatedAt)).toString() || 'загрузка...'}
          </div>

        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Последний вход:
          </div>

          <div className='Profile__userDataElemText'>
            {new Date(Number(lastLoginAt)).toString() || 'загрузка...'}
          </div>

        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Уникальный идентификатор:
          </div>

          <div className='Profile__userDataElemText'>
            {userdata?.uid || 'загрузка...'}
          </div>

        </div>

      </div>

    </div>
  )
}
