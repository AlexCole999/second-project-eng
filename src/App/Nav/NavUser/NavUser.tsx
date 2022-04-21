import React from 'react'
import './NavUser.scss'
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { initializeApp } from 'firebase/app';

type Props = {}

export default function NavUser({ }: Props) {

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCu_dkznKgP8ZxVTwvkNbAnGdTluiIO5eU",
  //   authDomain: "firstfirebase-04-08-2021.firebaseapp.com",
  //   projectId: "firstfirebase-04-08-2021",
  //   storageBucket: "firstfirebase-04-08-2021.appspot.com",
  //   messagingSenderId: "53473763739",
  //   appId: "1:53473763739:web:a641946d7b4760eb33413e",
  //   measurementId: "G-GDBP4GBHYF"
  // };

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
  //       console.log(result)
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
      </div>
      <div className="NavUser__name">Leonid</div>
    </div>
  )
}