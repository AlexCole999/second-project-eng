import React from 'react';
import './Profile.scss';
import { FiUserX } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithPopup } from "firebase/auth";
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { auth, db, provider } from '../../../API/firebase/firebaseConfig';

type Props = {}

export default function Profile({ }: Props) {

  const dispatch = useDispatch();

  const userdata = useSelector(state => state.user?.data)

  const userCreatedAt = userdata?.metadata?.createdAt || userdata?.createdAt || 'Профиль не найден...'
  const lastLoginAt = userdata?.metadata?.lastLoginAt || userdata?.lastLoginAt || 'Профиль не найден...'

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

  const logOut = () => {
    dispatch({ type: "LOG_IN_USER_WITH_GOOGLEAUTH", payload: [] });
    localStorage.removeItem('user');
  }

  return (

    <div className='Profile'>

      <div className='Profile__userData'>

        <div>
          {userdata?.photoURL ? <img src={userdata?.photoURL}></img> : <FiUserX size={215} />}
        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Имя пользователя:
          </div>

          <div className='Profile__userDataElemText'>
            {userdata?.displayName || 'Профиль не найден...'}
          </div>

        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Email:
          </div>

          <div className='Profile__userDataElemText'>
            {userdata?.email || 'Профиль не найден...'}
          </div>

        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Профиль создан:
          </div>

          <div className='Profile__userDataElemText'>
            {new Date(Number(userCreatedAt)).toString() || 'Профиль не найден...'}
          </div>

        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Последний вход:
          </div>

          <div className='Profile__userDataElemText'>
            {new Date(Number(lastLoginAt)).toString() || 'Профиль не найден...'}
          </div>

        </div>

        <div className='Profile__userDataElem'>

          <div className='Profile__userDataElemTitle'>
            Уникальный идентификатор:
          </div>

          <div className='Profile__userDataElemText'>
            {userdata?.uid || 'Профиль не найден...'}
          </div>

          {userdata?.displayName
            ? <div className='Profile__logOutButton'>
              <button onClick={logOut}>LogOut</button>
            </div>
            : <div className='Profile__logInButton'>
              <button onClick={logIn}>LogIn</button>
            </div>
          }

        </div>

      </div>

    </div>
  )
}
