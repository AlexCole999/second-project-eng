import './NavUser.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FiUserX } from 'react-icons/fi';

type Props = {}

export default function NavUser({ }: Props) {

  const dispatch = useDispatch();

  const displayName = useSelector(state => state.user?.data?.user?.displayName[0])

  const singInWithGooglePopup = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        dispatch({ type: "LOG_IN_USER_WITH_GOOGLEAUTH", payload: result })
      }).catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  }

  return (
    <div className="NavUser">
      <div
        className="NavUser__name">
        {displayName !== undefined
          ? <div>{displayName}</div>
          : <FiUserX size={25} onClick={singInWithGooglePopup} />}
      </div>
    </div>
  )
}