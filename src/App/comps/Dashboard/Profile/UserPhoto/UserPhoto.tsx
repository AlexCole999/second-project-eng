import React from 'react'
import './UserPhoto.scss'
import { FiUserX } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithPopup } from "firebase/auth";
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { auth, db, provider } from '../../../../API/firebase/firebaseConfig';

type Props = {}

export default function UserPhoto({ }: Props) {

  const userdata = useSelector(state => state.user?.data)
  const dispatch = useDispatch();

  async function logIn() {

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