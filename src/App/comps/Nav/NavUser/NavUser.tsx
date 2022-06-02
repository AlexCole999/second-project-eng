import './NavUser.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup } from "firebase/auth";
import { FiUserX } from 'react-icons/fi';
import { auth, provider } from '../../../API/firebase/firebaseConfig';

type Props = {}

export default function NavUser({ }: Props) {

  const dispatch = useDispatch();

  const displayName = useSelector(state => state.user?.data?.displayName)

  const singInWithGooglePopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({ type: "LOG_IN_USER_WITH_GOOGLEAUTH", payload: result.user });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="NavUser">
      <div className="NavUser__body">
        {displayName !== undefined
          ? <div>{displayName[0]}</div>
          : <FiUserX size={25} onClick={singInWithGooglePopup} />}
      </div>
    </div>
  )
}