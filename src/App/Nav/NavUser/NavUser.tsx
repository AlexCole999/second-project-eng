import React from 'react'
import { useState } from 'react'
import './NavUser.scss'
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { initializeApp } from 'firebase/app';



type Props = {}

export default function NavUser({ }: Props) {

  // const [user, setuser] = useState('not loged in');

  // const app = initializeApp(firebaseConfig);

  // function somefunc() {


  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       setuser(result.user.email);
  //       // ...
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });

  // }
  return (
    <div className="NavUser">
      <div className="NavUser__photo">
        {/* <button onClick={somefunc}></button> */}
        {/* <button onClick={() => console.log(user)}></button> */}
      </div>
      <div className="NavUser__name">123</div>
    </div>
  )
}