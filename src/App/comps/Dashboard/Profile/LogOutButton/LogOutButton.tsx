import React from 'react'
import './LogOutButton.scss'
import { useDispatch } from 'react-redux';

type Props = {}

export default function LogOutButton({ }: Props) {

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: "LOG_IN_USER_WITH_GOOGLEAUTH", payload: [] });
    localStorage.removeItem('user');
  }

  return (

    <div className='Profile__logOutButton'>
      <button onClick={logOut}>LogOut</button>
    </div>

  )

}