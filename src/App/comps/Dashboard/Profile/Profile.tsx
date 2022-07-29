import React from 'react';
import './Profile.scss';
import UserPhoto from './UserPhoto/UserPhoto';
import UserData from './UserData/UserData';

import { useSelector, useDispatch } from 'react-redux';
import { signInWithPopup } from "firebase/auth";
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { auth, db, provider } from '../../../API/firebase/firebaseConfig';

type Props = {}

export default function Profile({ }: Props) {

  const dispatch = useDispatch();

  const userdata = useSelector(state => state.user?.data)

  const logIn = async () => {

    const user = await signInWithPopup(auth, provider)
    const userwords = await getDoc(doc(db, "users", user.user.email, 'data', 'words'))

    if (userwords.data() == undefined) {
      await setDoc(doc(db, "users", user.user.email, 'data', 'words'), {})
      dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: {} })
    }

    dispatch({ type: "LOG_IN_USER_WITH_GOOGLEAUTH", payload: user.user });
    dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: userwords.data() });

    localStorage.setItem('user', JSON.stringify(user.user))

  }

  const LogInButton = () => {

    return (

      <div className='Profile__logInButton'>
        <button onClick={logIn}>LogIn</button>
      </div>

    )

  }

  return (

    <div className='Profile'>

      <div className='Profile__userData'>


        <UserPhoto />

        {
          userdata?.displayName
            ? <UserData />
            : <LogInButton />
        }

      </div>

    </div>

  )

}
