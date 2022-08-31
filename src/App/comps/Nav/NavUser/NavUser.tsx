import './NavUser.scss'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup } from "firebase/auth";
import { FiUserX } from 'react-icons/fi';
import { auth, db, provider } from '../../../API/firebase/firebaseConfig';
import { setDoc, getDoc, doc } from 'firebase/firestore';

type Props = {}

export default function NavUser({ }: Props) {

  const dispatch = useDispatch();

  let localStorageUserData = JSON.parse(localStorage.getItem('user'));

  const userImg = useSelector(state => state.user?.data?.photoURL)

  async function singInWithGooglePopup() {

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

  async function setUserFromLocalStorage() {

    const userwords = await getDoc(doc(db, "users", localStorageUserData.email, 'data', 'words'));

    if (userwords.data() == undefined) {
      await setDoc(doc(db, "users", localStorageUserData.email, 'data', 'words'), {})
      dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: {} })
    }

    if (userwords.data() !== undefined) {
      dispatch({ type: "ADD_DATA_FROM_FIREBASE", payload: userwords.data() });
    }

    dispatch({ type: "LOG_IN_USER_WITH_GOOGLEAUTH", payload: localStorageUserData });

  }

  useEffect(() => {
    if (localStorageUserData) {
      setUserFromLocalStorage()
    }
  }, [])

  return (

    <div className="NavUser">

      {
        userImg !== undefined
          ?
          <div className="NavUser__body" >
            <img className="NavUser__userImg" src={userImg}></img>
          </div>
          :
          <div className="NavUser__body" onClick={singInWithGooglePopup}>
            <FiUserX size={25} />
          </div>
      }

    </div>

  )

}