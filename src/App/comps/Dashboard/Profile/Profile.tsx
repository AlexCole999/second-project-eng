import React from 'react';
import './Profile.scss';
import UserPhoto from './UserPhoto/UserPhoto';
import UserData from './UserData/UserData';
import LogInButton from './LogInButton/LogInButton';
import { useSelector } from 'react-redux';

type Props = {}

export default function Profile({ }: Props) {

  const loggedIn = useSelector(state => state.user?.data?.displayName ? true : false)

  return (

    <div className='Profile'>

      <div className='Profile__data'>

        <UserPhoto />

        {
          loggedIn
            ? <UserData />
            : <LogInButton />
        }

      </div>

    </div>

  )

}
