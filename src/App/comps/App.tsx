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

  const dispatch = useDispatch()

  const user = useSelector(state => state.user?.data?.email || 'guest');

  useEffect(() => {
    getDoc(doc(db, "users", user, 'data', 'words')).then(data => {
      dispatch({
        type: "ADD_DATA_FROM_FIREBASE",
        payload: data.data()
      });
    });
  }, [])

  return (

    <div className="App">

      <div className="App__body">

        <Nav />
        <Dashboard />

      </div>

    </div>
  )
}
