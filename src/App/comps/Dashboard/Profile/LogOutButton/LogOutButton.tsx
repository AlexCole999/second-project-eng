import React from 'react'
import './LogOutButton.scss'
import { useDispatch } from 'react-redux';
import { db } from '../../../../API/firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

type Props = {}

export default function LogOutButton({ }: Props) {

  const dispatch = useDispatch();

  const logOut = () => {

    getDoc(doc(db, "users", 'guest', 'data', 'words')).then(data => {
      dispatch({ type: "LOG_IN_USER_WITH_GOOGLEAUTH", payload: [] });
      dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: data.data() });
    });

    localStorage.removeItem('user');

  }

  return (

    <div className='Profile__logOutButton'>
      <button onClick={logOut}>LogOut</button>
    </div>

  )

}