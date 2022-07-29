import React from 'react'
import './UserData.scss'
import { useSelector } from 'react-redux';
import LogOutButton from './../LogOutButton/LogOutButton';

type Props = {}

export default function UserData({ }: Props) {

  const userdata = useSelector(state => state.user?.data)

  const userCreatedAt = userdata?.metadata?.createdAt || userdata?.createdAt || 'Профиль не найден...'
  const lastLoginAt = userdata?.metadata?.lastLoginAt || userdata?.lastLoginAt || 'Профиль не найден...'

  const UserDataElem = (props) => {

    return (

      <div className='Profile__userDataElem'>

        <div className='Profile__userDataElemTitle'>
          {props.title ? props.title : 'Профиль не найден...'}
        </div>

        <div className='Profile__userDataElemText'>
          {props.text ? props.text : 'Профиль не найден...'}
        </div>

      </div>

    )

  }

  return (

    <div>

      <UserDataElem title={'Имя пользователя:'} text={userdata?.displayName} />
      <UserDataElem title={'Email:'} text={userdata?.email} />
      <UserDataElem title={'Профиль создан:'} text={new Date(Number(userCreatedAt)).toString()} />
      <UserDataElem title={'Последний вход:'} text={new Date(Number(lastLoginAt)).toString()} />
      <UserDataElem title={'Уникальный идентификатор:'} text={userdata?.uid} />

      <div className='Profile__userDataElem'>
        <LogOutButton />
      </div>

    </div>

  )

}