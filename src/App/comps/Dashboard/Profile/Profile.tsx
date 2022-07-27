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

  const UserPhoto = () => {

    return (

      <div>
        {
          userdata?.photoURL
            ? <img src={userdata?.photoURL}></img>
            : <FiUserX className='Profile__userNoPhotoIcon' size={215} onClick={logIn} />
        }
      </div>

    )

  }

  const UserData = () => {

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
        <LogOutButton />
      </div>

    )

  }

  const LogInButton = () => {

    return (

      <div className='Profile__logInButton'>
        <button onClick={logIn}>LogIn</button>
      </div>

    )

  }

  const LogOutButton = () => {

    return (

      <div className='Profile__logOutButton'>
        <button onClick={logOut}>LogOut</button>
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
