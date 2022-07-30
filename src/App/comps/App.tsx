import React from 'react'
import { useEffect } from 'react'
import './App.scss'
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import { getDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../API/firebase/firebaseConfig'

type Props = {}

export default function App({ }: Props) {

  let localStorageUserData = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch()

  const user = useSelector(state => state.user?.data?.email || localStorageUserData?.email || 'guest');

  const firebaseRequest = () => {
    getDoc(doc(db, "users", user, 'data', 'words')).then(data => {
      dispatch({
        type: "ADD_DATA_FROM_FIREBASE",
        payload: data.data()
      });
    });
  }

  useEffect(() => firebaseRequest(), [])

  return (

    <div className="App">

      <div className="App__body">

        <Nav />
        <Dashboard />

      </div>

    </div>
  )
}
